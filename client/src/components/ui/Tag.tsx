// src/components/ui/Tag.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  text: string;
  color?: string; // any tailwind color or hex (we'll accept class names like "bg-indigo-500")
  onRemove?: () => void;
  clickable?: boolean;
  className?: string;
};

export default function Tag({ text, color, onRemove, clickable = false, className }: Props) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium select-none",
        clickable ? "cursor-pointer hover:brightness-110" : "",
        className
      )}
      style={!color ? undefined : { background: undefined }}
      // inline style if hex provided — otherwise expect class in color prop
    >
      <span
        className={clsx(
          !color ? "bg-white/4 text-[var(--text)]" : "",
          // if color prop looks like a tailwind class (contains "-") we won't apply inline style
        )}
        style={color && !color.includes("-") ? { background: color, color: "#fff", padding: "2px 8px", borderRadius: 9999 } : undefined}
      >
        {text}
      </span>

      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${text}`}
          className="text-[10px] px-1 rounded-full hover:bg-white/6"
          title="Remove"
        >
          ✕
        </button>
      )}
    </div>
  );
}