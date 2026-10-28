"use client";

import { useRef } from "react";
import { DURATION, EASE, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type SwapTextProps = {
  children: string;
  /** Direction the new text comes from: 1 = below, -1 = above. */
  direction?: 1 | -1;
  className?: string;
};

/**
 * Text that rises into place whenever it changes. The clip leaves room around
 * the glyphs for negative tracking and tight line heights.
 */
export function SwapText({
  children,
  direction = 1,
  className,
}: SwapTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(textRef.current, {
          yPercent: 110 * direction,
          duration: DURATION.hover + 0.3,
          ease: EASE.out,
        });
      });
      return () => media.revert();
    },
    { dependencies: [children] },
  );

  return (
    <span
      className={cn(
        "-m-[0.2em] block overflow-hidden p-[0.2em] whitespace-nowrap",
        className,
      )}
    >
      <span ref={textRef} className="block">
        {children}
      </span>
    </span>
  );
}
