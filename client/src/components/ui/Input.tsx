import React from "react";
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full p-3 rounded-md bg-transparent border border-white/6 outline-none" />;
}