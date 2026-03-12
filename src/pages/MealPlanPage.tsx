import { useStore } from '../store';
import MealOnboarding from '../components/meals/MealOnboarding';
import MealPlanView from '../components/meals/MealPlanView';
import MealPlanSummary from '../components/meals/MealPlanSummary';
import MealAddedSuccess from '../components/meals/MealAddedSuccess';

export default function MealPlanPage() {
  const { mealPlanPhase, setMealPlanPhase, generatePlan } = useStore();

  const handleGenerate = () => {
    setMealPlanPhase('generating');
    // Simulate AI generation delay
    setTimeout(() => {
      generatePlan();
    }, 2000);
  };

  return (
    <div className="pb-20 pt-2">
      {mealPlanPhase === 'onboarding' && (
        <MealOnboarding onGenerate={handleGenerate} />
      )}
      {mealPlanPhase === 'generating' && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-5xl mb-6 animate-bounce">🤖</div>
          <p className="text-lg font-semibold text-dark mb-2">Planning your meals...</p>
          <p className="text-sm text-body text-center mb-6">Finding the best recipes, optimizing ingredients across meals, and calculating quantities</p>
          <div className="w-48 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-loblaws rounded-full"
              style={{ animation: 'fillBar 2s ease-out forwards' }}
            />
          </div>
          <style>{`
            @keyframes fillBar {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      )}
      {mealPlanPhase === 'plan' && <MealPlanView />}
      {mealPlanPhase === 'summary' && <MealPlanSummary />}
      {mealPlanPhase === 'added' && <MealAddedSuccess />}
    </div>
  );
}
