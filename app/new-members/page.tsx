import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider, type Slide } from "@/components/HeroSlider";
import { ScrollMotion } from "@/components/ScrollMotion";
import { CtaTile } from "@/components/CtaTile";
import { StatCard } from "@/components/StatCard";
import { StoreButtons } from "@/components/StoreButtons";
import { Icon } from "@/components/Icon";
import { NEW_NAV, PORTAL, pexels, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Members",
  description: "Joining FNPF? See who must join, how to register in three steps, and how your savings grow.",
};

const slides: Slide[] = [
  {
    image: unsplash("photo-1663889442870-c13c86358ae0"),
    position: "60% 30%",
    title: "Start saving for your future",
    text: "Join Fiji's national retirement fund.",
    ctas: [
      { label: "Register now", href: "#join", variant: "accent" },
      { label: "How it works", href: "#about", variant: "ghost" },
    ],
  },
  {
    image: pexels(1897503),
    position: "65% 30%",
    title: "Self-employed? Save on your terms",
    text: "Open a voluntary account from just $10.",
    ctas: [{ label: "Join as a voluntary member", href: "#join", variant: "accent" }],
  },
  {
    image: unsplash("photo-1663889974474-16058fe6fede"),
    position: "50% 40%",
    title: "Give your child a head start",
    text: "Parents can open savings for children under 18.",
    ctas: [{ label: "Register your child", href: "#join", variant: "accent" }],
  },
];

const steps = [
  { title: "Fill in the form", text: "Download the FNPF 3 registration form." },
  { title: "Add your documents", text: "Birth certificate, photo ID and TIN." },
  { title: "Submit and go digital", text: "Hand it in, then set up the myFNPF app." },
];

export default function NewMembersPage() {
  return (
    <ScrollMotion>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2.5">
        Skip to content
      </a>
      <Header
        audience="New members"
        switchText="Already a member? Go to member services"
        switchHref="/members"
        nav={NEW_NAV}
        actions={[
          { label: "Log in", href: PORTAL, variant: "outline", hideOnTablet: true },
          { label: "Register now", href: "#join", variant: "accent" },
        ]}
      />

      <main id="main">
        <HeroSlider slides={slides} label="Welcome to FNPF" />

        {/* Quick actions */}
        <section id="join" aria-label="Get started" className="relative z-10 -mt-24 md:-mt-[88px]">
          <div className="wrap">
            <div data-anim="tiles" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <CtaTile icon="briefcase" title="Register as an employee" text="Ages 15 to 55, in paid work" href="#steps" />
              <CtaTile icon="store" title="Voluntary membership" text="Self-employed or informal work" href="#" />
              <CtaTile icon="child" title="Register your child" text="Under 18, from $10" href="#" />
              <CtaTile icon="phone" title="Get the myFNPF app" text="Track savings anywhere" href="#app" />
            </div>
          </div>
        </section>

        {/* Intro: image + numbers */}
        <section id="about" className="py-20 lg:py-28">
          <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div className="relative">
              <div data-anim="frame" className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted lg:aspect-[4/5]">
                <Image
                  src={unsplash("photo-1701047018936-fe557ef2c98a", 1200)}
                  alt="A mother sitting on a bench holding her young child"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div data-anim="badge" className="absolute bottom-4 right-4 flex max-w-[260px] items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift lg:-right-6 lg:bottom-10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
                  <Icon name="wallet" />
                </span>
                <b className="text-sm font-semibold leading-snug text-primary">No fees or taxes on your savings</b>
              </div>
            </div>

            <div data-anim="reveal">
              <h2 className="h-section">Savings that grow with you</h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-[1.7] text-muted-fg">
                You and your employer contribute every pay. Your savings earn interest and support you through life, not only at retirement.
              </p>
              <div data-anim="stats" className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                <StatCard value={8} suffix="%" label="of your wages goes to your savings" />
                <StatCard value={70} suffix="%" label="kept for retirement, land or a home" />
                <StatCard value={6} suffix="%" label="average interest over the last 3 years" />
                <StatCard value={10} prefix="$" label="to open a voluntary account" />
              </div>
              <a href="#" className="btn btn-accent mt-8">How your savings work</a>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section id="steps" className="bg-white py-20 lg:py-28">
          <div className="wrap">
            <div data-anim="reveal" className="mx-auto mb-12 max-w-[620px] text-center">
              <h2 className="h-section">Join in three steps</h2>
              <p className="mt-3 text-lg text-muted-fg">For employees joining for the first time.</p>
            </div>
            <ol data-anim="steps" className="relative grid gap-8 md:grid-cols-3 md:gap-6">
              <span aria-hidden="true" className="absolute left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] top-7 hidden h-0.5 bg-line md:block" />
              <span data-anim="steps-line" aria-hidden="true" className="absolute left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] top-7 hidden h-0.5 origin-left bg-accent md:block" />
              {steps.map((s, i) => (
                <li key={s.title} data-anim="step" className="relative px-3 text-center">
                  <span data-anim="step-n" aria-hidden="true" className="relative z-[1] mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-accent bg-white text-lg font-medium text-accent tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.015em] text-primary">{s.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[28ch] text-base text-muted-fg">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 text-center">
              <a href="#" className="btn btn-accent">
                <Icon name="download" className="h-5 w-5" />
                Download the form
              </a>
            </div>
          </div>
        </section>

        {/* App band */}
        <section id="app" className="py-20 lg:py-28">
          <div className="wrap">
            <div data-anim="band" className="grid overflow-hidden rounded-3xl bg-primary text-white lg:grid-cols-[1.05fr_1fr] lg:rounded-[32px]">
              <div className="px-6 py-10 sm:p-12 lg:p-16">
                <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-heading lg:text-[2.5rem]">Your savings, in your pocket</h2>
                <p className="mt-3 max-w-[40ch] text-lg text-slate-300">See every contribution arrive and manage your account anywhere.</p>
                <ul data-anim="chips" className="mt-7 flex flex-wrap gap-2">
                  {["Check balance", "Update details", "Make contributions", "Apply for withdrawals"].map((c) => (
                    <li key={c} className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-medium">{c}</li>
                  ))}
                </ul>
                <StoreButtons tone="light" className="mt-8" />
                <p className="mt-5 text-sm text-slate-400">
                  No smartphone? Dial <b className="text-white">*567#</b> to check your balance.
                </p>
              </div>
              <div data-anim="band-img" className="relative min-h-[280px] overflow-hidden bg-slate-800 lg:min-h-[360px]">
                <Image src="/images/laptop.jpg" alt="A woman smiling while using a laptop" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" style={{ objectPosition: "40% 30%" }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer kind="new" />
    </ScrollMotion>
  );
}
