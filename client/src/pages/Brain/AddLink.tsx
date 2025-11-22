import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { linkAPI } from "../../api/api";
import { getToken } from "../../utils/storage";

export default function AddLink() {
  const { id } = useParams();
  const token = getToken();
  const nav = useNavigate();
  const [form, setForm] = useState({ url: "", title: "", tags: "", isPublic: false });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !token) return nav("/login");
    setLoading(true);
    try {
      const tags = form.tags.split(",").map(s=>s.trim()).filter(Boolean);
      await linkAPI.add(token, { url: form.url, brainId: id, title: form.title, tags, isPublic: form.isPublic });
      nav(`/brains/${id}`);
    } catch (err:any) { alert(err?.error?.message || err.message || "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Link</h2>
      <form onSubmit={submit} className="space-y-4">
        <input placeholder="https://..." value={form.url} onChange={e=>setForm({...form,url:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <input placeholder="Title (optional)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <input placeholder="tags (comma separated)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isPublic} onChange={e=>setForm({...form,isPublic:e.target.checked})} /> Make public</label>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)]">{loading ? "Adding..." : "Add Link"}</button>
      </form>
    </div>
  );
}