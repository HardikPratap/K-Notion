
export default function NoteCard({ note }: { note: any }) {
  return (
    <div className="p-3 bg-surface rounded-xl hover:shadow-md transition">
      <div className="font-medium">{note.title || "Untitled"}</div>
      <div className="text-sm text-muted mt-2 line-clamp-3">{note.content}</div>
      <div className="text-xs text-muted mt-2">{(note.tags||[]).slice(0,3).map((t:string)=>`#${t}`).join(" ")}</div>
    </div>
  );
}