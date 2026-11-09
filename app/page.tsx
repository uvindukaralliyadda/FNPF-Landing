import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/site";
import { SplitIntro } from "@/components/SplitIntro";

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

/* Split width (desktop).
   --w is registered in globals.css (@property) and .sp already
   transitions it over .8s, so changing it here animates smoothly.
   Default 50 / 50 → hover left 58 / 42 → hover right 42 / 58. */
const splitWidth =
  "min-[900px]:![--w:50%] min-[900px]:[&:has(.sp-new:hover)]:![--w:58%] min-[900px]:[&:has(.sp-ex:hover)]:![--w:42%]";

/* Desktop: content fills the full height of each half.
   Heading + subheading at the top, CTA + links at the bottom,
   leaving the middle of the photo (the people) clear. */
const inner =
  "flex flex-col items-center min-[900px]:!m-0 min-[900px]:![transform:none] min-[900px]:!w-full min-[900px]:!max-w-none min-[900px]:!h-full min-[900px]:justify-between min-[900px]:!px-6 min-[900px]:!pt-[9vh] min-[900px]:!pb-[4vh]";

/* Desktop: left panel width follows --w, no clip-path. */
const leftPanel =
  "min-[900px]:!w-[var(--w)] min-[900px]:![clip-path:none] min-[900px]:justify-center";

/* Desktop: right panel starts at --w and fills the rest. */
const rightPanel =
  "min-[900px]:!left-[var(--w)] min-[900px]:!right-0 min-[900px]:!w-auto min-[900px]:justify-center";

/* Dims the panel that is NOT hovered (desktop). */
const dimWhenNewHovered =
  "pointer-events-none absolute inset-0 -z-10 bg-black/35 opacity-0 transition-opacity duration-700 max-[899px]:hidden [.sp:has(.sp-new:hover)_&]:opacity-100";

const dimWhenExHovered =
  "pointer-events-none absolute inset-0 -z-10 bg-black/35 opacity-0 transition-opacity duration-700 max-[899px]:hidden [.sp:has(.sp-ex:hover)_&]:opacity-100";

/* Groups inside each panel */
const group = "flex flex-col items-center";

/* Desktop: heading stays on ONE line on both sides. */
const heading =
  "text-[2rem] font-semibold leading-[1.04] tracking-display [text-shadow:0_2px_20px_rgba(0,0,0,.45)] min-[900px]:whitespace-nowrap min-[900px]:text-[clamp(1.75rem,2.7vw,2.75rem)]";

/* Desktop: subheading always reserves exactly 2 lines (leading 1.6 × 2). */
const lead =
  "sp-lead mt-3 max-w-[34ch] text-sm leading-[1.55] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,.45)] min-[900px]:mt-4 min-[900px]:min-h-[3.2em] min-[900px]:text-lg min-[900px]:leading-[1.6]";

/* ---------- CTA button + red hover animation ---------- */

/* Base button: white pill. On hover/focus → white text, lift, red glow. */
const ctaButton =
  "group/cta btn btn-white relative isolate overflow-hidden mt-6 w-[230px] justify-center transition-[color,box-shadow,translate] duration-300 ease-out hover:bg-white hover:text-white hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(200,16,46,.65),0_0_0_4px_rgba(200,16,46,.22)] focus-visible:text-white focus-visible:shadow-[0_14px_34px_-8px_rgba(200,16,46,.65),0_0_0_4px_rgba(200,16,46,.22)] min-[900px]:mt-0 min-[900px]:w-[300px] min-[900px]:min-h-14 min-[900px]:text-base";

/* Red fill: sweeps in from the left, sweeps out to the right. */
const ctaFill =
  "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-linear-to-r from-brand to-[#E11D48] origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.25,1)] group-hover/cta:origin-left group-hover/cta:scale-x-100 group-focus-visible/cta:origin-left group-focus-visible/cta:scale-x-100";

/* Shine: a soft white streak that passes across once the red is in. */
const ctaShine =
  "pointer-events-none absolute inset-y-0 -left-1/2 -z-[5] w-1/3 -skew-x-[20deg] bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition-[translate,opacity] duration-0 group-hover/cta:translate-x-[450%] group-hover/cta:opacity-100 group-hover/cta:duration-700 group-hover/cta:delay-200";

/* Arrow: hidden, slides in after the label on hover. */
const ctaArrow =
  "-ml-2 w-0 shrink-0 opacity-0 transition-[width,margin,opacity,translate] duration-300 ease-out group-hover/cta:ml-0 group-hover/cta:w-4 group-hover/cta:translate-x-0.5 group-hover/cta:opacity-100 group-focus-visible/cta:ml-0 group-focus-visible/cta:w-4 group-focus-visible/cta:opacity-100";

const linkRow =
  "mt-6 flex w-max max-w-full flex-wrap justify-center gap-x-10 text-sm font-medium max-[899px]:hidden min-[900px]:mt-5 min-[900px]:text-base";

const link =
  "inline-flex min-h-11 items-center underline decoration-white/60 underline-offset-[6px] hover:decoration-white";

/* Dark fades behind the text (theme colours).
   Top fade sits behind the heading, bottom fade behind the CTA.
   New members → primary navy (#0F172A)
   Existing    → ink black (#020617) */
