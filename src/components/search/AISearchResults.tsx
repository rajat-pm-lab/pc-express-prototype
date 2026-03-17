import { useState } from 'react';
import type { AISearchResult, DietTag } from '../../data/products';
import ProductCard from './ProductCard';
import { useStore } from '../../store';

const dietFilters: { label: string; value: DietTag | 'all'; color: string; activeColor: string }[] = [
  { label: 'All', value: 'all', color: 'bg-bg text-body border-border', activeColor: 'bg-info-light text-info border-info' },
  { label: 'Veg', value: 'veg', color: 'bg-bg text-body border-border', activeColor: 'bg-success-light text-success border-success' },
  { label: 'Non-Veg', value: 'non-veg', color: 'bg-bg text-body border-border', activeColor: 'bg-error-light text-error border-error' },
  { label: 'Vegan', value: 'vegan', color: 'bg-bg text-body border-border', activeColor: 'bg-success-light text-success border-success' },
];

export default function AISearchResults({ result }: { result: AISearchResult }) {
  const { addToCart } = useStore();
  const [activeDiet, setActiveDiet] = useState<DietTag | 'all'>('all');

  // Filter categories based on diet selection
  const filteredCategories = result.categories.map(cat => ({
    ...cat,
    items: activeDiet === 'all'
      ? cat.items
      : cat.items.filter(item => {
          if (activeDiet === 'veg') return item.diet === 'veg' || item.diet === 'vegan';
          if (activeDiet === 'non-veg') return true; // Non-veg includes everything
          return item.diet === activeDiet;
        }),
  })).filter(cat => cat.items.length > 0);

  const allItems = filteredCategories.flatMap(c => c.items);
  const totalPrice = allItems.reduce((s, i) => s + i.price, 0);

  return (
    <div className="px-4 pb-24">
      <div className="bg-info-light rounded-lg p-3 mb-3 animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">🤖</span>
          <span className="text-xs font-semibold text-info">AI-Powered Search</span>
        </div>
        <p className="text-xs text-body">
          "{result.query}" → <span className="font-medium text-dark">{result.interpretation}</span>
        </p>
      </div>

      {/* Diet filter tags */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {dietFilters.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveDiet(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors ${
              activeDiet === f.value ? f.activeColor : f.color
            }`}
          >
            {f.value === 'veg' && '🟢 '}
            {f.value === 'non-veg' && '🔴 '}
            {f.value === 'vegan' && '🌱 '}
            {f.label}
          </button>
        ))}
      </div>

      {filteredCategories.map((category, ci) => (
        <div key={ci} className="mb-4 animate-fade-in" style={{ animationDelay: `${ci * 100}ms` }}>
          <h3 className="text-sm font-semibold text-dark mb-2 flex items-center gap-1.5">
            <span>{category.emoji}</span> {category.name}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {category.items.map((item, ii) => (
              <ProductCard key={item.id} product={item} index={ii} />
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-body">No {activeDiet} items found for this recipe</p>
          <button onClick={() => setActiveDiet('all')} className="text-xs text-loblaws font-medium mt-2">Show all items</button>
        </div>
      )}

      {allItems.length > 0 && (
        <button
          onClick={() => allItems.forEach(item => addToCart(item))}
          className="w-full py-3 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform shadow-lg mt-2"
        >
          Add All to Cart — {allItems.length} items, ${totalPrice.toFixed(2)}
        </button>
      )}
    </div>
  );
}
