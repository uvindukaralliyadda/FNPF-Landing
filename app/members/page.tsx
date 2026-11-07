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

const slides: Slide[] = [
  {
    image: "/images/laptop.jpg",
    position: "70% 30%",
    title: "Your savings, your services",
    text: "Manage your account online, anytime.",
    ctas: [
      { label: "Log in to myFNPF", href: PORTAL, variant: "accent" },
      { label: "Get the app", href: "#app", variant: "ghost" },
    ],
  },
  {
    image: unsplash("photo-1607013407627-6ee814329547"),
    position: "50% 35%",
    title: "Education support for your family",
    text: "Local applications processed in 3 working days.",
    ctas: [{ label: "Apply for education", href: "#", variant: "accent" }],
  },
  {
    image: unsplash("photo-1709787627975-9cb37bbeca60"),
    title: "Build or buy your home",
    text: "Use your savings for land, a house or a home loan.",
    ctas: [{ label: "Housing withdrawals", href: "#", variant: "accent" }],
  },
  {
    image: unsplash("photo-1761839257647-df30867afd54"),
    position: "50% 40%",
    title: "Plan your retirement income",
    text: "Choose a pension, annuity or drawdown account.",
    ctas: [{ label: "See retirement options", href: "#retire", variant: "accent" }],
  },
];

const retirement = [
  { image: unsplash("photo-1758691031787-90867cb6fb2c", 900), alt: "An older couple smiling on a couch", meta: "Monthly, for life", title: "Life pension", text: "A steady income for the rest of your life." },
  { image: unsplash("photo-1763573676689-bf2d7b474208", 900), alt: "An older couple laughing together indoors", meta: "5, 10 or 15 years", title: "Term annuity", text: "Fixed monthly payments for a term you choose." },
  { image: unsplash("photo-1758691031818-02a1e7d90aff", 900), alt: "An older couple sitting together on a couch", meta: "While funds last", title: "DrawDown account", text: "A flexible monthly income from your savings." },
];

const news = [
  { image: unsplash("photo-1655719647300-5142977bfa79", 900), alt: "A Fiji beach with blue water and green land", meta: "30 October 2026", title: "JW Marriott Fiji Resort & Spa development strengthens member value" },
  { image: unsplash("photo-1579264670959-286d7b06f1ae", 900), alt: "Homes among trees in Fiji", meta: "10 October 2026", title: "Protecting members' retirement savings requires full information" },
  { image: unsplash("photo-1594068049109-675b51ac3c06", 900), alt: "Aerial view of green trees by the water in Fiji", meta: "4 September 2026", title: "Legacy Contribution Debt Amnesty Campaign speaking notes" },
];

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
            <div data-anim="tiles" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <CtaTile icon="wallet" title="Check my balance" text="App, portal or *567#" href={PORTAL} />
              <CtaTile icon="file" title="Download a statement" text="App or online portal" href={PORTAL} />
              <CtaTile icon="send" title="Apply for a withdrawal" text="Education, medical, housing and more" href="#" />
              <CtaTile icon="search" title="Track my application" text="See your application status" href={PORTAL} />
              <CtaTile icon="users" title="Update my nominee" text="Protect your family" href={PORTAL} />
              <CtaTile icon="plus" title="Make a contribution" text="App, M-PAiSA or bank" href="#" />
            </div>
          </div>
        </section>

        {/* Intro: image + numbers */}
        <section id="about" className="py-20 lg:py-28">
          <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div className="relative">
              <div data-anim="frame" className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted lg:aspect-[4/5]">
                <Image
                  src={unsplash("photo-1700631102725-7194689f7075", 1200)}
                  alt="Two young Fijian men in the Serua highlands"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div data-anim="badge" className="absolute bottom-4 right-4 flex max-w-[260px] items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift lg:-right-6 lg:bottom-10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
                  <Icon name="phone" />
                </span>
                <b className="text-sm font-semibold leading-snug text-primary">Apply and track withdrawals in the app</b>
              </div>
            </div>

            <div data-anim="reveal">
              <h2 className="h-section">Your savings are working for you</h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-[1.7] text-muted-fg">
                Your contributions earn interest every year, with no fees or taxes. Use them for life&apos;s big moments.
              </p>
              <div data-anim="stats" className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                <StatCard value={6} suffix="%" label="average interest over the last 3 years" />
                <StatCard value={0} prefix="$" label="in fees or taxes on your savings" />
                <StatCard value={3} label="working days for local education and funeral claims" />
                <StatCard value={2000} prefix="$" label="funeral support per family member" />
              </div>
              <a href="#" className="btn btn-accent mt-8">See all withdrawal types</a>
            </div>
          </div>
        </section>

        {/* Retirement */}
        <section id="retire" className="bg-white py-20 lg:py-28">
          <div className="wrap">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div data-anim="reveal" className="max-w-[620px]">
                <h2 className="h-section">Ready to retire?</h2>
                <p className="mt-3 text-lg text-muted-fg">Turn your savings into a monthly income.</p>
              </div>
              <a data-anim="slide-in" href="#" className="btn btn-outline">Plan your retirement</a>
            </div>
            <div data-anim="cards" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {retirement.map((r) => (
                <ImageCard key={r.title} {...r} />
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className="py-20 lg:py-28">
          <div className="wrap">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div data-anim="reveal">
                <h2 className="h-section">Member news</h2>
              </div>
              <a data-anim="slide-in" href="#" className="btn btn-outline">All news</a>
            </div>
            <div data-anim="cards" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <ImageCard key={n.title} {...n} linkLabel="Read more" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer kind="members" />
    </ScrollMotion>
  );
}
