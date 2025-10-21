import * as React from "react";
import { cn } from "../../lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  fallback: string;
}

export function Avatar({ className, fallback, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {fallback}
    </span>
  );
}
