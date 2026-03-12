import type { Product } from '../../data/products';
import { useStore } from '../../store';

const availBadge = {
  in_stock: { text: 'In Stock', bg: 'bg-success-light', color: 'text-success' },
  low_stock: { text: 'Low Stock', bg: 'bg-warning-light', color: 'text-warning' },
  out_of_stock: { text: 'Out of Stock', bg: 'bg-error-light', color: 'text-error' },
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { cart, addToCart, updateQuantity } = useStore();
  const inCart = cart.find(c => c.product.id === product.id);
  const badge = availBadge[product.availability];

  return (
    <div
      className="bg-card rounded-lg border border-border p-3 flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="text-3xl text-center mb-2">{product.image}</div>
      <p className="text-sm font-semibold text-dark leading-tight line-clamp-2">{product.name}</p>
      <p className="text-xs text-body mt-0.5">{product.size}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-base font-bold text-dark">${product.price.toFixed(2)}</span>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.bg} ${badge.color}`}>
          {badge.text}
        </span>
      </div>

      <p className="text-[10px] text-optimum mt-1">⭐ Earn {product.points} pts</p>

      {product.sponsored && (
        <span className="text-[10px] text-sponsored mt-1">Sponsored</span>
      )}

      <div className="mt-auto pt-2">
        {product.availability === 'out_of_stock' ? (
          <button className="w-full py-2 rounded-lg text-xs font-medium bg-bg text-body border border-border">
            Notify Me
          </button>
        ) : inCart ? (
          <div className="flex items-center justify-center gap-3 bg-bg rounded-lg py-1.5">
            <button
              onClick={() => updateQuantity(product.id, inCart.quantity - 1)}
              className="w-7 h-7 rounded-full bg-white border border-border text-dark font-bold flex items-center justify-center active:scale-95"
            >
              −
            </button>
            <span className="text-sm font-bold text-dark w-6 text-center">{inCart.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, inCart.quantity + 1)}
              className="w-7 h-7 rounded-full bg-loblaws text-white font-bold flex items-center justify-center active:scale-95"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2 rounded-lg text-xs font-semibold bg-loblaws text-white active:scale-97 transition-transform"
          >
            + Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
