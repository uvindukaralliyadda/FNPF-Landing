import Image from "next/image";
import { Icon } from "@/components/Icon";

/** Card with a photo on top, used for retirement options and news. */
export function ImageCard({
  image,
  alt,
  meta,
  title,
  text,
  facts,
  linkLabel = "Learn more",
  href = "#",
}: {
  image: string;
  alt: string;
  meta: string;
  title: string;
  text?: string;
  /** Short key facts shown as a checklist under the text. */
  facts?: string[];
  linkLabel?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white no-underline transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold tracking-[0.04em] text-accent">{meta}</span>
        <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-[-0.015em] text-primary">{title}</h3>
        {text && <p className="mt-2 text-base text-muted-fg">{text}</p>}
        {facts && facts.length > 0 && (
          <ul className="mt-4 grid gap-2 border-t border-line pt-4">
            {facts.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-secondary">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex min-h-11 items-center gap-1 pt-3 text-sm font-semibold tracking-[0.01em] text-accent">
          {linkLabel}
          <Icon name="chevronRight" className="h-[18px] w-[18px] transition duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}