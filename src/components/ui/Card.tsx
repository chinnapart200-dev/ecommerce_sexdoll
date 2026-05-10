import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "glass" | "dark" | "accent";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  children: ReactNode;
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white/90 border border-black/10 shadow-[0_18px_40px_rgba(0,0,0,0.08)]",
  glass: "bg-white/70 border border-white/70 shadow-[0_22px_55px_rgba(0,0,0,0.08)] backdrop-blur-md",
  dark: "bg-[#111111] text-white border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.2)]",
  accent: "bg-[#d7ff1f] text-black border border-black/10 shadow-[0_22px_50px_rgba(215,255,31,0.28)]",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  className = "",
  variant = "default",
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[1.6rem]",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={["space-y-2", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
}) {
  return (
    <h3 className={["text-xl font-black uppercase tracking-[-0.05em] text-[#111111]", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
}) {
  return (
    <p className={["text-sm leading-7 text-black/70", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={["pt-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={["pt-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export default Card;

