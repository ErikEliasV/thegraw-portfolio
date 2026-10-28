"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { STUDIO_PAGE } from "@/constants/pages";
import { EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

/** Scroll, in viewport heights, that each section stays on screen. */
const STEP = 0.6;
const SHOWN = "inset(0% 0% 0% 0%)";
const HIDDEN = "inset(100% 0% 0% 0%)";

/**
 * Figma "Studio" purpose, pillars and foundations, one at a time: the row
 * pins and the scroll swaps the text (out up, in from below) while the next
 * photo unveils from the bottom over the previous one.
 */
export function StudioPillars() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sections = STUDIO_PAGE.sections;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-pillar]", root);
      const images = gsap.utils.toArray<HTMLElement>(
        "[data-pillar-image]",
        root,
      );
      const count = blocks.length;

      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const pace = context.conditions?.reduced ? 0 : 1;
          let current = 0;
          gsap.set(blocks, { opacity: (index) => (index === 0 ? 1 : 0) });
          gsap.set(images, {
            clipPath: (index) => (index === 0 ? SHOWN : HIDDEN),
          });

          const show = (next: number) => {
            if (next === current) return;
            const forward = next > current ? 1 : -1;
            gsap.to(blocks[current], {
              opacity: 0,
              y: -40 * forward,
              duration: 0.5 * pace,
              ease: EASE.out,
              overwrite: true,
            });
            gsap.fromTo(
              blocks[next],
              { opacity: 0, y: 40 * forward },
              {
                opacity: 1,
                y: 0,
                duration: 0.9 * pace,
                delay: 0.1 * pace,
                ease: EASE.expo,
                overwrite: true,
              },
            );
            images.forEach((image, index) => {
              gsap.to(image, {
                clipPath: index <= next ? SHOWN : HIDDEN,
                duration: 1.1 * pace,
                ease: EASE.expo,
                overwrite: true,
              });
            });
            if (forward > 0) {
              gsap.fromTo(
                images[next].firstElementChild,
                { scale: 1.15 },
                { scale: 1, duration: 1.4 * pace, ease: EASE.expo },
              );
            }
            current = next;
          };

          // Pinned centered in the viewport (or at the top when taller).
          ScrollTrigger.create({
            trigger: root,
            start: () =>
              `top ${Math.max(0, (window.innerHeight - root.offsetHeight) / 2)}px`,
            end: () => `+=${window.innerHeight * STEP * count}`,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              show(Math.min(count - 1, Math.floor(self.progress * count))),
          });
        },
      );
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-48 lg:flex-row lg:items-start lg:gap-101 lg:pl-93"
    >
      <Reveal className="grid lg:w-703">
        {sections.map((section, index) => (
          <div
            key={section.heading}
            data-pillar
            className={cn("col-start-1 row-start-1", index > 0 && "opacity-0")}
          >
            <h2 className="text-heading font-light">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-body">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </Reveal>

      <Reveal className="relative aspect-[938/874] w-full overflow-hidden bg-placeholder lg:w-938">
        {sections.map((section, index) => (
          <div
            key={section.heading}
            data-pillar-image
            className={cn(
              "absolute inset-0 overflow-hidden",
              index > 0 && "[clip-path:inset(100%_0%_0%_0%)]",
            )}
          >
            <Image
              src={section.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 49vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
