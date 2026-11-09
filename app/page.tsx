import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/site";
import { SplitIntro } from "@/components/SplitIntro";

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

/* Desktop: content fills the full height of each half.
   Heading + lead sit at the top, CTA + links sit at the bottom,
   leaving the centre of the photo (the people) clear. */
const inner =
  "flex flex-col items-center min-[900px]:!m-0 min-[900px]:![transform:none] min-[900px]:!w-full min-[900px]:!max-w-none min-[900px]:!h-full min-[900px]:justify-between min-[900px]:!px-6 min-[900px]:!pt-[14vh] min-[900px]:!pb-[9vh]";

/* Desktop: each panel is exactly half the screen, no clip-path. */
const half =
  "min-[900px]:!w-1/2 min-[900px]:![clip-path:none] min-[900px]:justify-center";

/* Groups inside each panel */
const topGroup = "flex flex-col items-center";
const bottomGroup = "flex flex-col items-center";

/* Desktop: heading stays on ONE line on both sides. */
const heading =
  "text-[2rem] font-semibold leading-[1.04] tracking-display [text-shadow:0_2px_20px_rgba(0,0,0,.5),0_1px_3px_rgba(0,0,0,.35)] min-[900px]:whitespace-nowrap min-[900px]:text-[clamp(2rem,3.6vw,3.75rem)]";

/* Desktop: lead always reserves exactly 2 lines (leading 1.6 × 2). */
const lead =
  "sp-lead mt-3 max-w-[32ch] text-sm leading-[1.55] text-white [text-shadow:0_1px_12px_rgba(0,0,0,.55),0_1px_2px_rgba(0,0,0,.4)] min-[900px]:mt-5 min-[900px]:min-h-[3.2em] min-[900px]:text-lg min-[900px]:leading-[1.6]";

const ctaButton =
  "btn btn-white mt-6 w-[230px] justify-center min-[900px]:mt-0";

const linkRow =
  "mt-6 flex w-max max-w-full flex-wrap justify-center gap-x-6 border-t border-white/30 pt-4 text-sm font-medium max-[899px]:hidden";

const link =
  "inline-flex min-h-11 items-center underline decoration-white/60 underline-offset-[5px] [text-shadow:0_1px_8px_rgba(0,0,0,.5)] hover:decoration-white";

/* Shared subtle dark vignette */
const vignette =
  "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_100%_at_50%_45%,rgba(0,0,0,0)_55%,rgba(0,0,0,.30)_100%),linear-gradient(180deg,rgba(0,0,0,.12)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,.32)_100%)]";

/* Soft shade behind text.
   Desktop: one shade behind the top text, one behind the bottom CTA. */
const textShade =
  "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_35%_at_50%_45%,rgba(0,0,0,.30)_0%,rgba(0,0,0,0)_100%)] min-[900px]:bg-[radial-gradient(60%_28%_at_50%_24%,rgba(0,0,0,.38)_0%,rgba(0,0,0,0)_100%),radial-gradient(55%_22%_at_50%_86%,rgba(0,0,0,.34)_0%,rgba(0,0,0,0)_100%)]";

/* Theme gradients
   New members  → accent blue (#0369A1)
   Existing     → ink / primary navy-black (#020617 / #0F172A) */
const gradientNew =
  "pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/55 via-accent/20 via-50% to-primary/40";

const gradientEx =
  "pointer-events-none absolute inset-0 -z-10 bg-linear-to-bl from-ink/65 via-primary/30 via-50% to-ink/55";

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
      {/* Top: heading + lead */}
      <div className={topGroup}>
        <h2 id={id} className={heading}>
          {title}
        </h2>

        <p className={lead}>{text}</p>
      </div>

      {/* Bottom: CTA + links */}
      <div className={bottomGroup}>
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

      {/* Existing members (right half) — blackish */}
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
          style={{ objectPosition: "60% 30%" }}
        />

        <div aria-hidden="true" className={vignette} />
        <div aria-hidden="true" className={gradientEx} />
        <div aria-hidden="true" className={textShade} />

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

      {/* New members (left half) — blue */}
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
          style={{ objectPosition: "45% 25%" }}
        />

        <div aria-hidden="true" className={vignette} />
        <div aria-hidden="true" className={gradientNew} />
        <div aria-hidden="true" className={textShade} />

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
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[3] w-[2px] -translate-x-1/2 bg-white/80 max-[899px]:hidden"
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
      <div className="sp-logo absolute top-1/2 z-[4] grid h-[84px] w-[84px] place-items-center rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,.14),0_18px_40px_rgba(0,0,0,.35)] min-[900px]:!left-1/2 min-[900px]:h-32 min-[900px]:w-32">
        <Image
          src="/images/fnpf-logo.jpg"
          alt="FNPF"
          width={80}
          height={73}
          className="h-auto w-[52px] min-[900px]:w-20"
        />
      </div>

      <SplitIntro />
    </main>
  );
}