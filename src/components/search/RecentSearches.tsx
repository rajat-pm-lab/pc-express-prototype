import { useStore } from '../../store';

export default function RecentSearches({ onSelect }: { onSelect: (q: string) => void }) {
  const { recentSearches } = useStore();

  if (recentSearches.length === 0) return null;

  return (
    <div className="px-4 mb-4">
      <h3 className="text-sm font-semibold text-dark mb-2">Recent Searches</h3>
      <div className="space-y-1">
        {recentSearches.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="w-full flex items-center gap-2 py-2 px-3 rounded-lg bg-card border border-border text-left active:bg-bg transition-colors"
          >
            <span className="text-body text-sm">🕐</span>
            <span className="text-sm text-dark">{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
