
export default function LinkCard({ link }: { link: any }) {
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className="block p-3 bg-surface rounded-xl hover:brightness-105 transition">
      <div className="flex gap-3">
        <div className="w-20 h-12 bg-black/30 rounded-md overflow-hidden flex-shrink-0">
          {link.previewImage ? <img src={link.previewImage} alt={link.title} className="w-full h-full object-cover" /> : null}
        </div>
        <div className="flex-1">
          <div className="font-medium">{link.title || link.url}</div>
          <div className="text-sm text-muted mt-1">{link.description}</div>
          <div className="text-xs text-muted mt-2">{(link.tags||[]).slice(0,3).map((t:string)=>`#${t}`).join(" ")}</div>
        </div>
      </div>
    </a>
  );
}