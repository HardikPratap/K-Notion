import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shareAPI } from "../api/api";

export default function PublicShare() {
  const { token } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await shareAPI.access(token!);
        setItem(res);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, [token]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6">Not found or expired</div>;

  // item might be brain/link/note
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-3">{item.title || item.name || "Shared item"}</h2>
      <div className="bg-surface rounded-xl p-4">{item.description || item.content || "No description"}</div>
    </div>
  );
}