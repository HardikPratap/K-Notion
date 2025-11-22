import React from "react";
import clsx from "clsx";

export default function Button({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={clsx("px-4 py-2 rounded-xl font-medium text-sm shadow-sm transition", "bg-(--accent) hover:brightness-105", className)}
    >
      {children}
    </button>
  );
}