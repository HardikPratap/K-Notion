import React, { useState } from "react";
import { authAPI } from "../../api/api";
import { setToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      // backend returns { user, token } per spec
      if (res.token) {
        setToken(res.token);
        nav("/brains");
      } else {
        alert("No token returned");
      }
    } catch (err:any) {
      alert(err?.error?.message || err.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-3">Sign in</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 rounded-md bg-transparent border border-white/6" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full p-3 rounded-md bg-transparent border border-white/6" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)]">{loading ? "Signing..." : "Sign in"}</button>
      </form>
    </div>
  );
}