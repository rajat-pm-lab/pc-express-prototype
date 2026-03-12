import { useStore } from '../../store';
import type { Meal } from '../../data/products';

interface Props {
  meal: Meal;
  mealIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  produce: { label: 'Produce', emoji: '🥬' },
  protein: { label: 'Protein', emoji: '🥩' },
  dairy: { label: 'Dairy', emoji: '🧀' },
  pantry: { label: 'Pantry', emoji: '🫙' },
  frozen: { label: 'Frozen', emoji: '🧊' },
  bakery: { label: 'Bakery', emoji: '🍞' },
};

export default function MealCard({ meal, mealIndex, isExpanded, onToggle }: Props) {
  const { shuffleMeal, adjustIngredientQty } = useStore();

  const mealCost = meal.ingredients.reduce((s, i) => s + i.product.price * i.quantity, 0);

  // Group ingredients by category
  const grouped = meal.ingredients.reduce((acc, ing) => {
    if (!acc[ing.category]) acc[ing.category] = [];
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, typeof meal.ingredients>);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{meal.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-dark">{meal.name}</p>
            <p className="text-xs text-body">{meal.cuisine} · {meal.prepTime} · {meal.ingredients.length} items</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-dark">${mealCost.toFixed(2)}</span>
          <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border animate-fade-in">
          {/* Shuffle button */}
          <div className="px-4 pt-3 pb-1">
            <button
              onClick={(e) => { e.stopPropagation(); shuffleMeal(mealIndex); }}
              className="text-xs text-loblaws font-medium flex items-center gap-1 hover:underline"
            >
              🔀 Shuffle this meal
            </button>
          </div>

          {/* Ingredient groups */}
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="px-4 py-2">
              <p className="text-xs font-semibold text-body/70 uppercase tracking-wider mb-1.5">
                {categoryLabels[cat]?.emoji} {categoryLabels[cat]?.label || cat}
              </p>
              <div className="space-y-1.5">
                {items.map(ing => (
                  <div key={ing.product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-base">{ing.product.image}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-dark truncate">{ing.product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-body">${ing.product.price.toFixed(2)}</span>
                          {ing.sharedWith && ing.sharedWith.length > 0 && (
                            <span className="text-[10px] bg-success-light text-success px-1.5 py-0.5 rounded-full font-medium">
                              Shared ×{ing.sharedWith.length + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); adjustIngredientQty(meal.id, ing.product.id, -1); }}
                        className="w-7 h-7 rounded-full border border-border text-body text-xs flex items-center justify-center hover:bg-bg active:scale-95"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{ing.quantity}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); adjustIngredientQty(meal.id, ing.product.id, 1); }}
                        className="w-7 h-7 rounded-full border border-border text-body text-xs flex items-center justify-center hover:bg-bg active:scale-95"
                      >
                        +
                      </button>
                      <span className="text-xs text-body/60 w-8">{ing.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
