import type { StatusBadgeProps } from "@/utils/types";

export function StatusBadge({
  label,
  bgColor,
  labelColor,
  dotColor,
  height = "2rem",
  className = "",
}: StatusBadgeProps) {
  return (
    <span
        className={`inline-flex items-center gap-1.5 rounded-2xl px-2 py-0.5 text-xs font-montserrat font-medium whitespace-nowrap max-w-fit ${className}`}
        style={{
            backgroundColor: bgColor,
            color: labelColor,
            height,
        }}
    >
        <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: dotColor }}
        />
        <span className="leading-default">{label}</span>
    </span>
  );
}
