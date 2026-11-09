import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/site";
import { SplitIntro } from "@/components/SplitIntro";

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

/* Desktop: content fills the full height of each half.
   Heading + subheading at the top, CTA + links at the bottom,
   leaving the middle of the photo (the people) clear. */
const inner =
  "flex flex-col items-center min-[900px]:!m-0 min-[900px]:![transform:none] min-[900px]:!w-full min-[900px]:!max-w-none min-[900px]:!h-full min-[900px]:justify-between min-[900px]:!px-6 min-[900px]:!pt-[9vh] min-[900px]:!pb-[4vh]";

/* Desktop: each panel is exactly half the screen, no clip-path. */
const half =
  "min-[900px]:!w-1/2 min-[900px]:![clip-path:none] min-[900px]:justify-center";

/* Groups inside each panel */
const group = "flex flex-col items-center";

/* Desktop: heading stays on ONE line on both sides. */
const heading =
  "text-[2rem] font-semibold leading-[1.04] tracking-display [text-shadow:0_2px_20px_rgba(0,0,0,.45)] min-[900px]:whitespace-nowrap min-[900px]:text-[clamp(1.75rem,2.7vw,2.75rem)]";

/* Desktop: subheading always reserves exactly 2 lines (leading 1.6 × 2). */
const lead =
  "sp-lead mt-3 max-w-[34ch] text-sm leading-[1.55] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,.45)] min-[900px]:mt-4 min-[900px]:min-h-[3.2em] min-[900px]:text-lg min-[900px]:leading-[1.6]";

const ctaButton =
  "btn btn-white mt-6 w-[230px] justify-center min-[900px]:mt-0 min-[900px]:w-[300px] min-[900px]:min-h-14 min-[900px]:text-base";

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
        <Link href={cta.href} className={ctaButton}>
          {cta.label}
        </Link>

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
    <main className="sp relative h-[100svh] min-h-[560px] overflow-hidden bg-black text-white min-[900px]:min-h-[600px]">
      <h1 className="sr-only">Fiji National Provident Fund</h1>

      {/* Existing members (right half) */}
      <section
        aria-labelledby="sp-ex-title"
        className={`sp-side sp-ex absolute inset-0 isolate flex items-center text-center min-[900px]:!left-1/2 min-[900px]:!right-0 ${half}`}
      >
        <Image
          src="/images/exisistingmember.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 100vw, 50vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "60% 55%" }}
        />

        <div aria-hidden="true" className={tintEx} />
        <div aria-hidden="true" className={fadeEx} />

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

      {/* New members (left half) */}
      <section
        aria-labelledby="sp-new-title"
        className={`sp-side sp-new absolute bottom-0 left-0 top-0 z-[2] isolate flex items-center text-center ${half}`}
      >
        <Image
          src="/images/newmember.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 100vw, 50vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "45% 40%" }}
        />

        <div aria-hidden="true" className={tintNew} />
        <div aria-hidden="true" className={fadeNew} />

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

      {/* Straight vertical divider at exactly 50% (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[3] w-px -translate-x-1/2 bg-white/70 max-[899px]:hidden"
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

      {/* FNPF logo — centred on the divider on desktop */}
      <div className="sp-logo absolute top-1/2 z-[4] grid h-[84px] w-[84px] place-items-center rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.14),0_18px_40px_rgba(0,0,0,.35)] min-[900px]:!left-1/2 min-[900px]:h-28 min-[900px]:w-28">
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