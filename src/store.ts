import { create } from 'zustand';
import type { Product, MealPlan } from './data/products';
import { checkoutCartItems, scenarioBValidation as validationData, generateMealPlan, altMeals } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

type CheckoutScenario = 'all_clear' | 'blockers' | 'broken';
type CheckoutPhase = 'cart' | 'validating' | 'results' | 'error' | 'success';

type MealPlanPhase = 'onboarding' | 'generating' | 'plan' | 'summary' | 'added';

interface AppState {
  // Navigation
  activeTab: 'search' | 'checkout' | 'meals';
  setActiveTab: (tab: 'search' | 'checkout' | 'meals') => void;

  // Search
  searchMode: 'fixed' | 'broken';
  setSearchMode: (mode: 'fixed' | 'broken') => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;

  // Cart (shared)
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  replaceCartItem: (oldId: number, newProduct: Product) => void;
  cartTotal: () => number;
  cartPoints: () => number;

  // Checkout
  checkoutScenario: CheckoutScenario;
  setCheckoutScenario: (scenario: CheckoutScenario) => void;
  checkoutPhase: CheckoutPhase;
  setCheckoutPhase: (phase: CheckoutPhase) => void;
  orderAttempts: number;
  incrementAttempts: () => void;
  resetCheckout: () => void;
  loadDemoCart: () => void;

  // Checkout stats
  issuesCaught: number;
  setIssuesCaught: (n: number) => void;
  itemsRecovered: number;
  incrementItemsRecovered: () => void;
  checkoutStartTime: number | null;
  setCheckoutStartTime: (t: number | null) => void;

  // Resolved blockers tracking
  resolvedBlockers: Set<number>;
  resolveBlocker: (itemId: number) => void;
  acceptedPriceChanges: Set<number>;
  acceptPriceChange: (itemId: number) => void;

  // Meal Planning
  mealPlanPhase: MealPlanPhase;
  setMealPlanPhase: (phase: MealPlanPhase) => void;
  mealPlanPeople: number;
  setMealPlanPeople: (n: number) => void;
  mealPlanCount: number;
  setMealPlanCount: (n: number) => void;
  mealDietPref: 'any' | 'veg' | 'vegan';
  setMealDietPref: (pref: 'any' | 'veg' | 'vegan') => void;
  mealCuisinePrefs: string[];
  toggleCuisinePref: (cuisine: string) => void;
  mealPlan: MealPlan | null;
  generatePlan: () => void;
  shuffleMeal: (mealIndex: number) => void;
  adjustIngredientQty: (mealId: number, productId: number, delta: number) => void;
  addPlanToCart: () => void;
  resetMealPlan: () => void;

  // Demo
  demoOpen: boolean;
  setDemoOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Navigation
  activeTab: 'search',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Search
  searchMode: 'fixed',
  setSearchMode: (mode) => set({ searchMode: mode }),
  recentSearches: ['chicken breast', 'bananas', 'pasta sauce', 'toilet paper', 'cheddar cheese'],
  addRecentSearch: (query) => set(s => ({
    recentSearches: [query, ...s.recentSearches.filter(r => r !== query)].slice(0, 5),
  })),

