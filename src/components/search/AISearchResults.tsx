import type { AISearchResult } from '../../data/products';
import ProductCard from './ProductCard';
import { useStore } from '../../store';

export default function AISearchResults({ result }: { result: AISearchResult }) {
  const { addToCart } = useStore();

  const allItems = result.categories.flatMap(c => c.items);
  const totalPrice = allItems.reduce((s, i) => s + i.price, 0);

  return (
    <div className="px-4 pb-24">
      <div className="bg-info-light rounded-lg p-3 mb-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">🤖</span>
          <span className="text-xs font-semibold text-info">AI-Powered Search</span>
        </div>
        <p className="text-xs text-body">
          "{result.query}" → <span className="font-medium text-dark">{result.interpretation}</span>
        </p>
      </div>

      {result.categories.map((category, ci) => (
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

      <button
        onClick={() => allItems.forEach(item => addToCart(item))}
        className="w-full py-3 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform shadow-lg mt-2"
      >
        Add All to Cart — {allItems.length} items, ${totalPrice.toFixed(2)}
      </button>
    </div>
  );
}
