/**
 * A very small synthesiser for interface sounds.
 *
 * Nothing is downloaded; every sound is generated at the moment it plays, so
 * there are no audio files to ship, cache or license. Two voices cover it: an
 * oscillator for anything pitched, and a one-second buffer of white noise, read
 * from a random offset, for anything percussive.
 *
 * Browsers will not start an AudioContext until the page has had a real user
 * gesture, so the context is created lazily on the first call and resumed if the
 * browser suspended it. The first hover of a session is therefore silent, which
 * is the correct behaviour rather than a bug to work around.
 */

type Voice = {
  /** Hz. For a noise voice this is the filter's centre frequency. */
  freq: number;
  /** Glide to this frequency across the sound's length. */
  to?: number;
  /** Seconds. These are short; a UI tick is nearer 0.01 than 0.1. */
  dur?: number;
  /** Seconds to reach full gain. Longer reads as a swell, shorter as a click. */
  attack?: number;
  gain?: number;
  /** Seconds to wait before starting, for stacking a second voice behind a first. */
  delay?: number;
  /** -1 hard left, 1 hard right. */
  pan?: number;
  filter?: BiquadFilterType;
  /** Filter cutoff for an oscillator voice. Omit to leave it unfiltered. */
  cutoff?: number;
  q?: number;
};

type ToneVoice = Voice & { type?: OscillatorType };

const MAX_VOICES = 14;
const STORAGE_KEY = "sfx-enabled";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let live = 0;

const lastPlayed = new Map<string, number>();
const listeners = new Set<() => void>();
let enabled = true;
let loaded = false;

/**
 * Sound is opt-out, but the choice sticks. The stored preference is read on the
 * first call rather than at import, so this stays safe to evaluate on the server.
 */
export function isEnabled() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      enabled = window.localStorage.getItem(STORAGE_KEY) !== "0";
    } catch {
      // Private windows and blocked site data throw. Default to on.
    }
  }
  return enabled;
}

/** What the server renders, before any preference is known. */
export function isEnabledOnServer() {
  return true;
}

export function setEnabled(next: boolean) {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // Private windows and blocked site data both throw here. The setting still
    // applies for this page, it just will not survive a reload.
  }
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  // Returns void, not Set.delete's boolean, so it can be a useEffect cleanup.
  return () => {
    listeners.delete(fn);
  };
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ensureContext() {
  if (ctx || typeof window === "undefined") return;
  const Ctor =
    window.AudioContext ??
    (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;

  ctx = new Ctor();

  // Everything lands on a compressor, so two sounds firing together cannot add up
  // to something louder than either of them alone.
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -6;
  compressor.knee.value = 4;
  compressor.ratio.value = 12;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.12;
  compressor.connect(ctx.destination);

  master = ctx.createGain();
  master.gain.value = 0.85;
  master.connect(compressor);

  // One second of white noise, generated once and re-read from a random offset.
  noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const channel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i++) channel[i] = Math.random() * 2 - 1;
}

function open() {
  if (!enabled || prefersReducedMotion()) return null;
  ensureContext();
  if (!ctx || !master) return null;
  if (ctx.state === "suspended") void ctx.resume();
  // Nothing should be audible from a tab nobody is looking at.
  if (typeof document !== "undefined" && document.hidden) return null;
  return { ctx, master };
}

function takeVoice() {
  if (live >= MAX_VOICES) return false;
  live++;
  return true;
}

/** True when this key fired within `ms`. A pointer crossing a grid fires fast. */
function throttled(key: string, ms: number) {
  const now = performance.now();
  const previous = lastPlayed.get(key);
  if (previous !== undefined && now - previous < ms) return true;
  lastPlayed.set(key, now);
  return false;
}

function finish(
  tail: AudioNode,
  source: AudioScheduledSourceNode,
  pan: number | undefined,
  audio: AudioContext,
  out: GainNode,
  stopAt: number,
) {
  if (pan !== undefined && audio.createStereoPanner) {
    const panner = audio.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    tail.connect(panner);
    panner.connect(out);
  } else {
    tail.connect(out);
  }

  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    live = Math.max(0, live - 1);
  };
  source.onended = release;
  // `onended` does not fire if the context is torn down mid-sound, so the voice
  // count gets a belt-and-braces release too.
  setTimeout(release, (stopAt - audio.currentTime) * 1000 + 250);
  source.stop(stopAt);
}

/** An envelope, applied in exponential ramps because gain is heard that way. */
function envelope(audio: AudioContext, at: number, attack: number, peak: number, dur: number) {
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  return gain;
}

