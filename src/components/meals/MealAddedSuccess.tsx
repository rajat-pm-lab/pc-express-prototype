import { useStore } from '../../store';

export default function MealAddedSuccess() {
  const { mealPlan, resetMealPlan, setActiveTab, cart } = useStore();

  if (!mealPlan) return null;

  const totalCartItems = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 animate-fade-in">
      <div className="text-6xl mb-4 animate-scale-in">🎉</div>
      <h2 className="text-xl font-bold text-dark mb-2">Meal Plan Added!</h2>
      <p className="text-sm text-body text-center mb-6">
        {mealPlan.totalItems} items from {mealPlan.meals.length} meals added to your cart
      </p>

      {/* Summary card */}
      <div className="bg-white rounded-xl border border-border p-4 w-full mb-6">
        <div className="space-y-3">
          {mealPlan.meals.map(meal => (
            <div key={meal.id} className="flex items-center gap-3">
              <span className="text-xl">{meal.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-dark">{meal.name}</p>
                <p className="text-xs text-body">{meal.ingredients.length} ingredients</p>
              </div>
              <span className="text-xs text-success">✓</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-3 pt-3 flex justify-between">
          <span className="text-sm text-body">Cart total</span>
          <span className="text-sm font-bold text-dark">{totalCartItems} items</span>
        </div>
      </div>

      {/* Savings reminder */}
      {mealPlan.crossMealSavings > 0 && (
        <div className="bg-success-light rounded-xl px-4 py-3 w-full mb-6 text-center">
          <p className="text-sm text-success font-medium">
            🔄 You saved ~${mealPlan.crossMealSavings.toFixed(2)} through cross-meal optimization
          </p>
        </div>
      )}

      {/* PC Optimum points */}
      <div className="bg-optimum/5 rounded-xl px-4 py-3 w-full mb-8 text-center border border-optimum/10">
        <p className="text-sm text-optimum font-medium">
          Earn up to {mealPlan.totalPoints.toLocaleString()} PC Optimum points on this order
        </p>
      </div>

      {/* Actions */}
      <div className="w-full space-y-2">
        <button
          onClick={() => setActiveTab('checkout')}
          className="w-full bg-loblaws text-white font-semibold py-3.5 rounded-xl text-base shadow-lg hover:bg-loblaws-dark transition-colors active:scale-[0.98]"
        >
          Go to Checkout
        </button>
        <button
          onClick={resetMealPlan}
          className="w-full bg-white text-loblaws font-semibold py-3 rounded-xl text-sm border border-loblaws/20 hover:bg-loblaws/5 transition-colors"
        >
          Plan More Meals
        </button>
      </div>
    </div>
  );
}
