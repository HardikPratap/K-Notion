// src/components/ui/Toast.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

type ToastItem = { id: string; message: string; type?: "info" | "success" | "error"; duration?: number };

type ToastContextValue = {
  push: (message: string, opts?: { type?: ToastItem["type"]; duration?: number }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = (message: string, opts?: { type?: ToastItem["type"]; duration?: number }) => {
    const id = uuidv4();
    const toast: ToastItem = { id, message, type: opts?.type ?? "info", duration: opts?.duration ?? 4000 };
    setToasts((s) => [...s, toast]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, toast.duration);
  };

  const value = useMemo(() => ({ push }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "px-4 py-2 rounded-xl shadow-md max-w-xs",
              t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-surface",
              "text-white"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}