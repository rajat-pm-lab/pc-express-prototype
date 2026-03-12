import { useStore } from '../../store';

export default function MealPlanSummary() {
  const { mealPlan, setMealPlanPhase, addPlanToCart } = useStore();

  if (!mealPlan) return null;

  // Deduplicate items across meals
  const productMap = new Map<number, { name: string; image: string; price: number; count: number; unit: string; meals: string[] }>();
  for (const meal of mealPlan.meals) {
    for (const ing of meal.ingredients) {
      const existing = productMap.get(ing.product.id);
      if (existing) {
        existing.meals.push(meal.name);
      } else {
        productMap.set(ing.product.id, {
          name: ing.product.name,
          image: ing.product.image,
          price: ing.product.price,
          count: Math.ceil(ing.quantity),
          unit: ing.unit,
          meals: [meal.name],
        });
      }
    }
  }

  const items = Array.from(productMap.values());
  const sharedItems = items.filter(i => i.meals.length > 1);

  const handleAddToCart = () => {
    addPlanToCart();
  };

  return (
    <div className="px-4 py-4 animate-fade-in">
      <button
        onClick={() => setMealPlanPhase('plan')}
        className="text-sm text-loblaws font-medium mb-4 flex items-center gap-1"
      >
        ← Back to meal plan
      </button>

      <h2 className="text-lg font-bold text-dark mb-1">Order Summary</h2>
      <p className="text-xs text-body mb-4">{mealPlan.meals.length} meals · {mealPlan.people} people · {items.length} unique items</p>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="bg-white rounded-xl border border-border px-3 py-3 text-center">
          <p className="text-lg font-bold text-dark">${mealPlan.totalCost.toFixed(2)}</p>
          <p className="text-[10px] text-body">Total Cost</p>
        </div>
        <div className="bg-white rounded-xl border border-border px-3 py-3 text-center">
          <p className="text-lg font-bold text-success">${mealPlan.costPerPersonPerMeal.toFixed(2)}</p>
          <p className="text-[10px] text-body">Per Person/Meal</p>
        </div>
        <div className="bg-white rounded-xl border border-border px-3 py-3 text-center">
          <p className="text-lg font-bold text-optimum">{mealPlan.totalPoints.toLocaleString()}</p>
          <p className="text-[10px] text-body">PC Points</p>
        </div>
      </div>

      {/* Cross-meal savings detail */}
      {sharedItems.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-dark mb-2 flex items-center gap-1">
            🔄 Shared Ingredients (buy once, use in multiple meals)
          </h3>
          <div className="bg-success-light/50 rounded-xl border border-success/10 overflow-hidden">
            {sharedItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-3 py-2.5 ${idx > 0 ? 'border-t border-success/10' : ''}`}
              >
                <span className="text-lg">{item.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark truncate">{item.name}</p>
                  <p className="text-[10px] text-success">
                    Used in: {item.meals.join(', ')}
                  </p>
                </div>
                <span className="text-sm font-medium text-dark">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-success font-medium mt-2 text-right">
            Saved ~${mealPlan.crossMealSavings.toFixed(2)} by sharing ingredients
          </p>
        </div>
      )}

      {/* Full item list */}
      <h3 className="text-sm font-semibold text-dark mb-2">All Items ({items.length})</h3>
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 px-3 py-2.5 ${idx > 0 ? 'border-t border-border' : ''}`}
          >
            <span className="text-base">{item.image}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-dark truncate">{item.name}</p>
              <p className="text-[10px] text-body">{item.count} {item.unit}</p>
            </div>
            <span className="text-sm font-medium text-dark">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Add to cart */}
      <div className="sticky bottom-16 bg-bg pt-2 pb-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-loblaws text-white font-semibold py-3.5 rounded-xl text-base shadow-lg hover:bg-loblaws-dark transition-colors active:scale-[0.98]"
        >
          Add {items.length} Items to Cart — ${mealPlan.totalCost.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
