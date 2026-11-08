import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider, type Slide } from "@/components/HeroSlider";
import { ScrollMotion } from "@/components/ScrollMotion";
import { CtaTile } from "@/components/CtaTile";
import { StatCard } from "@/components/StatCard";
import { ImageCard } from "@/components/ImageCard";
import { Icon } from "@/components/Icon";
import { MEMBER_NAV, PORTAL, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "Member Services",
  description: "Check your balance, apply for withdrawals, update your nominee and plan your retirement with FNPF.",
};

const FNPF = "https://myfnpf.com.fj";

const slides: Slide[] = [
  {
    image: "/images/hero1.webp",
    position: "50% 35%",
    title: "Your savings, your services",
    text: "Manage your account online, anytime.",
    ctas: [
      { label: "Log in to myFNPF", href: PORTAL, variant: "accent" },
      { label: "Get the app", href: "#app", variant: "ghost" },
    ],
  },
  {
    image: "/images/hero2.webp",
    position: "50% 35%",
    title: "Education support for your family",
    text: "Local applications processed in 3 working days.",
    ctas: [{ label: "Apply for education", href: `${FNPF}/early-partial-withdrawal/`, variant: "accent" }],
  },
  {
    image: "/images/hero3.webp",
    position: "50% 40%",
    title: "Build or buy your home",
    text: "Use your savings for land, a house or a home loan.",
    ctas: [{ label: "Housing withdrawals", href: `${FNPF}/early-partial-withdrawal/`, variant: "accent" }],
  },
  {
    image: "/images/hero4.webp",
    position: "50% 40%",
    title: "Plan your retirement income",
    text: "Choose a pension, annuity or drawdown account.",
    ctas: [{ label: "See retirement options", href: "#retire", variant: "accent" }],
  },
];

/* Retirement options */
const retirement = [
  {
    image: "/images/r1.webp",
    alt: "An older Fijian couple enjoying their retirement together",
    meta: "Monthly, for life",
    title: "Life pension",
    text: "A monthly income for life, for you alone or jointly with your spouse.",
    facts: ["Guaranteed for the first 5 years", "Higher payments the older you start", "Tax-free, no administration fee"],
    href: `${FNPF}/life-pension/`,
  },
  {
    image: "/images/r2.webp",
    alt: "An older Fijian couple enjoying time together",
    meta: "Monthly, for 5, 10 or 15 years",
    title: "Term annuity",
    text: "A fixed monthly payment for the term you choose.",
    facts: ["Rate set by the term, not your age", "Payment never changes once bought", "Remaining payments go to your nominee"],
    href: `${FNPF}/term-annuity/`,
  },
  {
    image: "/images/r3.webp",
    alt: "An older Fijian person enjoying a comfortable retirement",
    meta: "Monthly, while funds last",
    title: "DrawDown account",
    text: "A flexible monthly income from savings that keep earning interest.",
    facts: ["Standard or High payment plan", "Minimum $50 a month", "Partial withdrawal once a year"],
    href: `${FNPF}/drawdown-account/`,
  },
];

/* Before applying */
const checklist = [
  "Confirm your birth details with FNPF",
  "Check your employer has paid all contributions",
  "Have your birth certificate, bank statement and photo ID ready",
  "Complete the FW01 Retirement Application Form",
];

/* Latest media releases */
const featured = {
  title: "FNPF Strengthens Long-Term Member Value Through Landmark JW Marriott Fiji Resort & Spa Development",
  date: "30 October 2026",
  dateTime: "2026-10-30",
  href: `${FNPF}/2026/10/30/fnpf-strengthens-long-term-member-value-through-landmark-jw-marriott-fiji-resort-spa-development/`,
  image: unsplash("photo-1655719647300-5142977bfa79", 1400),
  alt: "A Fiji beach with blue water and green land",
};

const news = [
  { title: "Protecting Members' Retirement Savings Requires Full Information", date: "10 October 2026", dateTime: "2026-10-10", type: "Media release", href: `${FNPF}/2026/10/10/protecting-members-retirement-savings-requires-full-information/` },
  { title: "Media Conference: Legacy Contribution Debt Amnesty Campaign Speaking Notes", date: "4 September 2026", dateTime: "2026-09-04", type: "Media release", href: `${FNPF}/2026/09/04/media-conference-legacy-contribution-debt-amnesty-campaign-speaking-notes/` },
  { title: "FNPF Reaches 60-Year Milestone", date: "4 August 2026", dateTime: "2026-08-04", type: "Media release", href: `${FNPF}/2026/08/04/fnpf-reaches-60-year-milestone/` },
  { title: "FNPF Declares Strong Returns For Members", date: "26 June 2026", dateTime: "2026-06-26", type: "Media release", href: `${FNPF}/2026/06/26/fnpf-declares-strong-returns-for-members/` },
  { title: "Voluntary Member Champions FNPF To All", date: "22 June 2026", dateTime: "2026-06-22", type: "Member story", href: `${FNPF}/2026/06/22/article-15-26-voluntary-member-champions-fnpf-to-all/` },
];

/* Shared spacing */
const SECTION = "py-14 md:py-16 lg:py-20";
const HEAD_ROW = "mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end lg:mb-10";

