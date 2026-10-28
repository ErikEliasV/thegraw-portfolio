"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { EdgeFades } from "@/components/ui/edge-fades";
import { getProjectHref } from "@/constants/projects";
import { SERVICE_SLIDE, SERVICES_PAGE } from "@/constants/services";
import { useLenis } from "@/hooks/use-lenis";
import { EASE, gsap, useGSAP } from "@/lib/gsap";

type ServicesProjectsSectionProps = {
  /** "projects <branding>": the label of the selected service. */
  label: string;
  /** Re-runs the entrance when the service changes. */
  serviceId: string;
};

const SLIDES = Array.from(
  { length: SERVICES_PAGE.slidesPerService },
  (_, index) => index,
);

/**
 * Figma "Projetos" (5760×1080): three full-screen project slides side by side.
 * The section pins and the vertical scroll moves the slides sideways; without
 * motion it is a plain horizontal scroller.
 */
export function ServicesProjectsSection({
  label,
  serviceId,
}: ServicesProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        viewport.style.overflowX = "hidden";
        const distance = () => track.scrollWidth - viewport.clientWidth;
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils
          .toArray<HTMLElement>("[data-slide]", section)
          .forEach((item, index) => {
            const image = item.querySelector("[data-slide-image]");
            const content = item.querySelectorAll("[data-slide-content] > *");
            gsap.fromTo(
              image,
              { xPercent: -5 },
              {
                xPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  containerAnimation: slide,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
            gsap.from(content, {
              x: 140,
              autoAlpha: 0,
              duration: 1,
              ease: EASE.out,
              stagger: 0.08,
              scrollTrigger:
                index === 0
                  ? { trigger: section, start: "top 60%", once: true }
                  : {
                      trigger: item,
                      containerAnimation: slide,
                      start: "left 75%",
                      toggleActions: "play none none reverse",
                    },
            });
          });

        return () => {
          viewport.style.overflowX = "";
        };
      });
      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [serviceId], revertOnUpdate: true },
  );

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      aria-label={label}
      className="@container relative h-svh overflow-hidden bg-black-graw text-white"
    >
      <div
        ref={viewportRef}
        data-lenis-prevent-horizontal
        className="absolute inset-0 snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto"
      >
        <ul ref={trackRef} className="flex h-full w-max">
          {SLIDES.map((index) => (
            <li
              key={`${serviceId}-${index}`}
              data-slide
              className="relative h-full w-[100cqw] shrink-0 snap-start overflow-hidden"
            >
              <Link
                href={getProjectHref(SERVICE_SLIDE)}
                className="group absolute inset-0 block focus-visible:outline-offset-[-4px]"
              >
                <div
                  data-slide-image
                  className="absolute inset-y-0 -left-[6%] w-[112%]"
                >
                  <Image
                    src={SERVICE_SLIDE.image}
                    alt=""
                    fill
                    sizes="112vw"
                    className="object-cover transition-transform duration-700 ease-power3 group-hover:scale-[1.02]"
                  />
                </div>
                <div
                  data-slide-content
                  className="absolute inset-x-16 bottom-104 flex flex-col gap-20 lg:inset-x-auto lg:top-115 lg:bottom-auto lg:left-218 lg:flex-row lg:items-start lg:gap-271"
                >
                  <div className="flex flex-col items-start gap-24 lg:w-226.25 lg:gap-71.5">
                    <Image
                      src={SERVICE_SLIDE.logo}
                      alt={SERVICE_SLIDE.client}
                      width={99}
                      height={33}
                      className="h-auto w-80 lg:w-98.5"
                    />
                    <p className="max-w-226 text-lead">
                      {SERVICE_SLIDE.description}
                    </p>
                  </div>
                  <dl className="flex w-full justify-between text-fine whitespace-nowrap uppercase lg:w-514.25">
                    <div className="flex gap-17.5">
                      <dt>{SERVICES_PAGE.clientLabel}</dt>
                      <dd className="font-medium">{SERVICE_SLIDE.client}</dd>
                    </div>
                    <div className="flex gap-11.5">
                      <dt>{SERVICES_PAGE.yearLabel}</dt>
                      <dd className="font-medium">{SERVICE_SLIDE.year}</dd>
                    </div>
                  </dl>
                  <ul className="flex flex-wrap gap-x-12 text-lead lg:block lg:w-146">
                    {SERVICE_SLIDE.disciplines.map((discipline) => (
                      <li key={discipline}>{discipline}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <EdgeFades tone="dark" className="hidden w-222 lg:block" />

      <p className="pointer-events-none absolute top-72 left-1/2 z-20 -translate-x-1/2 text-section whitespace-nowrap text-red-graw lg:top-31">
        {label}
      </p>

      <button
        type="button"
        className="group absolute bottom-24 left-1/2 z-20 flex h-48 w-96 -translate-x-1/2 items-center justify-center bg-coal text-back text-red-graw lg:bottom-45 lg:h-59 lg:w-118"
        onClick={backToTop}
      >
        <span className="transition-transform duration-300 ease-power3 group-hover:-translate-y-3">
          {SERVICES_PAGE.back}
        </span>
      </button>
    </section>
  );
}
