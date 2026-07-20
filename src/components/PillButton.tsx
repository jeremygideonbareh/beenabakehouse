import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

type Variant = "default" | "ghost" | "peach";

const variantClasses: Record<Variant, string> = {
  default: "bg-accent-butter text-ink border-transparent hover:bg-accent-butter",
  ghost: "bg-transparent text-ink border-ink hover:bg-ink hover:text-background",
  peach: "bg-accent-peach text-ink border-transparent hover:bg-accent-peach",
};

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant = "default", className = "", children, ...rest }, ref) => {
    const base = "inline-flex items-center justify-center gap-[0.5em] px-6 py-3 min-h-[44px] rounded-full font-mono text-[0.78rem] font-[500] tracking-[0.12em] uppercase border transition-[transform,background-color] duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform cursor-pointer hover:-translate-y-[0.5px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    return (
      <button
        ref={ref}
        className={`${base} ${variantClasses[variant]} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
PillButton.displayName = "PillButton";