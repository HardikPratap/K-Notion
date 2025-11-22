import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { brainAPI, linkAPI, noteAPI } from "../../api/api";
import { getToken } from "../../utils/storage";
import LinkCard from "../../components/cards/LinkCard";
import NoteCard from "../../components/cards/NoteCard";

export default function BrainView() {
  const { id } = useParams();
  const token = getToken();
  const [brain, setBrain] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    (async () => {
      try {
        const b = await brainAPI.get(token, id);
        setBrain(b);
        const l = await linkAPI.listByBrain(token, id);
        setLinks(l || []);
        const n = await noteAPI.listByBrain(token, id);
        setNotes(n || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, [token, id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!brain) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{brain.title}</h2>
          <p className="text-muted">{brain.description}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/brains/${id}/add-link`}><button className="px-3 py-2 rounded-xl border border-white/6">Add Link</button></Link>
          <Link to={`/brains/${id}/add-note`}><button className="px-3 py-2 rounded-xl bg-[var(--accent)]">Add Note</button></Link>
        </div>
      </div>

      <section className="mb-6">
        <h3 className="font-medium mb-3">Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {links.length ? links.map(l => <LinkCard key={l._id} link={l} />) : <div className="text-muted">No links yet</div>}
        </div>
      </section>

      <section>
        <h3 className="font-medium mb-3">Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notes.length ? notes.map(n => <NoteCard key={n._id} note={n} />) : <div className="text-muted">No notes yet</div>}
        </div>
      </section>
    </div>
  );
}