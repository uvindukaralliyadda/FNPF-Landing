"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "./Icon";

export type Slide = {
  image: string;
  alt?: string;
  position?: string;
  title: string;
  text: string;
  ctas: { label: string; href: string; variant: "accent" | "ghost" }[];
};

const DURATION = 6.5; // seconds per slide

/**
 * Accessible hero carousel: autoplay with a visible progress bar, pause button,
 * pause on hover/focus, arrows, dots, swipe and arrow keys. Autoplay is off when
 * the visitor prefers reduced motion.
 */
export function HeroSlider({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const tween = useRef<gsap.core.Tween | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => setIndex(((n % slides.length) + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  /* Animate the incoming slide */
  useEffect(() => {
    const el = slideEls.current[index];
    if (!el || reduced) return;
    const img = el.querySelector("img");
    const parts = el.querySelectorAll("[data-slide-part]");
    const ctx = gsap.context(() => {
      if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: DURATION + 1.5, ease: "none" });
      gsap.fromTo(parts, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.15 });
    }, el);
    return () => ctx.revert();
  }, [index, reduced]);

  /* Progress bar drives autoplay */
  useEffect(() => {
    tween.current?.kill();
    bars.current.forEach((b) => b && gsap.set(b, { scaleX: 0 }));
    const bar = bars.current[index];
    if (!bar) return;
    if (!playing) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    tween.current = gsap.to(bar, { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => go(index + 1) });
    return () => {
      tween.current?.kill();
    };
  }, [index, playing, go]);

  useEffect(() => {
    if (!tween.current) return;
    if (held) tween.current.pause();
    else tween.current.resume();
  }, [held, index]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={label}
      className="relative isolate h-[clamp(620px,82vh,760px)] overflow-hidden bg-primary text-white md:h-[clamp(560px,82vh,760px)]"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => {
        const active = i === index;
        const Heading = i === 0 ? "h1" : "h2";
        return (
          <div
            key={s.title}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            className="slide absolute inset-0"
            data-active={active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={!active}
            inert={!active}
          >
            <Image
              src={s.image}
              alt={s.alt ?? ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className="-z-20 bg-slate-800 object-cover"
              style={{ objectPosition: s.position ?? "50% 50%" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,23,42,.35)_0%,rgba(15,23,42,.9)_60%)] md:bg-[linear-gradient(90deg,rgba(15,23,42,.88)_0%,rgba(15,23,42,.62)_45%,rgba(15,23,42,.08)_100%)]"
            />
            <div data-anim="hero-copy" className="wrap flex h-full items-end pb-[200px] md:items-center md:pb-24">
              <div className="max-w-[600px]">
                <Heading data-slide-part className="text-[2.5rem] font-semibold leading-[1.04] tracking-display md:text-[3.25rem] lg:text-[4rem]">
                  {s.title}
                </Heading>
                <p data-slide-part className="mt-4 max-w-[42ch] text-base leading-[1.55] text-slate-200 md:text-lg">
                  {s.text}
                </p>
                <div data-slide-part className="mt-6 flex flex-wrap gap-3 md:mt-8">
                  {s.ctas.map((c) => (
                    <a key={c.label} href={c.href} className={`btn ${c.variant === "accent" ? "btn-accent" : "btn-ghost"}`}>
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-[120px] z-10">
        <div className="wrap flex items-center gap-2 sm:gap-4">
          <RoundButton label="Previous slide" onClick={() => go(index - 1)} icon="chevronLeft" />
          <div className="flex items-center">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="grid h-11 w-10 place-items-center sm:w-11"
              >
                <span className="relative block h-1 w-7 overflow-hidden rounded bg-white/35 sm:w-8">
                  <span
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left scale-x-0 bg-white"
                  />
                </span>
              </button>
            ))}
          </div>
          <RoundButton label="Next slide" onClick={() => go(index + 1)} icon="chevronRight" />
          <RoundButton
            label={playing ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setPlaying((p) => !p)}
            icon={playing ? "pause" : "play"}
          />
          <span aria-hidden="true" className="hidden text-xs font-medium tracking-[0.08em] text-slate-300 tabular-nums sm:inline">
            {pad(index + 1)} / {pad(slides.length)}
          </span>
          <span className="sr-only" aria-live="polite">
            Slide {index + 1} of {slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}

function RoundButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: "chevronLeft" | "chevronRight" | "pause" | "play" }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[1.5px] border-white/50 bg-primary/25 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  );
}
