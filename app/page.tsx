import Image from "next/image";
import Link from "next/link";
import { PORTAL } from "@/lib/site";
import { SplitIntro } from "@/components/SplitIntro";

/** Split landing page: New Members on the left, Existing Members on the right. */
export default function SplitLandingPage() {
  const linkRow =
    "mt-6 flex w-max max-w-full flex-wrap justify-center gap-x-6 border-t border-white/30 pt-4 text-sm font-medium max-[899px]:hidden";
  const link =
    "inline-flex min-h-11 items-center underline decoration-white/60 underline-offset-[5px] [text-shadow:0_1px_8px_rgba(0,0,0,.5)] hover:decoration-white";
  const heading =
    "text-[2rem] font-semibold leading-[1.04] tracking-display [text-shadow:0_2px_20px_rgba(0,0,0,.5),0_1px_3px_rgba(0,0,0,.35)] min-[900px]:max-w-[9ch] min-[900px]:text-[clamp(2.5rem,4.6vw,4rem)]";
  const lead =
    "sp-lead mt-3 max-w-[32ch] text-sm leading-[1.55] text-white [text-shadow:0_1px_12px_rgba(0,0,0,.55),0_1px_2px_rgba(0,0,0,.4)] min-[900px]:mt-6 min-[900px]:text-lg min-[900px]:leading-[1.6]";

  /* Premium black finish: soft vignette + gentle fade to black at the bottom */
  const vignette =
    "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_100%_at_50%_45%,rgba(0,0,0,0)_55%,rgba(0,0,0,.35)_100%),linear-gradient(180deg,rgba(0,0,0,.18)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0)_55%,rgba(0,0,0,.45)_100%)]";

  return (
    <main className="sp relative h-[100svh] min-h-[560px] overflow-hidden bg-black text-white min-[900px]:min-h-[600px]">
      <h1 className="sr-only">Fiji National Provident Fund</h1>

      {/* Existing members (right) */}
      <section aria-labelledby="sp-ex-title" className="sp-side sp-ex absolute inset-0 isolate flex items-center text-center">
        <Image
          src="/images/exisistingmember.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "70% 30%" }}
        />
        <div aria-hidden="true" className={vignette} />
        {/* Faint shade behind the text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_35%_at_50%_75%,rgba(0,0,0,.3)_0%,rgba(0,0,0,0)_100%)] min-[900px]:bg-[radial-gradient(35%_40%_at_72%_50%,rgba(0,0,0,.3)_0%,rgba(0,0,0,0)_100%)]"
        />
        <div className="sp-ex-inner [&>*]:mx-auto">
          <h2 id="sp-ex-title" className={heading}>
            Already a member?
          </h2>
          <p className={lead}>Check your balance, apply for a withdrawal or update your details.</p>
          <Link href="/members" className="btn btn-white mt-6 min-[900px]:mt-10">
            Go to member services
          </Link>
          <ul className={linkRow}>
            <li><a href={PORTAL} className={link}>Log in to myFNPF</a></li>
            <li><Link href="/members#about" className={link}>Withdrawals</Link></li>
            <li><Link href="/members#retire" className={link}>Retirement</Link></li>
          </ul>
        </div>
      </section>

      {/* New members (left, curved edge) */}
      <section aria-labelledby="sp-new-title" className="sp-side sp-new absolute bottom-0 left-0 top-0 z-[2] isolate flex items-center text-center">
        <Image
          src="/images/newmember.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 899px) 100vw, 62vw"
          className="sp-photo -z-20 object-cover"
          style={{ objectPosition: "45% 25%" }}
        />
        <div aria-hidden="true" className={vignette} />
        {/* Faint shade behind the text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_35%_at_50%_45%,rgba(0,0,0,.3)_0%,rgba(0,0,0,0)_100%)] min-[900px]:bg-[radial-gradient(40%_40%_at_45%_50%,rgba(0,0,0,.3)_0%,rgba(0,0,0,0)_100%)]"
        />
        <div className="sp-new-inner [&>*]:mx-auto">
          <h2 id="sp-new-title" className={heading}>
            New to FNPF?
          </h2>
          <p className={lead}>Learn how to register, what you contribute and how your savings support you.</p>
          <Link href="/new-members" className="btn btn-white mt-6 min-[900px]:mt-10">
            See how to join
          </Link>
          <ul className={linkRow}>
            <li><Link href="/new-members#steps" className={link}>How to register</Link></li>
            <li><Link href="/new-members#about" className={link}>Contributions</Link></li>
            <li><Link href="/new-members#app" className={link}>The myFNPF app</Link></li>
          </ul>
        </div>
      </section>

      {/* Curved seam + logo */}
      <svg
        className="sp-seam pointer-events-none absolute left-0 top-0 z-[3] h-full overflow-visible max-[899px]:hidden"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength={1} d="M100 0 C78 30 100 70 72 100" />
      </svg>
      <svg
        className="sp-seam-m pointer-events-none absolute left-0 top-0 z-[3] hidden w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength={1} d="M100 86 C70 100 30 82 0 100" />
      </svg>
      <div className="sp-logo absolute top-1/2 z-[4] grid h-[84px] w-[84px] place-items-center rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,.14),0_18px_40px_rgba(0,0,0,.35)] min-[900px]:h-32 min-[900px]:w-32">
        <Image src="/images/fnpf-logo.jpg" alt="FNPF" width={80} height={73} className="h-auto w-[52px] min-[900px]:w-20" />
      </div>

      <SplitIntro />
    </main>
  );
}