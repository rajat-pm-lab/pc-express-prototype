import type { Product } from '../../data/products';

const availBadge = {
  in_stock: { text: 'In Stock', color: 'text-success' },
  low_stock: { text: 'Low Stock', color: 'text-warning' },
  out_of_stock: { text: 'Out of Stock', color: 'text-error' },
};

interface Props {
  originalName: string;
  substitutes: Product[];
  onSelect: (product: Product) => void;
  onRemove: () => void;
  onClose: () => void;
}

export default function SubstitutePanel({ originalName, substitutes, onSelect, onRemove, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl w-full max-w-[480px] p-4 pb-8 animate-fade-in">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
        <p className="text-sm font-semibold text-dark mb-3">
          Substitutes for: {originalName}
        </p>

        <div className="space-y-2 mb-4">
          {substitutes.map(sub => {
            const badge = availBadge[sub.availability];
            return (
              <div key={sub.id} className="bg-bg rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">{sub.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark">{sub.name}</p>
                  <p className="text-xs text-body">{sub.size}</p>
                  <p className={`text-xs ${badge.color}`}>{badge.text}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-dark">${sub.price.toFixed(2)}</p>
                  <button
                    onClick={() => onSelect(sub)}
                    className="mt-1 px-3 py-1.5 bg-loblaws text-white text-xs font-medium rounded-lg active:scale-95 transition-transform"
                  >
                    Use This
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRemove}
          className="w-full py-2.5 bg-bg text-body text-sm font-medium rounded-lg border border-border active:scale-97 transition-transform"
        >
          Just Remove It
        </button>
      </div>
    </div>
  );
}
