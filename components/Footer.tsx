"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { EMAIL, PHONE } from "@/lib/site";
import { Icon } from "./Icon";
import { StoreButtons } from "./StoreButtons";

type Kind = "new" | "members";

const CONTENT: Record<Kind, { title: string; text: string; links: { label: string; href: string }[]; switchLink: { label: string; href: string } }> = {
  new: {
    title: "Ready to start saving?",
    text: "Register with FNPF, then follow every contribution in the myFNPF app. Simple, secure and made for you.",
    links: [
      { label: "Home", href: "/new-members" },
      { label: "Why FNPF", href: "/new-members#about" },
      { label: "Join FNPF", href: "/new-members#join" },
      { label: "Your savings", href: "/new-members#about" },
      { label: "Go digital", href: "/new-members#app" },
    ],
    switchLink: { label: "Already a member?", href: "/members" },
  },
  members: {
    title: "Your savings, wherever you are",
    text: "Check your balance, apply for withdrawals and track them in the myFNPF app. Secure, quick and always with you.",
    links: [
      { label: "Home", href: "/members" },
      { label: "My account", href: "/members#tasks" },
      { label: "Withdrawals", href: "/members#about" },
      { label: "Retirement", href: "/members#retire" },
      { label: "Member news", href: "/members#news" },
    ],
    switchLink: { label: "New to FNPF?", href: "/new-members" },
  },
};

const linkClass =
  "inline-flex min-h-10 items-center text-[13px] font-medium uppercase tracking-[0.06em] text-slate-200 no-underline transition-colors hover:text-sky-300";

export function Footer({ kind }: { kind: Kind }) {
  const c = CONTENT[kind];
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputId = `newsletter-${kind}`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!input.value || !input.checkValidity()) {
      setInvalid(true);
      setMessage("Enter a valid email address, for example name@example.com.");
      input.focus();
      return;
    }
    // TODO: connect to FNPF's newsletter service.
    setInvalid(false);
    setMessage(`Subscribed. Updates will go to ${input.value}.`);
    e.currentTarget.reset();
  }

  return (
    <footer className="bg-surface pb-5 sm:pb-8">
      <div className="wrap">
        <div data-anim="ft" className="overflow-hidden rounded-[22px] shadow-footer sm:rounded-4xl">
          {/* Light app panel */}
          <div
            id={kind === "members" ? "app" : "footer-app"}
            className="relative grid overflow-hidden bg-[radial-gradient(60%_90%_at_78%_40%,rgba(255,255,255,.9)_0%,rgba(255,255,255,0)_70%),linear-gradient(135deg,#EEF2F6_0%,#E2E8F0_100%)] md:min-h-[360px] md:grid-cols-[1.2fr_.8fr] md:items-center"
          >
            <div data-anim="ft-copy" className="px-6 pb-2 pt-10 md:p-10 lg:p-16">
              <h2 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-primary lg:text-4xl">{c.title}</h2>
              <p className="mt-3.5 max-w-[46ch] text-base leading-[1.65] text-secondary">{c.text}</p>
              <StoreButtons className="mt-7" />
            </div>
            <div className="relative h-[300px] md:h-auto md:self-stretch">
              <PhoneMock />
            </div>
          </div>

          {/* Dark link band */}
          <div className="bg-primary px-6 pt-10 text-slate-200 md:px-10 md:pt-12 lg:px-16 lg:pt-14">
            <div data-anim="ft-links" className="grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-[1fr_1fr_1.25fr]">
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
                ))}
              </ul>
              <ul>
                {[{ label: "Privacy policy", href: "#" }, { label: "Terms and conditions", href: "#" }, { label: "Whistleblower policy", href: "#" }, { label: "Contact us", href: "#" }].map((l) => (
                  <li key={l.label}><a href={l.href} className={linkClass}>{l.label}</a></li>
                ))}
                <li><Link href={c.switchLink.href} className={linkClass}>{c.switchLink.label}</Link></li>
              </ul>

              <div data-anim="ft-news" className="col-span-2 lg:col-span-1">
                <h3 className="text-xl font-medium tracking-[-0.01em] text-white">Get member updates</h3>
                <p className="mt-1.5 text-[13px] text-slate-400">News, newsletters and Annual Member Forum dates.</p>
                <form onSubmit={onSubmit} noValidate className="mt-5 flex gap-2">
                  <label htmlFor={inputId} className="sr-only">Email address</label>
                  <input
                    id={inputId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    aria-invalid={invalid || undefined}
                    aria-describedby={`${inputId}-msg`}
                    className="h-12 min-w-0 flex-1 rounded-[10px] border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder:text-slate-400 focus-visible:outline-accent"
                  />
                  <button type="submit" className="h-12 rounded-[10px] bg-accent px-[18px] text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
                    Subscribe
                  </button>
                </form>
                <p id={`${inputId}-msg`} role="status" className="mt-2 min-h-5 text-[13px] text-sky-300">{message}</p>
                <div className="mt-3 flex gap-3">
                  <Social label="Facebook" path="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.2V10H7v4h3v8h4v-8h3l.5-4H14V8.6c0-.4.2-.6.6-.6z" />
                  <Social label="Instagram" instagram />
                  <Social label="LinkedIn" path="M4 9h4v12H4zM6 3a2 2 0 110 4 2 2 0 010-4zM10 9h3.8v1.7c.6-1 1.8-2 3.7-2 4 0 4.5 2.6 4.5 6V21h-4v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-4z" />
                  <Social label="YouTube" path="M22 8.2c-.2-1.5-1-2.5-2.5-2.7C17.3 5.2 12 5.2 12 5.2s-5.3 0-7.5.3C3 5.7 2.2 6.7 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.5 1 2.5 2.5 2.7 2.2.3 7.5.3 7.5.3s5.3 0 7.5-.3c1.5-.2 2.3-1.2 2.5-2.7.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15.1V8.9l5.2 3.1z" />
                </div>
                <div className="mt-5 grid gap-0.5 text-[13px] text-slate-400">
                  <span>Call <a href={PHONE.href} className="text-slate-300 hover:text-white">{PHONE.label}</a></span>
                  <span>Email <a href={EMAIL.href} className="text-slate-300 hover:text-white">{EMAIL.label}</a></span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pb-7 pt-6 text-center text-xs font-medium uppercase tracking-[0.06em] text-slate-400 md:mt-12">
              <span>&copy; 2026 Fiji National Provident Fund. All rights reserved.</span>
              <Link href="/" className="text-slate-200 hover:text-white">Choose another path</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, path, instagram }: { label: string; path?: string; instagram?: boolean }) {
  return (
    <a
      href="#"
      aria-label={`FNPF on ${label}`}
      className="grid h-10 w-10 place-items-center rounded-[10px] bg-white text-primary transition duration-200 hover:-translate-y-0.5 hover:bg-accent-tint"
    >
      {instagram ? (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
          <path d={path} />
        </svg>
      )}
    </a>
  );
}

