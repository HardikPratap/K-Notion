import React from "react";
export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="relative bg-surface p-6 rounded-xl w-full max-w-2xl z-10">{children}</div>
    </div>
  );
}