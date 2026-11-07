import { Icon, type IconName } from "./Icon";

/** Quick-action card used under the hero slider. */
export function CtaTile({ icon, title, text, href }: { icon: IconName; title: string; text: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex min-h-20 items-center gap-4 rounded-2xl border border-line bg-white p-4 no-underline shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-lift sm:min-h-24 sm:px-5 sm:py-[22px]"
    >
      <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <b className="block text-base font-semibold leading-snug tracking-[-0.01em] text-primary">{title}</b>
        <small className="mt-0.5 block text-sm leading-snug text-muted-fg">{text}</small>
      </span>
      <Icon
        name="chevronRight"
        className="ml-auto h-[18px] w-[18px] text-muted-fg transition duration-300 group-hover:translate-x-1 group-hover:text-accent"
      />
    </a>
  );
}