/** myFNPF app screen drawn in code (sample data for illustration). */
function PhoneMock() {
  return (
    <div
      data-anim="ft-phone"
      aria-hidden="true"
      className="absolute left-1/2 top-6 h-[480px] w-[240px] -translate-x-1/2 rounded-[46px] bg-[#0B1220] p-2.5 shadow-[0_30px_60px_rgba(15,23,42,.28),inset_0_0_0_2px_#334155] md:top-10 md:h-[540px] md:w-[270px]"
    >
      <div data-anim="ft-screen" className="relative h-full w-full overflow-hidden rounded-[37px] bg-white px-4 py-3.5 text-xs text-ink">
        <div className="absolute left-1/2 top-2.5 h-6 w-[84px] -translate-x-1/2 rounded-[14px] bg-[#0B1220]" />
        <div className="flex h-[22px] items-center justify-between px-1.5 text-xs font-semibold">
          <span>9:41</span>
          <span className="inline-block h-2.5 w-[22px] rounded-[3px] border-[1.5px] border-ink" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <b className="block text-[15px] font-semibold tracking-[-0.01em]">Bula, Mere</b>
            <span className="block text-[13px] text-slate-400">Welcome back</span>
          </div>
          <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-accent-tint text-[13px] font-semibold text-accent">M</div>
        </div>
        <div className="mt-3.5 rounded-[18px] bg-linear-to-br from-accent to-accent-hover p-4 text-white">
          <small className="text-[11px] opacity-85">Total balance</small>
          <strong className="mt-1 block text-2xl font-semibold tracking-[-0.02em] tabular-nums">$12,480.50</strong>
          <div className="mt-3 flex h-1.5 overflow-hidden rounded-md bg-white/25">
            <span className="w-[70%] bg-white" />
          </div>
          <div className="mt-2 flex justify-between text-[10.5px] opacity-90">
            <span>Preserved 70%</span>
            <span>General 30%</span>
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {(
            [
              ["send", "Withdraw"],
              ["file", "Statement"],
              ["users", "Nominee"],
            ] as const
          ).map(([icon, label]) => (
            <div key={label} className="rounded-[14px] border border-line bg-surface px-1.5 py-2.5 text-center text-[11px] font-medium">
              <Icon name={icon} className="mx-auto mb-1 h-[18px] w-[18px] text-accent" />
              {label}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[14px] border border-line px-3 py-2.5 text-[11.5px]">
          <span>Contribution received</span>
          <em className="font-semibold not-italic text-green-600">+$184.20</em>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[14px] border border-line px-3 py-2.5 text-[11.5px]">
          <span>Education claim</span>
          <span>In review</span>
        </div>
      </div>
    </div>
  );
}
