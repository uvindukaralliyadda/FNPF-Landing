"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Load animation for the split landing page: text rises, photos ease out of a zoom. */
export function SplitIntro() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // fromTo with explicit end values: never reads the current opacity, so a
      // CSS transition still in progress (e.g. on .btn) can't leave items hidden.
      const rise = (selector: string, delay: number) =>
        gsap.fromTo(
          selector,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            delay,
            clearProps: "opacity,transform",
          },
        );

      rise(".sp-new-inner > *", 0.25);
      rise(".sp-ex-inner > *", 0.45);

      gsap.fromTo(
        ".sp-photo",
        { scale: 1.12 },
        { scale: 1, duration: 2.4, ease: "power2.out", clearProps: "transform" },
      );
    });
  });

  return null;
}