import { cn } from "@/lib/cn";

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-ink-300">{description}</p>
      )}
    </div>
  );
}