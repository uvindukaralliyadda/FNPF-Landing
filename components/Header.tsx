"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CORPORATE, EMAIL, PHONE, type NavItem } from "@/lib/site";
import { Icon } from "@/components/Icon";

type Action = { label: string; href: string; variant: "accent" | "outline"; hideOnTablet?: boolean };

export function Header({
  audience,
  switchText,
  switchHref,
  nav,
  actions,
}: {
  audience: string;
  switchText: string;
  switchHref: string;
  nav: NavItem[];
  actions: Action[];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  /* Shadow once scrolled + reading-progress bar */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Close the mobile menu with Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-primary text-xs font-medium tracking-[0.01em] text-slate-300">
        <div className="wrap flex min-h-10 items-center justify-between gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="hidden sm:inline">{audience}</span>
            <Link href={switchHref} className="font-semibold text-white underline decoration-white/40 underline-offset-[3px] hover:decoration-white">
              {switchText}
            </Link>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <a href={PHONE.href} className="whitespace-nowrap hover:text-white">{PHONE.label}</a>
            <a href={EMAIL.href} className="whitespace-nowrap hover:text-white">{EMAIL.label}</a>
            {CORPORATE.map((l) => (
              <a key={l.label} href={l.href} className="hidden whitespace-nowrap hover:text-white xl:inline">{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      <header
        data-anim="header"
        className={`sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_6px_24px_rgba(15,23,42,.08)]" : ""}`}
      >
        <div className="wrap flex min-h-[68px] items-center gap-3 lg:min-h-[76px] lg:gap-6">
          <Link href="/" aria-label="FNPF home" className="shrink-0">
            <Image src="/images/fnpf-logo.jpg" alt="FNPF" width={55} height={50} priority className="h-[42px] w-auto lg:h-[50px]" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden flex-1 xl:block">
            <ul className="flex justify-center gap-0.5">
              {nav.map((item, i) => (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    aria-current={i === 0 ? "page" : undefined}
                    className="relative flex min-h-11 items-center gap-1 whitespace-nowrap rounded-[10px] px-3 text-sm font-medium tracking-[0.005em] text-secondary transition-colors hover:bg-muted hover:text-primary group-focus-within:bg-muted aria-[current=page]:font-semibold aria-[current=page]:text-primary"
                  >
                    {item.label}
                    {item.children && (
                      <Icon name="chevronDown" className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                    )}
                    {i === 0 && <span className="absolute inset-x-3 -bottom-4 h-[3px] rounded bg-accent" aria-hidden="true" />}
                  </a>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-[calc(100%+8px)] min-w-[260px] translate-y-[-6px] rounded-[14px] border border-line bg-white p-2 opacity-0 shadow-lift transition duration-200 before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-[''] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a href={c.href} className="flex min-h-[42px] items-center rounded-lg px-3 text-sm font-medium text-secondary hover:bg-surface hover:text-accent">
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5 xl:ml-0">
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className={`btn ${a.variant === "accent" ? "btn-accent" : "btn-outline"} min-h-11 px-4 sm:min-h-12 sm:px-6 ${a.hideOnTablet ? "hidden sm:inline-flex" : ""}`}
              >
                {a.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white text-primary xl:hidden"
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {/* Mobile and tablet navigation */}
        <nav
          id="mobile-nav"
          aria-label="Main"
          hidden={!open}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-110px)] overflow-y-auto border-b border-line bg-white px-5 pb-6 pt-2 shadow-lift sm:px-6 xl:hidden"
        >
          <ul>
            {nav.map((item) => (
              <li key={item.label} className="border-b border-line">
                <a href={item.href} onClick={() => setOpen(false)} className="flex min-h-[52px] items-center text-base font-semibold text-primary">
                  {item.label}
                </a>
                {item.children && (
                  <ul className="grid pb-2 sm:grid-cols-2">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} onClick={() => setOpen(false)} className="flex min-h-10 items-center pl-3 text-sm text-muted-fg hover:text-accent">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="grid gap-0.5 pt-4 text-sm text-muted-fg">
            <a href={PHONE.href} className="flex min-h-10 items-center">Call {PHONE.label}</a>
            <a href={EMAIL.href} className="flex min-h-10 items-center">{EMAIL.label}</a>
            {CORPORATE.map((l) => (
              <a key={l.label} href={l.href} className="flex min-h-10 items-center">{l.label}</a>
            ))}
            <Link href={switchHref} className="flex min-h-10 items-center font-semibold text-accent">{switchText}</Link>
          </div>
        </nav>

        <div ref={bar} aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] origin-left scale-x-0 bg-accent" />
      </header>
    </>
  );
}