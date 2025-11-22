
import { Link } from "react-router-dom";
export default function BrainCard({ brain }: { brain: any }) {
  return (
    <Link to={`/brains/${brain._id}`} className="block p-4 bg-surface rounded-xl hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{brain.title}</div>
        <div className="text-xs text-muted">{brain.isPublic ? "Public" : "Private"}</div>
      </div>
      <p className="text-muted text-sm mt-2">{brain.description}</p>
      <div className="mt-3 text-xs text-muted">{(brain.tags || []).slice(0,3).map((t:string)=>`#${t}`).join(" ")}</div>
    </Link>
  );
}