const fadeNew =
  "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,23,42,.85)_0%,rgba(15,23,42,.45)_18%,rgba(15,23,42,0)_38%,rgba(15,23,42,0)_62%,rgba(15,23,42,.55)_80%,rgba(15,23,42,.92)_100%)]";

const fadeEx =
  "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,23,.85)_0%,rgba(2,6,23,.45)_18%,rgba(2,6,23,0)_38%,rgba(2,6,23,0)_62%,rgba(2,6,23,.55)_80%,rgba(2,6,23,.92)_100%)]";

/* Very light colour wash over the whole photo */
const tintNew =
  "pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/15 to-transparent to-60%";

const tintEx =
  "pointer-events-none absolute inset-0 -z-10 bg-linear-to-bl from-ink/20 to-transparent to-60%";

/* ------------------------------------------------------------------ */
/*  CTA button                                                         */
/* ------------------------------------------------------------------ */

function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={ctaButton}>
      <span aria-hidden="true" className={ctaFill} />
      <span aria-hidden="true" className={ctaShine} />
      <span>{label}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={ctaArrow}
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel content (identical structure for both sides)                 */
/* ------------------------------------------------------------------ */

type PanelLink = { label: string; href: string; external?: boolean };

type PanelContentProps = {
  id: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  links: PanelLink[];
};

function PanelContent({ id, title, text, cta, links }: PanelContentProps) {
  return (
    <>
      {/* Top: heading + subheading */}
      <div className={group}>
        <h2 id={id} className={heading}>
          {title}
        </h2>

        <p className={lead}>{text}</p>
      </div>

      {/* Bottom: CTA + links */}
      <div className={group}>
        <CtaButton href={cta.href} label={cta.label} />

        <ul className={linkRow}>
          {links.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

/** Split landing page: New Members on the left, Existing Members on the right. */
export default function SplitLandingPage() {
  return (
    <main
      className={`sp relative h-[100svh] min-h-[560px] overflow-hidden bg-black text-white min-[900px]:min-h-[600px] ${splitWidth}`}
    >
      <h1 className="sr-only">Fiji National Provident Fund</h1>

      {/* Existing members (right) */}
      <section
        aria-labelledby="sp-ex-title"
        className={`sp-side sp-ex absolute inset-0 isolate flex items-center text-center ${rightPanel}`}
      >
        <Image
          src="/images/exisistingmember.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 100vw, 58vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "60% 55%" }}
        />

        <div aria-hidden="true" className={tintEx} />
        <div aria-hidden="true" className={fadeEx} />
        <div aria-hidden="true" className={dimWhenNewHovered} />

        <div className={`sp-ex-inner ${inner}`}>
          <PanelContent
            id="sp-ex-title"
            title="Already a member?"
            text="Check your balance, apply for a withdrawal or update your details."
            cta={{ label: "Go to member services", href: "/members" }}
            links={[
              { label: "Log in to myFNPF", href: PORTAL, external: true },
              { label: "Withdrawals", href: "/members#about" },
              { label: "Retirement", href: "/members#retire" },
            ]}
          />
        </div>
      </section>

      {/* New members (left) */}
      <section
        aria-labelledby="sp-new-title"
        className={`sp-side sp-new absolute bottom-0 left-0 top-0 z-[2] isolate flex items-center text-center ${leftPanel}`}
      >
        <Image
          src="/images/newmember.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 100vw, 58vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "45% 40%" }}
        />

        <div aria-hidden="true" className={tintNew} />
        <div aria-hidden="true" className={fadeNew} />
        <div aria-hidden="true" className={dimWhenExHovered} />

        <div className={`sp-new-inner ${inner}`}>
          <PanelContent
            id="sp-new-title"
            title="New to FNPF?"
            text="Learn how to register, what you contribute and how your savings support you."
            cta={{ label: "See how to join", href: "/new-members" }}
            links={[
              { label: "How to register", href: "/new-members#steps" },
              { label: "Contributions", href: "/new-members#about" },
              { label: "The myFNPF app", href: "/new-members#app" },
            ]}
          />
        </div>
      </section>

      {/* Straight vertical divider — follows --w (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[var(--w)] z-[3] w-px -translate-x-1/2 bg-white/70 max-[899px]:hidden"
      />

      {/* Mobile seam (unchanged) */}
      <svg
        className="sp-seam-m pointer-events-none absolute left-0 top-0 z-[3] hidden w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength={1} d="M100 86 C70 100 30 82 0 100" />
      </svg>

      {/* FNPF logo — rides on the divider (desktop) */}
      <div className="sp-logo absolute top-1/2 z-[4] grid h-[84px] w-[84px] place-items-center rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.14),0_18px_40px_rgba(0,0,0,.35)] min-[900px]:!left-[var(--w)] min-[900px]:h-28 min-[900px]:w-28">
        <Image
          src="/images/fnpf-logo.jpg"
          alt="FNPF"
          width={80}
          height={73}
          className="h-auto w-[52px] min-[900px]:w-[68px]"
        />
      </div>

      <SplitIntro />
    </main>
  );
}