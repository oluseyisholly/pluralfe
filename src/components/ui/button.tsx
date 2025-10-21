import * as React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "ghost"
  | "outline"
  | "primary"
  | "soft";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconOnly?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-indigo-600",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-indigo-600",
  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-600 focus-visible:outline-indigo-600",
  outline:
    "border border-slate-200 bg-white hover:bg-slate-50 focus-visible:outline-indigo-600",
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  soft:
    "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus-visible:outline-indigo-600",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", iconOnly = false, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        iconOnly ? "h-10 w-10" : "h-11 px-4",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
