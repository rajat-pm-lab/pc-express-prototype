export default function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between shadow-sm" style={{ WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col">
        <span className="text-loblaws font-bold text-xl tracking-tight leading-tight">PC Express</span>
        <span className="text-[10px] text-body/70 tracking-wide">Helping Canadians Live Life Well</span>
      </div>
      <div className="text-xs text-body flex items-center gap-1">
        <span>📍</span>
        <span className="font-medium">Lakeshore Blvd</span>
      </div>
    </div>
  );
}
