import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#d7ff1f] text-black shadow-[0_18px_35px_rgba(215,255,31,0.35)] hover:bg-[#e7ff41]",
  secondary:
    "bg-white text-[#111111] border border-black/10 hover:bg-[#f7f5ef]",
  outline:
    "border border-black/15 bg-transparent text-[#111111] hover:bg-black/5",
  ghost: "bg-transparent text-[#111111] hover:bg-black/5",
  dark: "bg-[#111111] text-white hover:bg-black",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-sm",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-[0.18em] transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