  // Cart — starts empty, checkout demo loads items via resetCheckout
  cart: [],
  addToCart: (product) => set(s => {
    const existing = s.cart.find(c => c.product.id === product.id);
    if (existing) {
      return { cart: s.cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c) };
    }
    return { cart: [...s.cart, { product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set(s => ({
    cart: s.cart.filter(c => c.product.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set(s => {
    if (quantity <= 0) return { cart: s.cart.filter(c => c.product.id !== productId) };
    return { cart: s.cart.map(c => c.product.id === productId ? { ...c, quantity } : c) };
  }),
  replaceCartItem: (oldId, newProduct) => set(s => ({
    cart: s.cart.map(c => c.product.id === oldId ? { product: newProduct, quantity: c.quantity } : c),
  })),
  cartTotal: () => {
    const s = get();
    let total = 0;
    for (const item of s.cart) {
      let price = item.product.price;
      // If price was accepted as changed
      if (s.acceptedPriceChanges.has(item.product.id)) {
        // Find the new price from validation
        const vr = validationData.find(v => v.itemId === item.product.id && v.newPrice);
        if (vr?.newPrice) price = vr.newPrice;
      }
      total += price * item.quantity;
    }
    return Math.round(total * 100) / 100;
  },
  cartPoints: () => get().cart.reduce((sum, c) => sum + c.product.points * c.quantity, 0),

  // Checkout
  checkoutScenario: 'all_clear',
  setCheckoutScenario: (scenario) => set({ checkoutScenario: scenario }),
  checkoutPhase: 'cart',
  setCheckoutPhase: (phase) => set({ checkoutPhase: phase }),
  orderAttempts: 0,
  incrementAttempts: () => set(s => ({ orderAttempts: s.orderAttempts + 1 })),
  resetCheckout: () => set({
    checkoutPhase: 'cart',
    orderAttempts: 0,
    issuesCaught: 0,
    itemsRecovered: 0,
    checkoutStartTime: null,
    resolvedBlockers: new Set(),
    acceptedPriceChanges: new Set(),
  }),
  loadDemoCart: () => set({
    cart: checkoutCartItems.map(p => ({ product: p, quantity: p.id === 3 ? 2 : p.id === 4 ? 5 : p.id === 11 ? 2 : 1 })),
  }),

  // Stats
  issuesCaught: 0,
  setIssuesCaught: (n) => set({ issuesCaught: n }),
  itemsRecovered: 0,
  incrementItemsRecovered: () => set(s => ({ itemsRecovered: s.itemsRecovered + 1 })),
  checkoutStartTime: null,
  setCheckoutStartTime: (t) => set({ checkoutStartTime: t }),

  // Resolved
  resolvedBlockers: new Set(),
  resolveBlocker: (itemId) => set(s => {
    const next = new Set(s.resolvedBlockers);
    next.add(itemId);
    return { resolvedBlockers: next };
  }),
  acceptedPriceChanges: new Set(),
  acceptPriceChange: (itemId) => set(s => {
    const next = new Set(s.acceptedPriceChanges);
    next.add(itemId);
    return { acceptedPriceChanges: next };
  }),

  // Meal Planning
  mealPlanPhase: 'onboarding',
  setMealPlanPhase: (phase) => set({ mealPlanPhase: phase }),
  mealPlanPeople: 3,
  setMealPlanPeople: (n) => set({ mealPlanPeople: n }),
  mealPlanCount: 5,
  setMealPlanCount: (n) => set({ mealPlanCount: n }),
  mealDietPref: 'any',
  setMealDietPref: (pref) => set({ mealDietPref: pref }),
  mealCuisinePrefs: [],
  toggleCuisinePref: (cuisine) => set(s => {
    const prefs = s.mealCuisinePrefs.includes(cuisine)
      ? s.mealCuisinePrefs.filter(c => c !== cuisine)
      : [...s.mealCuisinePrefs, cuisine];
    return { mealCuisinePrefs: prefs };
  }),
  mealPlan: null,
  generatePlan: () => {
    const s = get();
    const plan = generateMealPlan(s.mealPlanCount, s.mealPlanPeople);
    set({ mealPlan: plan, mealPlanPhase: 'plan' });
  },
  shuffleMeal: (mealIndex) => set(s => {
    if (!s.mealPlan) return {};
    const meals = [...s.mealPlan.meals];
    // Pick a random alt meal not already in the plan
    const currentIds = new Set(meals.map(m => m.id));
    const available = altMeals.filter(m => !currentIds.has(m.id));
    if (available.length === 0) return {};
    const replacement = available[Math.floor(Math.random() * available.length)];
    meals[mealIndex] = replacement;
    const updated = generateMealPlan(meals.length, s.mealPlan.people);
    updated.meals = meals;
    return { mealPlan: updated };
  }),
  adjustIngredientQty: (mealId, productId, delta) => set(s => {
    if (!s.mealPlan) return {};
    const meals = s.mealPlan.meals.map(m => {
      if (m.id !== mealId) return m;
      return {
        ...m,
        ingredients: m.ingredients.map(ing => {
          if (ing.product.id !== productId) return ing;
          const newQty = Math.max(0, ing.quantity + delta);
          return { ...ing, quantity: newQty };
        }).filter(ing => ing.quantity > 0),
      };
    });
    return { mealPlan: { ...s.mealPlan, meals } };
  }),
  addPlanToCart: () => {
    const s = get();
    if (!s.mealPlan) return;
    // Deduplicate: group by product id, pick max quantity
    const productMap = new Map<number, { product: Product; quantity: number }>();
    for (const meal of s.mealPlan.meals) {
      for (const ing of meal.ingredients) {
        const existing = productMap.get(ing.product.id);
        if (existing) {
          // Shared item: don't double-add, already covered
        } else {
          productMap.set(ing.product.id, { product: ing.product, quantity: Math.ceil(ing.quantity) });
        }
      }
    }
    // Add all to cart
    const newCart = [...s.cart];
    for (const [, item] of productMap) {
      const existingIdx = newCart.findIndex(c => c.product.id === item.product.id);
      if (existingIdx >= 0) {
        newCart[existingIdx] = { ...newCart[existingIdx], quantity: newCart[existingIdx].quantity + item.quantity };
      } else {
        newCart.push({ product: item.product, quantity: item.quantity });
      }
    }
    set({ cart: newCart, mealPlanPhase: 'added' });
  },
  resetMealPlan: () => set({ mealPlanPhase: 'onboarding', mealPlan: null, mealPlanPeople: 3, mealPlanCount: 5, mealDietPref: 'any', mealCuisinePrefs: [] }),

  // Demo
  demoOpen: false,
  setDemoOpen: (open) => set({ demoOpen: open }),
}));
