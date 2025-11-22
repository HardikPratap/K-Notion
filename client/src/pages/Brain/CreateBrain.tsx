import React, { useState } from "react";
import { brainAPI } from "../../api/api";
import { getToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function CreateBrain() {
  const [form, setForm] = useState({ title: "", description: "", tags: "", isPublic: false });
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return nav("/login");
    setLoading(true);
    try {
      const tags = form.tags.split(",").map(s => s.trim()).filter(Boolean);
      const res = await brainAPI.create(token, { title: form.title, description: form.description, isPublic: form.isPublic, tags });
      nav(`/brains/${res._id}`);
    } catch (err:any) { alert(err?.error?.message || err.message || "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Brain</h2>
      <form onSubmit={submit} className="space-y-4">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <input placeholder="tags (comma separated)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isPublic} onChange={e=>setForm({...form,isPublic:e.target.checked})} /> Make public</label>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)]">Create</button>
      </form>
    </div>
  );
}