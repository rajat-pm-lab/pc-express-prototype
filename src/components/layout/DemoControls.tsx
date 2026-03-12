import { useStore } from '../../store';
import { useState, useEffect } from 'react';

export default function DemoControls() {
  const {
    activeTab, searchMode, setSearchMode,
    checkoutScenario, setCheckoutScenario, resetCheckout,
    demoOpen, setDemoOpen,
    orderAttempts, issuesCaught, itemsRecovered,
    checkoutStartTime,
  } = useStore();

  const [elapsed, setElapsed] = useState('0:00');

  useEffect(() => {
    if (!checkoutStartTime) { setElapsed('0:00'); return; }
    const iv = setInterval(() => {
      const s = Math.floor((Date.now() - checkoutStartTime) / 1000);
      setElapsed(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(iv);
  }, [checkoutStartTime]);

  return (
    <>
      <button
        onClick={() => setDemoOpen(!demoOpen)}
        className="fixed bottom-16 right-3 z-50 bg-dark text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-lg active:scale-95 transition-transform"
      >
        🎮
      </button>

      {demoOpen && (
        <div className="fixed bottom-28 right-3 z-50 bg-white border border-border rounded-xl shadow-2xl p-4 w-72 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm text-dark">Demo Controls</span>
            <button onClick={() => setDemoOpen(false)} className="text-body text-lg leading-none">&times;</button>
          </div>

          {activeTab === 'search' && (
            <div>
              <p className="text-xs text-body mb-2">Search Mode:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSearchMode('fixed')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    searchMode === 'fixed'
                      ? 'bg-success-light text-success border border-success'
                      : 'bg-bg text-body border border-border'
                  }`}
                >
                  ✅ Fixed
                </button>
                <button
                  onClick={() => setSearchMode('broken')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    searchMode === 'broken'
                      ? 'bg-error-light text-error border border-error'
                      : 'bg-bg text-body border border-border'
                  }`}
                >
                  🔴 Broken
                </button>
              </div>
              <p className="text-[10px] text-body mt-2">
                {searchMode === 'broken'
                  ? 'Simulating PC Express: drops keystrokes, shows sponsored first'
                  : 'Fixed: perfect input, organic results first, AI search enabled'}
              </p>
            </div>
          )}

          {activeTab === 'checkout' && (
            <div>
              <p className="text-xs text-body mb-2">Scenario:</p>
              <div className="space-y-1.5">
                {([
                  ['all_clear', '✅ A: All Clear', 'Order succeeds on first try'],
                  ['blockers', '⚠️ B: Blockers Found', 'Pre-validation catches 3 issues'],
                  ['broken', '🔴 C: Broken (Current)', 'Generic error, no explanation'],
                ] as const).map(([key, label, desc]) => (
                  <button
                    key={key}
                    onClick={() => { setCheckoutScenario(key); resetCheckout(); }}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs transition-colors ${
                      checkoutScenario === key
                        ? 'bg-info-light text-info border border-info'
                        : 'bg-bg text-body border border-border'
                    }`}
                  >
                    <span className="font-medium">{label}</span>
                    <br />
                    <span className="text-[10px] opacity-75">{desc}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-[10px] text-body font-medium mb-1.5">STATS</p>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="bg-bg rounded px-2 py-1">
                    <span className="text-body">Attempts:</span>{' '}
                    <span className="font-bold text-dark">{orderAttempts}</span>
                  </div>
                  <div className="bg-bg rounded px-2 py-1">
                    <span className="text-body">Time:</span>{' '}
                    <span className="font-bold text-dark">{elapsed}</span>
                  </div>
                  <div className="bg-bg rounded px-2 py-1">
                    <span className="text-body">Caught:</span>{' '}
                    <span className="font-bold text-success">{issuesCaught}</span>
                  </div>
                  <div className="bg-bg rounded px-2 py-1">
                    <span className="text-body">Recovered:</span>{' '}
                    <span className="font-bold text-success">{itemsRecovered}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetCheckout}
                className="mt-3 w-full py-2 bg-bg text-body text-xs font-medium rounded-lg border border-border active:scale-97 transition-transform"
              >
                Reset Cart
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
