"use client";

import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import React from "react";

import { isEnabled, isEnabledOnServer, setEnabled, sfx, subscribe } from "@/lib/sfx";

/**
 * Sound is on by default but makes no noise until the page has had a click,
 * since browsers hold the AudioContext shut until then, so nobody is ambushed by it.
 * This is here so it can be switched off for good, and the choice is remembered.
 */
export function SoundToggle() {
  const on = React.useSyncExternalStore(subscribe, isEnabled, isEnabledOnServer);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !on;
        setEnabled(next);
        // This click is the gesture that unlocks audio, so switching it on can
        // demonstrate itself straight away.
        if (next) sfx.hover();
      }}
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      aria-pressed={on}
      className="text-faint hover:text-accent cursor-pointer p-1 transition-colors"
    >
      {on ? (
        <IconVolume className="size-4" stroke={1.6} aria-hidden />
      ) : (
        <IconVolumeOff className="size-4" stroke={1.6} aria-hidden />
      )}
    </button>
  );
}
