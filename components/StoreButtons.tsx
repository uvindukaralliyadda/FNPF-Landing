import { APP_STORE, GOOGLE_PLAY } from "@/lib/site";
import { AppleLogo, PlayLogo } from "./Icon";

/** App Store and Google Play buttons. `tone="light"` for dark backgrounds. */
export function StoreButtons({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const base =
    "inline-flex min-h-[52px] items-center gap-2.5 rounded-xl px-[18px] no-underline transition duration-200 hover:-translate-y-0.5";
  const look =
    tone === "dark"
      ? "border border-white/10 bg-primary text-white hover:bg-slate-800"
      : "bg-white text-primary hover:bg-accent-tint";
  const small = tone === "dark" ? "opacity-80" : "text-muted-fg";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a className={`${base} ${look}`} href={GOOGLE_PLAY}>
        <PlayLogo />
        <span>
          <small className={`block text-[11px] leading-tight ${small}`}>Get it on</small>
          <b className="block text-base font-semibold leading-tight">Google Play</b>
        </span>
      </a>
      <a className={`${base} ${look}`} href={APP_STORE}>
        <AppleLogo />
        <span>
          <small className={`block text-[11px] leading-tight ${small}`}>Download on the</small>
          <b className="block text-base font-semibold leading-tight">App Store</b>
        </span>
      </a>
    </div>
  );
}
