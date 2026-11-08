"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Targets = gsap.TweenTarget;

/**
 * Scroll and load animations for a page. Elements opt in with data-anim attributes.
 *
 * Every tween is a fromTo with explicit end values and clears its inline styles when
 * done. A plain `from` reads the element's current style as its end value, so a CSS
 * transition still running (or React running effects twice in development) could
 * leave elements stuck invisible. Clearing props also lets CSS hover effects work.
 */
export function ScrollMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const one = (sel: string) => q(sel)[0] as HTMLElement | undefined;

      /** Animate from `from` to the element's natural state, then remove inline styles. */
      const enter = (targets: Targets, from: gsap.TweenVars, vars: gsap.TweenVars = {}) =>
        gsap.fromTo(targets, from, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          clearProps: "transform,opacity",
          ...vars,
        });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Load: header, then the quick-action tiles */
        enter(q('[data-anim="header"] .wrap > *'), { y: -12, opacity: 0 }, { duration: 0.6, stagger: 0.08, ease: "power2.out" });
        enter(q('[data-anim="tiles"] > *'), { y: 36, opacity: 0, scale: 0.96 }, { duration: 0.7, stagger: 0.08, ease: "back.out(1.4)", delay: 0.35 });

        /* Hero copy drifts up and fades as you scroll past */
        const hero = one('[aria-roledescription="carousel"]');
        if (hero) {
          gsap.fromTo(
            q('[data-anim="hero-copy"]'),
            { yPercent: 0, opacity: 1 },
            { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } },
          );
        }

        /* Headings and short copy blocks */
        q('[data-anim="reveal"]').forEach((el) => {
          const items = el.children.length ? el.children : el;
          enter(items, { y: 24, opacity: 0 }, { duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        q('[data-anim="slide-in"]').forEach((el) => {
          enter(el, { x: 24, opacity: 0 }, { duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });

        /* Intro image: clip reveal + parallax */
        const frame = one('[data-anim="frame"]');
        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 12% 12% 12% round 24px)" },
            { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.1, ease: "expo.out", clearProps: "clipPath", scrollTrigger: { trigger: frame, start: "top 80%" } },
          );
          const img = frame.querySelector("img");
          if (img) {
            gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
          }
          const badge = one('[data-anim="badge"]');
          if (badge) enter(badge, { x: 30, opacity: 0 }, { duration: 0.7, ease: "back.out(1.6)", scrollTrigger: { trigger: frame, start: "top 60%" } });
        }

        /* Stats + count-up */
        const stats = one('[data-anim="stats"]');
        if (stats) enter(stats.children, { y: 24, opacity: 0 }, { duration: 0.55, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: stats, start: "top 85%" } });
        (q("[data-count]") as HTMLElement[]).forEach((el) => {
          const end = Number(el.dataset.count ?? 0);
          const pre = el.dataset.prefix ?? "";
          const suf = el.dataset.suffix ?? "";
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onStart: () => {
              el.textContent = `${pre}0${suf}`;
            },
            onUpdate: () => {
              el.textContent = `${pre}${Math.round(o.v).toLocaleString("en-US")}${suf}`;
            },
            onComplete: () => {
              el.textContent = `${pre}${end.toLocaleString("en-US")}${suf}`;
            },
          });
        });

        /* Steps: the line draws, then each step pops */
        const steps = one('[data-anim="steps"]');
        if (steps) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: steps, start: "top 80%" } });
          const line = q('[data-anim="steps-line"]');
          if (line.length) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" });
          tl.fromTo(q('[data-anim="step"]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.18, ease: "power2.out", clearProps: "transform,opacity" }, 0.1);
          tl.fromTo(q('[data-anim="step-n"]'), { scale: 0.4 }, { scale: 1, duration: 0.5, stagger: 0.18, ease: "back.out(2)", clearProps: "transform" }, 0.1);
        }

        /* App band */
        const band = one('[data-anim="band"]');
        if (band) {
          enter(band, { y: 48, opacity: 0 }, { duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: band, start: "top 85%" } });
          enter(q('[data-anim="chips"] > *'), { y: 12, opacity: 0 }, { duration: 0.4, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: band, start: "top 70%" } });
          const bimg = band.querySelector('[data-anim="band-img"] img');
          if (bimg) gsap.fromTo(bimg, { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.18, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true } });
        }

        /* Card grids */
        q('[data-anim="cards"]').forEach((grid) => {
          enter(grid.children, { y: 40, opacity: 0 }, { duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 85%" } });
          enter(grid.querySelectorAll("img"), { scale: 1.25 }, { duration: 1.2, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 85%" } });
        });

        /* Footer card */
        const ft = one('[data-anim="ft"]');
        if (ft) {
          enter(ft, { y: 60, opacity: 0 }, { duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ft, start: "top 90%" } });
          enter(q('[data-anim="ft-copy"] > *'), { y: 24, opacity: 0 }, { duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ft, start: "top 75%" } });
          enter(q('[data-anim="ft-phone"]'), { yPercent: 30, rotate: 4 }, { duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ft, start: "top 75%" } });
          enter(q('[data-anim="ft-screen"] > *'), { y: 14, opacity: 0 }, { duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.5, scrollTrigger: { trigger: ft, start: "top 75%" } });
          const links = one('[data-anim="ft-links"]');
          if (links) {
            enter(links.querySelectorAll("li, [data-anim='ft-news'] > *"), { y: 16, opacity: 0 }, { duration: 0.45, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: links, start: "top 90%" } });
          }
        }
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}