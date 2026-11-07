import Image from "next/image";
import { Icon } from "./Icon";

/** Card with a photo on top, used for retirement options and news. */
export function ImageCard({
  image,
  alt,
  meta,
  title,
  text,
  linkLabel = "Learn more",
  href = "#",
}: {
  image: string;
  alt: string;
  meta: string;
  title: string;
  text?: string;
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
        {text && <p className="mt-2 flex-1 text-base text-muted-fg">{text}</p>}
        <span className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold tracking-[0.01em] text-accent">
          {linkLabel}
          <Icon name="chevronRight" className="h-[18px] w-[18px] transition duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}
