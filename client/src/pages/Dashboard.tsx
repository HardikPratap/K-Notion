import React, { useEffect, useState } from "react";
import { brainAPI } from "../api/api";
import { getToken } from "../utils/storage";
import Sidebar from "../components/layout/Sidebar";
import BrainCard from "../components/cards/BrainCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [brains, setBrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await brainAPI.listMine(token);
        // res expected to be list (per wrapper)
        setBrains(res || []);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, [token]);

  return (
    <div className="flex">
      <Sidebar brains={brains} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Brains</h2>
          <Link to="/brains/new"><button className="px-3 py-2 rounded-xl bg-[var(--accent)]">New Brain</button></Link>
        </div>

        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brains && brains.length ? brains.map(b => <BrainCard key={b._id} brain={b} />) : <div className="text-muted">No brains yet. Create one to begin.</div>}
          </div>
        )}
      </div>
    </div>
  );
}