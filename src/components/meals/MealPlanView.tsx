import { useState } from 'react';
import { useStore } from '../../store';
import MealCard from './MealCard';

export default function MealPlanView() {
  const { mealPlan, setMealPlanPhase } = useStore();
  const [expandedMeal, setExpandedMeal] = useState<number | null>(0);

  if (!mealPlan) return null;

  return (
    <div className="px-4 py-4 animate-fade-in">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-dark">Your Meal Plan</h2>
          <p className="text-xs text-body">{mealPlan.meals.length} dinners · {mealPlan.people} people</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-dark">${mealPlan.totalCost.toFixed(2)}</p>
          <p className="text-xs text-success font-medium">${mealPlan.costPerPersonPerMeal.toFixed(2)}/person/meal</p>
        </div>
      </div>

      {/* Cross-meal savings banner */}
      {mealPlan.crossMealSavings > 0 && (
        <div className="bg-success-light border border-success/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
          <span className="text-2xl">🔄</span>
          <div>
            <p className="text-sm font-semibold text-success">Cross-meal optimization</p>
            <p className="text-xs text-body">
              {mealPlan.consolidatedItems} shared ingredients consolidated · saving ~${mealPlan.crossMealSavings.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Meal cards */}
      <div className="space-y-3 mb-6">
        {mealPlan.meals.map((meal, idx) => (
          <MealCard
            key={meal.id}
            meal={meal}
            mealIndex={idx}
            isExpanded={expandedMeal === idx}
            onToggle={() => setExpandedMeal(expandedMeal === idx ? null : idx)}
          />
        ))}
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-16 bg-bg pt-2 pb-2 space-y-2">
        <button
          onClick={() => setMealPlanPhase('summary')}
          className="w-full bg-loblaws text-white font-semibold py-3.5 rounded-xl text-base shadow-lg hover:bg-loblaws-dark transition-colors active:scale-[0.98]"
        >
          Review & Add to Cart ({mealPlan.totalItems} items)
        </button>
      </div>
    </div>
  );
}
