export default function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-loblaws font-bold text-xl tracking-tight">PC Express</span>
      </div>
      <div className="text-xs text-body flex items-center gap-1">
        <span>📍</span>
        <span className="font-medium">Lakeshore Blvd</span>
      </div>
    </div>
  );
}
