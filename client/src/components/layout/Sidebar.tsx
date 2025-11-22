import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ brains }: { brains: any[] | undefined }) {
  return (
    <aside className="w-72 hidden lg:block p-4 border-r border-white/6 h-screen overflow-y-auto bg-[var(--bg)]">
      <div className="mb-4">
        <h4 className="text-muted uppercase text-xs">Your Brains</h4>
      </div>
      <div className="space-y-2">
        {brains && brains.length ? brains.map(b => (
          <Link key={b._id} to={`/brains/${b._id}`} className="block p-3 rounded-md hover:bg-white/2">
            <div className="font-medium">{b.title}</div>
            <div className="text-xs text-muted">{b.links?.length ?? 0} links • {b.notes?.length ?? 0} notes</div>
          </Link>
        )) : <div className="text-muted text-sm">No brains yet</div>}
      </div>
    </aside>
  );
}