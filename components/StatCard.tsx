/** A figure that counts up when scrolled into view (see ScrollMotion). */
export function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px] sm:p-6">
      <div className="text-[2.5rem] font-light leading-none tracking-[-0.04em] text-primary tabular-nums lg:text-5xl">
        <span data-count={value} data-prefix={prefix} data-suffix={suffix}>
          {prefix}
          {value.toLocaleString("en-US")}
          {suffix}
        </span>
      </div>
      <div className="mt-2.5 text-sm font-medium leading-normal text-muted-fg">{label}</div>
    </div>
  );
}
