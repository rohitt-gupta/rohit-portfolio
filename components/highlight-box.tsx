import React from "react";

import { type HighlightTone, TONE_CLASS } from "@/components/highlight";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Which pastel to drag under the text. Butter is the marker-pen default. */
  tone?: HighlightTone;
};

/**
 * A block of text with a pastel strip run under its last line. The louder
 * cousin of {@link Highlight}, for the one sentence in a post that has to land.
 * Use `Highlight` for a word inside a sentence; this for the sentence itself.
 */
export default function HighlightBox({ children, tone = "butter" }: Props) {
  return (
    <div
      className="relative z-0 mt-0 mb-0 inline-block"
      style={{ marginTop: "0px", marginBottom: "0px" }}
    >
      <p className="z-10 p-0 leading-0" style={{ marginTop: "0px", marginBottom: "0px" }}>
        {children}
      </p>
      <div
        className={cn("absolute right-0 bottom-0 left-0 mt-10 inline-block h-2", TONE_CLASS[tone])}
        style={{ zIndex: -10 }}
      ></div>
    </div>
  );
}