export function tone(v: ToneVoice) {
  const open_ = open();
  if (!open_ || !takeVoice()) return;
  const { ctx: audio, master: out } = open_;

  const at = audio.currentTime + (v.delay ?? 0);
  const dur = v.dur ?? 0.12;

  const osc = audio.createOscillator();
  osc.type = v.type ?? "sine";
  osc.frequency.setValueAtTime(v.freq, at);
  if (v.to !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(1, v.to), at + dur);

  const gain = envelope(audio, at, v.attack ?? 0.004, v.gain ?? 0.1, dur);
  osc.connect(gain);

  let tail: AudioNode = gain;
  if (v.cutoff !== undefined) {
    const filter = audio.createBiquadFilter();
    filter.type = v.filter ?? "lowpass";
    filter.frequency.value = v.cutoff;
    filter.Q.value = v.q ?? 0.7;
    gain.connect(filter);
    tail = filter;
  }

  osc.start(at);
  finish(tail, osc, v.pan, audio, out, at + dur + 0.02);
}

export function noise(v: Voice) {
  const open_ = open();
  if (!open_ || !takeVoice() || !noiseBuffer) return;
  const { ctx: audio, master: out } = open_;

  const at = audio.currentTime + (v.delay ?? 0);
  const dur = v.dur ?? 0.05;

  const source = audio.createBufferSource();
  source.buffer = noiseBuffer;
  // A random start offset keeps repeats from sounding like the same sample.
  source.loop = true;
  const offset = Math.random() * Math.max(0, noiseBuffer.duration - dur);

  const filter = audio.createBiquadFilter();
  filter.type = v.filter ?? "bandpass";
  filter.frequency.setValueAtTime(v.freq, at);
  if (v.to !== undefined)
    filter.frequency.exponentialRampToValueAtTime(Math.max(1, v.to), at + dur);
  filter.Q.value = v.q ?? 1;

  const gain = envelope(audio, at, 0.002, v.gain ?? 0.08, dur);
  source.connect(filter);
  filter.connect(gain);

  source.start(at, offset);
  finish(gain, source, v.pan, audio, out, at + dur + 0.02);
}

/** ± a few Hz, so a row of identical elements does not sound mechanical. */
function jitter(freq: number, spread: number) {
  return freq + (Math.random() * 2 - 1) * spread;
}

export const sfx = {
  /**
   * Twelve milliseconds of resonant noise around 2.6 kHz, a tick rather than a
   * tone. Throttled hard: a pointer crossing a grid of cards would otherwise fire
   * this a dozen times in a flick.
   */
  hover() {
    if (throttled("hover", 55)) return;
    noise({ freq: jitter(2600, 120), dur: 0.012, gain: 0.076, q: 2.2 });
  },

  /**
   * The same idea an octave up and half as loud, for small targets: nav items,
   * inline links, the icons in the footer. A word in a sentence is a lighter
   * thing to point at than a project tile, and it should sound like one.
   *
   * It carries its own throttle key so a card hover cannot swallow a nav hover,
   * or the reverse: crossing from the page into the header is one gesture but
   * two separate answers.
   */
  tick() {
    if (throttled("tick", 60)) return;
    noise({ freq: jitter(4300, 220), dur: 0.009, gain: 0.042, q: 3.2 });
  },

  /**
   * The photo dropping into its well and the next one springing back out, as two
   * voices rather than one: a falling sine for the drop, then a rising triangle
   * a beat later for the return. The delay is tuned to the exit animation, so the
   * second voice lands while the well is empty rather than on top of the first.
   *
   * Not throttled by a pointer crossing anything, only by how fast a finger can
   * click, so the window is long enough to swallow a double-click's second half.
   */
  swap() {
    if (throttled("swap", 120)) return;
    tone({ type: "sine", freq: 520, to: 250, dur: 0.075, attack: 0.003, gain: 0.062 });
    tone({
      type: "triangle",
      freq: 330,
      to: 700,
      dur: 0.13,
      attack: 0.01,
      gain: 0.05,
      delay: 0.095,
      cutoff: 2800,
    });
  },
};

/**
 * Spread onto anything that should answer the pointer arriving: `{...hoverSfx()}`
 * for a small target, `{...hoverSfx(sfx.hover)}` for a large one.
 *
 * Touch fires `pointerenter` on tap, where a hover sound is just a click sound
 * arriving at the wrong moment, so those are skipped. The event is typed
 * structurally to keep this file free of a React import — it stays a synthesiser
 * that happens to be convenient in JSX, not a component module.
 */
export function hoverSfx(play: () => void = sfx.tick) {
  return {
    onPointerEnter: (event: { pointerType: string }) => {
      if (event.pointerType !== "touch") play();
    },
  };
}
