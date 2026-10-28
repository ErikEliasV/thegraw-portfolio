"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { CASES_PAGE } from "@/constants/cases";
import { CASES_DRAWER_DITHER } from "@/constants/dither";
import { getProjectHref } from "@/constants/projects";
import { DitherImage } from "@/features/dither-image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DURATION, EASE, gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types/project";

/** Figma: the 2338px card row is centered on the 1920 frame. */
const START_OFFSET = -209 / 1920;
/** Pointer travel that turns a press into a drag (and cancels the click). */
const DRAG_THRESHOLD = 6;

type CasesDrawerProps = {
  open: boolean;
  onClose: () => void;
  projects: readonly Project[];
  returnFocusRef: RefObject<HTMLElement | null>;
};

/**
 * Figma "Cases - all view": the page blurs and a panel rises with every case
 * on a horizontal track (wheel, drag or keyboard) and its progress bar.
 */
export function CasesDrawer({
  open,
  onClose,
  projects,
  returnFocusRef,
}: CasesDrawerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(open);
  const reducedMotion = useReducedMotion();
  if (open && !mounted) setMounted(true);

  // Enter and leave.
  useGSAP(
    () => {
      if (!mounted) return;
      const timeline = gsap.timeline({ defaults: { ease: EASE.expo } });
      if (open) {
        timeline
          .fromTo(
            "[data-drawer-veil]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: EASE.out },
          )
          .fromTo(
            "[data-drawer-panel]",
            { yPercent: 100 },
            { yPercent: 0, duration: DURATION.enterSlow },
            0,
          )
          .fromTo(
            "[data-drawer-item]",
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: DURATION.enter, stagger: 0.04 },
            0.25,
          );
      } else {
        timeline
          .to("[data-drawer-panel]", {
            yPercent: 100,
            duration: 0.8,
            ease: EASE.inOut,
            overwrite: "auto",
          })
          .to(
            "[data-drawer-veil]",
            {
              autoAlpha: 0,
              duration: 0.6,
              ease: EASE.inOut,
              overwrite: "auto",
            },
            0.2,
          )
          .call(() => setMounted(false));
      }
      if (reducedMotion) timeline.progress(1);
    },
    { scope: rootRef, dependencies: [open, mounted, reducedMotion] },
  );

  // Focus, Escape and the page behind.
  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef.current;
    rootRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  // Horizontal track: wheel and drag move a target the track eases to.
  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!mounted || !viewport || !track || !thumb) return;

      const range = () => Math.min(0, viewport.clientWidth - track.scrollWidth);
      const clamp = (value: number) => gsap.utils.clamp(range(), 0, value);
      let target = clamp(viewport.clientWidth * START_OFFSET);
      let x = target;
      let dragging: { pointer: number; start: number; from: number } | null =
        null;
      let dragged = false;

      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        target = clamp(target - (event.deltaY + event.deltaX));
      };
      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        dragging = {
          pointer: event.pointerId,
          start: event.clientX,
          from: target,
        };
        dragged = false;
      };
      const onPointerMove = (event: PointerEvent) => {
        if (dragging?.pointer !== event.pointerId) return;
        const distance = event.clientX - dragging.start;
        if (!dragged && Math.abs(distance) > DRAG_THRESHOLD) {
          dragged = true;
          viewport.setPointerCapture(event.pointerId);
        }
        if (dragged) target = clamp(dragging.from + distance);
      };
      const onPointerUp = () => {
        dragging = null;
      };
      // A drag must not open the card it started on.
      const onClick = (event: MouseEvent) => {
        if (!dragged) return;
        event.preventDefault();
        dragged = false;
      };
      // Keyboard: bring the focused card into view.
      const onFocusIn = (event: FocusEvent) => {
        const card = (event.target as HTMLElement).closest("li");
        if (!card) return;
        const left = card.offsetLeft + x;
        const right = left + card.offsetWidth;
        if (left < 0) target = clamp(target - left);
        else if (right > viewport.clientWidth)
          target = clamp(target - (right - viewport.clientWidth));
      };

      const tick = (_time: number, deltaTime: number) => {
        const ease = reducedMotion ? 1 : 1 - Math.pow(0.86, deltaTime / 16.67);
        x += (target - x) * ease;
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
        const min = range();
        const visible = viewport.clientWidth / track.scrollWidth;
        const progress = min < 0 ? x / min : 0;
        thumb.style.width = `${visible * 100}%`;
        thumb.style.left = `${progress * (1 - visible) * 100}%`;
      };

      viewport.addEventListener("wheel", onWheel, { passive: false });
      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("pointermove", onPointerMove);
      viewport.addEventListener("pointerup", onPointerUp);
      viewport.addEventListener("pointercancel", onPointerUp);
      viewport.addEventListener("click", onClick, true);
      viewport.addEventListener("focusin", onFocusIn);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        viewport.removeEventListener("wheel", onWheel);
        viewport.removeEventListener("pointerdown", onPointerDown);
        viewport.removeEventListener("pointermove", onPointerMove);
        viewport.removeEventListener("pointerup", onPointerUp);
        viewport.removeEventListener("pointercancel", onPointerUp);
        viewport.removeEventListener("click", onClick, true);
        viewport.removeEventListener("focusin", onFocusIn);
      };
    },
    { dependencies: [mounted, reducedMotion, projects] },
  );

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={CASES_PAGE.viewAll}
      className="fixed inset-0 z-45"
    >
      <div
        data-drawer-veil
        aria-hidden
        className="invisible absolute inset-0 backdrop-blur-veil"
        onClick={onClose}
      />
      <div
        data-drawer-panel
        className="absolute inset-x-0 bottom-0 flex flex-col items-center overflow-hidden bg-paper pt-32 pb-40 lg:h-620 lg:pt-39 lg:pb-0"
      >
        <DitherImage {...CASES_DRAWER_DITHER} animation="intro" />
        <Link
          data-drawer-item
          href="/cases/all"
          className="group relative text-more text-red-graw"
        >
          {CASES_PAGE.viewAll}
        </Link>
        <div
          ref={viewportRef}
          className="relative mt-32 w-full cursor-grab touch-pan-y select-none active:cursor-grabbing lg:mt-77"
        >
          <ul ref={trackRef} className="flex w-max gap-12 lg:gap-22">
            {projects.map((project) => (
              <li
                key={project.slug}
                data-drawer-item
                className="w-[72vw] shrink-0 lg:w-568"
              >
                <Link
                  href={getProjectHref(project)}
                  draggable={false}
                  className="group relative block aspect-[568/320] overflow-hidden bg-gray-graw"
                >
                  <Image
                    src={project.cover}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, 72vw"
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-power3 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-drawer-item
          aria-hidden
          className="relative mt-32 h-4 w-[60vw] lg:mt-77 lg:w-609"
        >
          <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-track" />
          <span
            ref={thumbRef}
            className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-red-graw"
          />
        </div>
      </div>
    </div>
  );
}
