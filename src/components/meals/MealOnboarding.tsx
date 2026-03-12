import { useStore } from '../../store';

interface Props {
  onGenerate: () => void;
}

export default function MealOnboarding({ onGenerate }: Props) {
  const { mealPlanPeople, setMealPlanPeople, mealPlanCount, setMealPlanCount } = useStore();

  return (
    <div className="px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🍽️</div>
        <h2 className="text-xl font-bold text-dark mb-1">Plan Your Meals</h2>
        <p className="text-sm text-body">Tell me what you need and I'll build your grocery list</p>
      </div>

      {/* Chat-style conversation */}
      <div className="space-y-4 mb-8">
        {/* Agent message */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-loblaws/10 flex items-center justify-center text-sm shrink-0">🤖</div>
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border max-w-[85%]">
            <p className="text-sm text-dark">How many people are you cooking for?</p>
          </div>
        </div>

        {/* People selector */}
        <div className="flex justify-end">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => setMealPlanPeople(n)}
                className={`w-11 h-11 rounded-full text-sm font-semibold transition-all ${
                  mealPlanPeople === n
                    ? 'bg-loblaws text-white shadow-md scale-110'
                    : 'bg-white text-body border border-border hover:border-loblaws'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Agent message 2 */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-loblaws/10 flex items-center justify-center text-sm shrink-0">🤖</div>
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border max-w-[85%]">
            <p className="text-sm text-dark">How many dinners do you want planned?</p>
          </div>
        </div>

        {/* Meals selector */}
        <div className="flex justify-end">
          <div className="flex gap-2">
            {[3, 4, 5, 6, 7].map(n => (
              <button
                key={n}
                onClick={() => setMealPlanCount(n)}
                className={`px-4 h-11 rounded-full text-sm font-semibold transition-all ${
                  mealPlanCount === n
                    ? 'bg-loblaws text-white shadow-md scale-110'
                    : 'bg-white text-body border border-border hover:border-loblaws'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Summary bubble */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-loblaws/10 flex items-center justify-center text-sm shrink-0">🤖</div>
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border max-w-[85%]">
            <p className="text-sm text-dark">
              Got it! <strong>{mealPlanCount} dinners for {mealPlanPeople} {mealPlanPeople === 1 ? 'person' : 'people'}</strong>.
              I'll find a variety of meals and optimize ingredients across them so you don't overbuy.
            </p>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        className="w-full bg-loblaws text-white font-semibold py-4 rounded-xl text-base shadow-lg hover:bg-loblaws-dark transition-colors active:scale-[0.98]"
      >
        Plan My Meals
      </button>

      <p className="text-xs text-center text-body/60 mt-3">
        Powered by AI · Prices from your local store
      </p>
    </div>
  );
}
