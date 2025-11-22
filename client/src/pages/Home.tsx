import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-3">SecondBrain — keep what matters</h1>
          <p className="text-muted mb-6">Save links, notes and highlights. Organize into shareable brains and build a personal memory system.</p>
          <div className="flex gap-3">
            <Link to="/signup"><Button>Get started</Button></Link>
            <Link to="/login"><button className="px-4 py-2 rounded-xl border border-white/6">Login</button></Link>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl">
          <h3 className="font-semibold mb-3">Product highlights</h3>
          <ul className="text-sm text-muted space-y-2">
            <li>AI summaries for saved content</li>
            <li>Timestamp highlights for videos</li>
            <li>Share full brains or single items</li>
            <li>Collaborate with team members</li>
          </ul>
        </div>
      </div>
    </div>
  );
}