export default function MembersPage() {
  return (
    <ScrollMotion>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2.5">
        Skip to content
      </a>

      <Header
        audience="Existing members"
        switchText="New to FNPF? Start here"
        switchHref="/new-members"
        nav={MEMBER_NAV}
        actions={[
          { label: "Get the app", href: "#app", variant: "outline", hideOnTablet: true },
          { label: "Log in", href: PORTAL, variant: "accent" },
        ]}
      />

      <main id="main">
        <HeroSlider slides={slides} label="Member services" />

        {/* Quick tasks */}
        <section id="tasks" aria-label="Quick tasks" className="relative z-10 -mt-24 md:-mt-[88px]">
          <div className="wrap">
            <div data-anim="tiles" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <CtaTile icon="wallet" title="Check my balance" text="App, portal or *567#" href={PORTAL} />
              <CtaTile icon="file" title="Download a statement" text="App or online portal" href={PORTAL} />
              <CtaTile icon="send" title="Apply for a withdrawal" text="Education, medical, housing and more" href={`${FNPF}/early-partial-withdrawal/`} />
              <CtaTile icon="search" title="Track my application" text="See your application status" href={PORTAL} />
              <CtaTile icon="users" title="Update my nominee" text="Protect your family" href={`${FNPF}/nomination/`} />
              <CtaTile icon="plus" title="Make a contribution" text="App, M-PAiSA or bank" href={`${FNPF}/grow-your-savings/`} />
            </div>
          </div>
        </section>

        {/* Intro: image + numbers */}
        <section id="about" className={SECTION}>
          <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div data-anim="frame" className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted lg:aspect-[4/5]">
                <Image
                  src="/images/community.webp"
                  alt="Two young Fijian men in the Serua highlands"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>

            <div data-anim="reveal">
              <h2 className="h-section">Your savings are working for you</h2>
              <p className="mt-3 max-w-[46ch] text-lg leading-[1.65] text-muted-fg">
                Your contributions earn interest every year, with no fees or taxes.
              </p>
              <div data-anim="stats" className="mt-6 grid grid-cols-2 gap-3 lg:mt-8">
                <StatCard value={6} suffix="%" label="average interest over the last 3 years" />
                <StatCard value={0} prefix="$" label="in fees or taxes on your savings" />
                <StatCard value={3} label="working days for local education and funeral claims" />
                <StatCard value={2000} prefix="$" label="funeral support per family member" />
              </div>
              <a href={`${FNPF}/early-partial-withdrawal/`} className="btn btn-accent mt-6 lg:mt-8">See all withdrawal types</a>
            </div>
          </div>
        </section>

        {/* Retirement */}
        <section id="retire" className={`bg-white ${SECTION}`}>
          <div className="wrap">
            <div className={HEAD_ROW}>
              <div data-anim="reveal" className="max-w-[620px]">
                <h2 className="h-section">Ready to retire?</h2>
                <p className="mt-3 text-lg text-muted-fg">
                  From age 55, take your savings as a monthly income, a lump sum, or both.
                </p>
              </div>

              <div data-anim="slide-in" className="flex flex-wrap gap-3">
                <a href="https://pension-calculator.myfnpf.com.fj/" className="btn btn-accent">Estimate your pension</a>
                <a href={`${FNPF}/plan-your-retirement/`} className="btn btn-outline">Plan your retirement</a>
              </div>
            </div>

            <div data-anim="cards" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {retirement.map((r) => (
                <ImageCard key={r.title} {...r} />
              ))}
            </div>

            {/* Before you apply */}
            <div data-anim="reveal" className="mt-5 grid gap-6 rounded-3xl bg-surface p-5 sm:p-6 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:p-8">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.015em] text-primary lg:text-2xl">Before you apply</h3>
                <p className="mt-1.5 text-base text-muted-fg">Lump sums are paid within 3 working days of a complete application.</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`${FNPF}/wp-content/uploads/2019/09/FW01.pdf`} className="btn btn-accent">
                    <Icon name="download" className="h-5 w-5" />
                    FW01 form
                  </a>
                  <a href={`${FNPF}/wp-content/uploads/2019/09/Pension-Booklet-1.pdf`} className="btn btn-outline">Pension booklet</a>
                </div>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2">
                {checklist.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5">
                    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-tint text-sm font-semibold text-accent tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-snug text-secondary">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className={SECTION}>
          <div className="wrap">
            <div className={HEAD_ROW}>
              <h2 data-anim="reveal" className="h-section">Member news</h2>
              <a data-anim="slide-in" href={`${FNPF}/latest-news/`} className="btn btn-outline">All news</a>
            </div>

            <div data-anim="cards" className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
              {/* Featured story */}
              <a
                href={featured.href}
                className="group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-6 text-white no-underline sm:p-8 lg:min-h-[440px]"
              >
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="-z-20 bg-slate-800 object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_30%,rgba(0,0,0,.75)_100%)]" />

                <p className="text-sm font-medium text-white/80">
                  Media release, <time dateTime={featured.dateTime}>{featured.date}</time>
                </p>

                <h3 className="mt-2 max-w-[30ch] text-2xl font-semibold leading-[1.2] tracking-[-0.02em] lg:text-[1.75rem]">
                  {featured.title}
                </h3>

                <span className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold">
                  Read the release
                  <Icon name="chevronRight" className="h-[18px] w-[18px] transition duration-200 group-hover:translate-x-1" />
                </span>
              </a>

              {/* Latest headlines */}
              <ul className="flex flex-col divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
                {news.map((n) => (
                  <li key={n.href} className="flex-1">
                    <a href={n.href} className="group flex h-full items-center gap-4 px-5 py-4 no-underline transition-colors hover:bg-surface">
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium text-muted-fg">
                          <span className="font-semibold text-accent">{n.type}</span>, <time dateTime={n.dateTime}>{n.date}</time>
                        </span>
                        <span className="mt-1 block text-base font-semibold leading-snug text-primary">{n.title}</span>
                      </span>

                      <Icon name="chevronRight" className="h-[18px] w-[18px] text-muted-fg transition duration-200 group-hover:translate-x-1 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer kind="members" />
    </ScrollMotion>
  );
}