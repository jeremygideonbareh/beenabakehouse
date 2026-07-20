import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import "./PillButton.css";

type Variant = "default" | "ghost" | "peach";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant = "default", className = "", children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`pill pill--${variant} ${className}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
PillButton.displayName = "PillButton";