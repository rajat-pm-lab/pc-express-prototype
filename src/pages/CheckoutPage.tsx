import { useState } from 'react';
import { useStore } from '../store';
import { scenarioBValidation } from '../data/products';
import type { Product } from '../data/products';
import ValidationLoader from '../components/checkout/ValidationLoader';
import SubstitutePanel from '../components/checkout/SubstitutePanel';
import OrderSuccess from '../components/checkout/OrderSuccess';

export default function CheckoutPage() {
  const {
    cart, removeFromCart, updateQuantity, replaceCartItem,
    checkoutScenario, checkoutPhase, setCheckoutPhase,
    orderAttempts, incrementAttempts,
    setIssuesCaught, incrementItemsRecovered,
    setCheckoutStartTime,
    resolvedBlockers, resolveBlocker,
    acceptedPriceChanges, acceptPriceChange,
    resetCheckout, loadDemoCart,
  } = useStore();

  const [substitutePanel, setSubstitutePanel] = useState<{
    originalName: string;
    originalId: number;
    substitutes: Product[];
  } | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const [shakeError, setShakeError] = useState(false);

  // Compute cart total accounting for price changes
  const cartTotal = cart.reduce((sum, c) => {
    let price = c.product.price;
    if (acceptedPriceChanges.has(c.product.id)) {
      const vr = scenarioBValidation.find(v => v.itemId === c.product.id && v.newPrice);
      if (vr?.newPrice) price = vr.newPrice;
    }
    return sum + price * c.quantity;
  }, 0);

  const cartPoints = cart.reduce((sum, c) => sum + c.product.points * c.quantity, 0);

  const handleProceedToCheckout = () => {
    setCheckoutStartTime(Date.now());

    if (checkoutScenario === 'broken') {
      // Skip validation entirely
      setCheckoutPhase('results');
    } else {
      setCheckoutPhase('validating');
    }
  };

  const handleValidationComplete = () => {
    if (checkoutScenario === 'blockers') {
      setIssuesCaught(3);
    }
    setCheckoutPhase('results');
  };

  const handlePlaceOrder = () => {
    incrementAttempts();

    if (checkoutScenario === 'broken') {
      // Show generic error after fake loading
      setCheckoutPhase('error');
      return;
    }

    // Success
    setCheckoutPhase('success');
  };

  const handleRetry = () => {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 500);
    incrementAttempts();
  };

  const handleRemoveItem = (itemId: number) => {
    setRemovingIds(prev => new Set([...prev, itemId]));
    setTimeout(() => {
      removeFromCart(itemId);
      resolveBlocker(itemId);
      setRemovingIds(prev => { const next = new Set(prev); next.delete(itemId); return next; });
    }, 400);
  };

  const handleSubstitute = (originalId: number, newProduct: Product) => {
    replaceCartItem(originalId, newProduct);
    resolveBlocker(originalId);
    incrementItemsRecovered();
    setSubstitutePanel(null);
  };

  const handleAcceptPrice = (itemId: number) => {
    acceptPriceChange(itemId);
    resolveBlocker(itemId);
  };

  // Check if all blockers resolved
  const blockers = scenarioBValidation.filter(v => v.status === 'blocker');
  const warnings = scenarioBValidation.filter(v => v.status === 'warning');
  const allBlockersResolved = checkoutScenario === 'blockers'
    ? blockers.every(b => resolvedBlockers.has(b.itemId))
    : true;
  const allWarningsResolved = checkoutScenario === 'blockers'
    ? warnings.every(w => resolvedBlockers.has(w.itemId) || acceptedPriceChanges.has(w.itemId))
    : true;
  const canPlaceOrder = checkoutScenario !== 'blockers' || (allBlockersResolved && allWarningsResolved);

  // ── EMPTY CART ──
  if (checkoutPhase === 'cart' && cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8">
        <span className="text-5xl mb-4">🛒</span>
        <h2 className="text-lg font-bold text-dark mb-2">Your cart is empty</h2>
        <p className="text-xs text-body text-center mb-6">Add items from AI Search or Meal Planning, or load demo items to try the Checkout Guardian.</p>
        <button
          onClick={loadDemoCart}
          className="py-3 px-6 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform"
        >
          Load Demo Cart (8 items)
        </button>
      </div>
    );
  }

  // ── CART VIEW ──
  if (checkoutPhase === 'cart') {
    return (
      <div className="pb-24">
        {/* Recovery banner */}
        <div className="bg-info-light px-4 py-2.5 flex items-center justify-between text-xs">
          <span className="text-info">🔄 Your cart has been recovered ({cart.length} items). Last saved 2 min ago.</span>
        </div>

        <div className="px-4 py-3">
          <h2 className="text-lg font-bold text-dark mb-1">My Cart</h2>
          <p className="text-xs text-body mb-3">📍 Pickup: Tomorrow 10am–12pm</p>

          <div className="space-y-2">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className={`bg-card rounded-lg border border-border p-3 flex items-center gap-3 transition-all ${
                  removingIds.has(product.id) ? 'animate-slide-out-left' : 'animate-fade-in'
                }`}
              >
                <span className="text-2xl">{product.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">{product.name}</p>
                  <p className="text-xs text-body">{product.size}</p>
                  <p className="text-[10px] text-optimum">⭐ {product.points} pts</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="text-sm font-bold text-dark">${(product.price * quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-6 h-6 rounded-full bg-bg border border-border text-dark text-xs font-bold flex items-center justify-center active:scale-95"
                    >−</button>
                    <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-6 h-6 rounded-full bg-loblaws text-white text-xs font-bold flex items-center justify-center active:scale-95"
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart summary */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-border px-4 py-3 z-30">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-body">Subtotal ({cart.reduce((s, c) => s + c.quantity, 0)} items)</span>
            <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-optimum">⭐ You'll earn</span>
            <span className="font-semibold text-optimum">{cartPoints.toLocaleString()} points</span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-3 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }

  // ── VALIDATING ──
  if (checkoutPhase === 'validating') {
    return <ValidationLoader onComplete={handleValidationComplete} />;
  }

  // ── SUCCESS ──
  if (checkoutPhase === 'success') {
    return <OrderSuccess total={cartTotal} points={cartPoints} onContinue={resetCheckout} />;
  }

  // ── ERROR (Broken mode) ──
  if (checkoutPhase === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8">
        <div className={`text-5xl mb-4 ${shakeError ? 'animate-shake' : ''}`}>❌</div>
        <h2 className="text-base font-semibold text-dark mb-2 text-center">
          An error occurred while placing your order. Please try again.
        </h2>
        <p className="text-xs text-body mb-6">Attempt {orderAttempts} of ∞</p>

        <button
          onClick={handleRetry}
          className="w-full py-3 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform"
        >
          Try Again
        </button>

        {orderAttempts >= 3 && (
          <div className="mt-6 bg-info-light rounded-lg p-3 text-center animate-fade-in">
            <p className="text-xs text-info">
              💡 This would have been caught by the Checkout Guardian.
            </p>
            <button
              onClick={() => {
                useStore.getState().setCheckoutScenario('blockers');
                resetCheckout();
              }}
              className="text-xs text-info font-semibold underline mt-1"
            >
              Try Scenario B instead →
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS (Scenario A: All Clear / Scenario B: Blockers / Scenario C: Generic checkout) ──
  if (checkoutPhase === 'results') {
    // Scenario C (broken): just show simple summary then trigger error on Place Order
    if (checkoutScenario === 'broken') {
      return (
        <div className="py-8 px-6">
          <h2 className="text-lg font-bold text-dark mb-4">Order Summary</h2>
          <div className="bg-card rounded-xl border border-border p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-body">{cart.reduce((s, c) => s + c.quantity, 0)} items</span>
              <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-body">Pickup fee</span>
              <span className="font-medium text-success">Free</span>
            </div>
            <div className="border-t border-border my-1" />
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-dark">Total</span>
              <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-body">📍 Pickup: Tomorrow 10am–12pm</p>
            <p className="text-xs text-body">💳 Visa ending in 4242</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 mt-6 rounded-xl bg-loblaws text-white font-semibold text-sm active:scale-97 transition-transform"
          >
            Place Order
          </button>
        </div>
      );
    }

    // Scenario A: All Clear
    if (checkoutScenario === 'all_clear') {
      return (
        <div className="py-8 px-6">
          <div className="text-center mb-6 animate-fade-in">
            <span className="text-4xl">✅</span>
            <h2 className="text-lg font-bold text-success mt-2">Your order is ready to place!</h2>
            <p className="text-xs text-body mt-1">
              All {cart.reduce((s, c) => s + c.quantity, 0)} items are available at Lakeshore Blvd Loblaws
            </p>
          </div>

          <div className="bg-success-light rounded-xl p-4 space-y-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between text-sm">
              <span className="text-body">{cart.reduce((s, c) => s + c.quantity, 0)} items</span>
              <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-body">Pickup fee</span>
              <span className="font-medium text-success">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-optimum">⭐ Earning</span>
              <span className="font-bold text-optimum">{cartPoints.toLocaleString()} points</span>
            </div>
            <p className="text-xs text-body">📍 Pickup: Tomorrow 10am–12pm</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 mt-6 rounded-xl bg-success text-white font-semibold text-sm active:scale-97 transition-transform"
          >
            Place Order
          </button>
        </div>
      );
    }

    // Scenario B: Blockers Found
    return (
      <div className="pb-24 px-4 py-4">
        <div className="bg-warning-light rounded-lg p-3 mb-4 animate-fade-in">
          <p className="text-sm font-semibold text-dark">
            ⚠️ {blockers.filter(b => !resolvedBlockers.has(b.itemId)).length + warnings.filter(w => !resolvedBlockers.has(w.itemId) && !acceptedPriceChanges.has(w.itemId)).length} issue(s) found with your order
          </p>
          <p className="text-xs text-body mt-0.5">Fix these to place your order</p>
        </div>

        {/* Blockers */}
        {blockers.some(b => !resolvedBlockers.has(b.itemId)) && (
          <>
            <h3 className="text-xs font-semibold text-error uppercase tracking-wider mb-2">Blockers — Must Fix</h3>
            <div className="space-y-2 mb-4">
              {blockers.filter(b => !resolvedBlockers.has(b.itemId)).map(b => {
                const item = cart.find(c => c.product.id === b.itemId);
                if (!item) return null;
                return (
                  <div key={b.itemId} className="bg-error-light rounded-lg p-3 border border-error/20 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.product.image}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark">{item.product.name}</p>
                        <p className="text-xs text-error font-medium">{b.reason}</p>
                      </div>
                      <span className="text-lg">❌</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleRemoveItem(b.itemId)}
                        className="flex-1 py-2 text-xs font-medium bg-white rounded-lg border border-border active:scale-97 transition-transform"
                      >
                        Remove
                      </button>
                      {b.substitutes && (
                        <button
                          onClick={() => setSubstitutePanel({
                            originalName: item.product.name,
                            originalId: b.itemId,
                            substitutes: b.substitutes!,
                          })}
                          className="flex-1 py-2 text-xs font-medium bg-loblaws text-white rounded-lg active:scale-97 transition-transform"
                        >
                          Substitute
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Warnings */}
        {warnings.some(w => !resolvedBlockers.has(w.itemId) && !acceptedPriceChanges.has(w.itemId)) && (
          <>
            <h3 className="text-xs font-semibold text-warning uppercase tracking-wider mb-2">Warnings</h3>
            <div className="space-y-2 mb-4">
              {warnings.filter(w => !resolvedBlockers.has(w.itemId) && !acceptedPriceChanges.has(w.itemId)).map(w => {
                const item = cart.find(c => c.product.id === w.itemId);
                if (!item) return null;
                return (
                  <div key={w.itemId} className="bg-warning-light rounded-lg p-3 border border-warning/20 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.product.image}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark">{item.product.name}</p>
                        <p className="text-xs text-warning font-medium">
                          Price changed: ${w.oldPrice?.toFixed(2)} → ${w.newPrice?.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-lg">⚠️</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAcceptPrice(w.itemId)}
                        className="flex-1 py-2 text-xs font-medium bg-white rounded-lg border border-border active:scale-97 transition-transform"
                      >
                        Accept ${w.newPrice?.toFixed(2)}
                      </button>
                      <button
                        onClick={() => handleRemoveItem(w.itemId)}
                        className="flex-1 py-2 text-xs font-medium bg-white rounded-lg border border-border active:scale-97 transition-transform"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Clear items */}
        <h3 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">
          All Clear ({cart.filter(c => !scenarioBValidation.find(v => v.itemId === c.product.id && !resolvedBlockers.has(v.itemId) && !acceptedPriceChanges.has(v.itemId))).length} items)
        </h3>
        <div className="space-y-1 mb-6">
          {cart
            .filter(c => {
              const v = scenarioBValidation.find(v => v.itemId === c.product.id);
              if (!v) return true;
              return resolvedBlockers.has(v.itemId) || acceptedPriceChanges.has(v.itemId);
            })
            .map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-2 py-1.5 text-sm">
                <span className="text-success">✅</span>
                <span className="text-dark">{product.name}</span>
                {quantity > 1 && <span className="text-body">×{quantity}</span>}
                <span className="ml-auto text-body">${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
        </div>

        {/* Updated total + Place Order */}
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-body">Updated total</span>
            <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-optimum">⭐ Points</span>
            <span className="font-semibold text-optimum">{cartPoints.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!canPlaceOrder}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-97 ${
            canPlaceOrder
              ? 'bg-success text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed active:scale-100'
          }`}
        >
          {canPlaceOrder ? 'Place Order' : 'Fix Issues to Place Order'}
        </button>

        {/* Substitute panel */}
        {substitutePanel && (
          <SubstitutePanel
            originalName={substitutePanel.originalName}
            substitutes={substitutePanel.substitutes}
            onSelect={(product) => handleSubstitute(substitutePanel.originalId, product)}
            onRemove={() => { handleRemoveItem(substitutePanel.originalId); setSubstitutePanel(null); }}
            onClose={() => setSubstitutePanel(null)}
          />
        )}
      </div>
    );
  }

  return null;
}
