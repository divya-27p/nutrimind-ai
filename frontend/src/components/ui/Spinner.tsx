import { cn } from "@/lib/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <div role="status" className={cn("inline-flex items-center justify-center", className)}>
      <span
        className={cn(
          "animate-spin rounded-full border-emerald-500/25 border-t-emerald-400",
          sizeMap[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}