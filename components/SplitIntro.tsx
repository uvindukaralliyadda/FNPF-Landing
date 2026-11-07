"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Load animation for the split landing page: text rises, photos ease out of a zoom. */
export function SplitIntro() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".sp-new-inner > *", { y: 32, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", delay: 0.25 });
      gsap.from(".sp-ex-inner > *", { y: 32, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", delay: 0.45 });
      gsap.fromTo(".sp-photo", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power2.out" });
    });
  });
  return null;
}
