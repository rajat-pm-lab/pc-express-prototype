import { useState, useEffect } from 'react';

const steps = [
  { label: 'Checking item availability', delay: 0 },
  { label: 'Verifying prices', delay: 800 },
  { label: 'Validating substitutions', delay: 1600 },
];

export default function ValidationLoader({ onComplete }: { onComplete: () => void }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    steps.forEach((step, i) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, i]);
        setProgress(((i + 1) / steps.length) * 100);
      }, step.delay + 500);
    });

    setTimeout(onComplete, 2500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <span className="text-4xl mb-4">🔍</span>
      <p className="text-base font-semibold text-dark mb-6">Checking your order...</p>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-2 mb-6">
        <div
          className="bg-loblaws h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Check steps */}
      <div className="w-full space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${step.delay}ms` }}>
            <span className="text-lg">
              {completedSteps.includes(i) ? '✅' : '⏳'}
            </span>
            <span className={`text-sm ${completedSteps.includes(i) ? 'text-dark' : 'text-body'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
