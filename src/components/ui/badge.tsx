import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "soft";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variant === "default" && "bg-rose-100 text-rose-600",
        variant === "outline" && "border border-slate-200 text-slate-600",
        variant === "soft" && "bg-indigo-100 text-indigo-700",
        className,
      )}
      {...props}
    />
  );
}
