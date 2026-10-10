import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-violet-500 text-white shadow-lg shadow-violet-950/30 hover:bg-violet-400",
        secondary: "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
        ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
        danger: "border border-rose-400/30 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20",
      },
      size: {
        default: "px-4 py-2.5",
        small: "min-h-9 rounded-lg px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);

Button.displayName = "Button";
