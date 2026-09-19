"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { encode } from "qss";
import React from "react";

import { POP_IN_VARIANT, SPRING_CONFIG } from "@/lib/motion-config";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

import { DottedUnderline, type DottedUnderlineProps } from "./dotted-underline";
import { highlightClass, type HighlightTone } from "./highlight";

export type LinkPreviewDottedUnderline = DottedUnderlineProps & {
  /** Space below text for the strip (default 0.05rem). */
  paddingBottom?: string;
};

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  /** Dotted SVG underline under the label (on by default). Pass `false` to disable. */
  dottedUnderline?: LinkPreviewDottedUnderline | false;
  /**
   * Paint a pastel highlight behind the label instead of underlining it. Takes
   * over the label's colour and replaces the dotted rule — two emphasis marks on
   * one word is one too many.
   */
  highlight?: HighlightTone;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
  dottedUnderline,
  highlight,
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const isMounted = useMounted();

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  const underlineConfig =
    dottedUnderline && typeof dottedUnderline === "object" ? dottedUnderline : {};
  const showDottedUnderline = dottedUnderline !== false && !highlight;
  const {
    dotRadius = 1,
    patternWidth = 6,
    patternHeight = 4,
    height: underlineHeight = 4,
    color: underlineColor,
    className: underlineClassName,
    paddingBottom: underlinePaddingBottom = "0.05rem",
  } = underlineConfig;

  return (
    <>
      {isMounted ? (
        // A span, not a div: LinkPreview is inline content and usually lives inside a <p>,
        // where a block-level child would be invalid HTML and break hydration.
        <span className="hidden" aria-hidden="true">
          {/* Warms the Microlink screenshot cache before the card opens. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={width} height={height} alt="" />
        </span>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn(
            "group relative overflow-visible",
            highlight ? highlightClass(highlight, true) : "text-accent",
            className,
          )}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="relative inline-block"
            style={showDottedUnderline ? { paddingBottom: underlinePaddingBottom } : undefined}
          >
            {children}
            {showDottedUnderline ? (
              <DottedUnderline
                dotRadius={dotRadius}
                patternWidth={patternWidth}
                patternHeight={patternHeight}
                height={underlineHeight}
                color={underlineColor}
                className={underlineClassName}
              />
            ) : null}
          </span>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className={cn(
              "z-100 origin-(--radix-hover-card-content-transform-origin) perspective-distant",
            )}
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={POP_IN_VARIANT}
                  initial="initial"
                  animate="animate"
                  transition={SPRING_CONFIG}
                  className="rounded-xl shadow-2xl"
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl shadow"
                    style={{ fontSize: 0 }}
                  >
                    {/* Microlink returns a redirect, not a stable asset — next/image can't optimise it. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
