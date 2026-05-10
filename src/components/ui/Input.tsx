import type { InputHTMLAttributes, ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputSize?: InputSize;
  suffix?: ReactNode;
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-4 text-sm",
  lg: "h-14 px-5 text-base",
};

export function Input({
  id,
  label,
  helperText,
  error,
  wrapperClassName = "",
  labelClassName = "",
  inputClassName = "",
  inputSize = "md",
  suffix,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className={["flex w-full flex-col gap-2", wrapperClassName].filter(Boolean).join(" ")}>
      {label ? (
        <span className={["text-sm font-semibold text-[#111111]", labelClassName].filter(Boolean).join(" ")}>
          {label}
        </span>
      ) : null}
      <span className="relative block">
        <input
          id={inputId}
          className={[
            "w-full rounded-full border border-black/10 bg-white/90 text-[#111111] outline-none transition",
            "placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/5",
            sizeClasses[inputSize],
            error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "",
            suffix ? "pr-12" : "",
            className,
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? `${inputId ?? "input"}-help` : undefined}
          {...props}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black/55">
            {suffix}
          </span>
        ) : null}
      </span>
      {error ? (
        <span id={`${inputId ?? "input"}-help`} className="text-xs font-medium text-red-600">
          {error}
        </span>
      ) : helperText ? (
        <span id={`${inputId ?? "input"}-help`} className="text-xs font-medium text-black/55">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}

export default Input;
