// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        "px-4 py-2 rounded-lg text-sm font-medium transition",
        variant === "primary" && "bg-[var(--accent)] hover:brightness-110",
        variant === "ghost" && "border border-gray-800 hover:bg-white/2",
        "shadow-sm",
        className
      )}
    >
      {children}
    </button>
  );
}