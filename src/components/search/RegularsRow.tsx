import { regulars } from '../../data/products';
import { useStore } from '../../store';

export default function RegularsRow() {
  const { addToCart, cart } = useStore();

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-dark px-4 mb-2">Your Regulars</h3>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
        {regulars.map(product => {
          const inCart = cart.find(c => c.product.id === product.id);
          return (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex-shrink-0 w-20 bg-card rounded-lg border border-border p-2 flex flex-col items-center active:scale-95 transition-transform"
            >
              <span className="text-2xl">{product.image}</span>
              <span className="text-[10px] text-dark font-medium text-center leading-tight mt-1 line-clamp-2">
                {product.name}
              </span>
              <span className="text-[10px] font-bold text-dark mt-0.5">${product.price.toFixed(2)}</span>
              {inCart && (
                <span className="text-[9px] bg-loblaws text-white rounded-full px-1.5 mt-0.5">
                  {inCart.quantity} in cart
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
