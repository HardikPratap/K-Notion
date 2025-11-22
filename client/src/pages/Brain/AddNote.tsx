import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { noteAPI } from "../../api/api";
import { getToken } from "../../utils/storage";

export default function AddNote() {
  const { id } = useParams();
  const token = getToken();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "", isPublic: false });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !token) return nav("/login");
    setLoading(true);
    try {
      const tags = form.tags.split(",").map(s=>s.trim()).filter(Boolean);
      await noteAPI.add(token, { title: form.title, content: form.content, brainId: id, tags, isPublic: form.isPublic });
      nav(`/brains/${id}`);
    } catch (err:any) { alert(err?.error?.message || err.message || "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Note</h2>
      <form onSubmit={submit} className="space-y-4">
        <input placeholder="Title (optional)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <textarea placeholder="Write your note..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={8} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <input placeholder="tags (comma separated)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} className="w-full p-3 rounded-md bg-transparent border border-white/6" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isPublic} onChange={e=>setForm({...form,isPublic:e.target.checked})} /> Make public</label>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)]">{loading ? "Saving..." : "Save Note"}</button>
      </form>
    </div>
  );
}