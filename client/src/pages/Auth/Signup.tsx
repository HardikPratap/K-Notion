import React, { useState } from "react";
import { authAPI } from "../../api/api";
import { setToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.register(form);
      if (res.token) {
        setToken(res.token);
        nav("/brains");
      } else {
        alert("No token returned");
      }
    } catch (err:any) {
      alert(err?.error?.message || err.message || "Signup failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-3">Create account</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 rounded-md bg-transparent border border-white/6" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full p-3 rounded-md bg-transparent border border-white/6" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full p-3 rounded-md bg-transparent border border-white/6" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)]">{loading ? "Creating..." : "Create account"}</button>
      </form>
    </div>
  );
}