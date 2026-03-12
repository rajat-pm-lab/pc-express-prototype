export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  image: string;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  points: number;
  sponsored?: boolean;
}

export interface AICategory {
  name: string;
  emoji: string;
  items: Product[];
}

export interface AISearchResult {
  query: string;
  interpretation: string;
  categories: AICategory[];
}

export const regulars: Product[] = [
  { id: 1, name: 'Neilson 2% Milk', size: '4L', price: 6.49, image: '🥛', availability: 'in_stock', points: 200 },
  { id: 2, name: 'PC Free Run Eggs', size: '12 pack', price: 4.99, image: '🥚', availability: 'in_stock', points: 150 },
  { id: 3, name: 'Wonder Bread White', size: '675g', price: 3.49, image: '🍞', availability: 'in_stock', points: 100 },
  { id: 4, name: 'Banana', size: 'per lb', price: 0.69, image: '🍌', availability: 'in_stock', points: 25 },
  { id: 5, name: 'PC Chicken Breast', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 },
  { id: 6, name: 'Beatrice Butter', size: '454g', price: 5.99, image: '🧈', availability: 'in_stock', points: 175 },
  { id: 7, name: 'Baby Spinach', size: '312g', price: 4.49, image: '🥬', availability: 'in_stock', points: 130 },
  { id: 8, name: 'PC Greek Yogurt', size: '750g', price: 5.49, image: '🥄', availability: 'in_stock', points: 160 },
];

export const searchResults: Record<string, { organic: Product[]; sponsored: Product[] }> = {
  onion: {
    organic: [
      { id: 10, name: 'Yellow Onion', size: '3 lb bag', price: 3.49, image: '🧅', availability: 'in_stock', points: 100 },
      { id: 11, name: 'Red Onion', size: 'per lb', price: 1.99, image: '🟣', availability: 'in_stock', points: 60 },
      { id: 12, name: 'Green Onion', size: 'bunch', price: 1.29, image: '🌿', availability: 'low_stock', points: 40 },
      { id: 13, name: 'PC Organic White Onion', size: '2 lb bag', price: 4.99, image: '🤍', availability: 'in_stock', points: 150 },
      { id: 14, name: 'Sweet Vidalia Onion', size: 'per lb', price: 2.49, image: '💛', availability: 'in_stock', points: 75 },
      { id: 15, name: 'Pearl Onions', size: '284ml', price: 2.99, image: '🫘', availability: 'out_of_stock', points: 90 },
    ],
    sponsored: [
      { id: 100, name: "Lay's Sour Cream & Onion Chips", size: '235g', price: 4.49, image: '🍟', availability: 'in_stock', points: 130, sponsored: true },
      { id: 101, name: "French's French Fried Onions", size: '170g', price: 5.49, image: '🥫', availability: 'in_stock', points: 160, sponsored: true },
    ],
  },
  chicken: {
    organic: [
      { id: 50, name: 'PC Chicken Breast Boneless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 },
      { id: 51, name: 'PC Chicken Thighs', size: 'per kg', price: 11.99, image: '🦵', availability: 'in_stock', points: 350 },
      { id: 52, name: 'Whole Chicken', size: '~1.5kg', price: 12.99, image: '🐔', availability: 'in_stock', points: 380 },
      { id: 53, name: 'PC Free From Chicken Breast', size: 'per kg', price: 19.99, image: '🌿', availability: 'low_stock', points: 550 },
    ],
    sponsored: [
      { id: 102, name: 'Knorr Chicken Broth', size: '900ml', price: 3.29, image: '🥣', availability: 'in_stock', points: 100, sponsored: true },
    ],
  },
  milk: {
    organic: [
      { id: 60, name: 'Neilson 2% Milk', size: '4L', price: 6.49, image: '🥛', availability: 'in_stock', points: 200 },
      { id: 61, name: 'Neilson Homo Milk', size: '4L', price: 6.99, image: '🍼', availability: 'in_stock', points: 210 },
      { id: 62, name: 'Neilson 1% Milk', size: '4L', price: 6.49, image: '🧃', availability: 'in_stock', points: 200 },
      { id: 63, name: 'PC Organic 2% Milk', size: '2L', price: 6.99, image: '🌱', availability: 'in_stock', points: 210 },
      { id: 64, name: 'Silk Oat Milk', size: '1.75L', price: 5.49, image: '🌾', availability: 'low_stock', points: 160 },
    ],
    sponsored: [],
  },
  bread: {
    organic: [
      { id: 70, name: 'Wonder Bread White', size: '675g', price: 3.49, image: '🍞', availability: 'in_stock', points: 100 },
      { id: 71, name: "Dempster's Whole Wheat", size: '675g', price: 3.99, image: '🥖', availability: 'in_stock', points: 120 },
      { id: 72, name: 'PC Multigrain Bread', size: '600g', price: 3.79, image: '🥯', availability: 'in_stock', points: 110 },
    ],
    sponsored: [],
  },
};

export const aiSearchResults: Record<string, AISearchResult> = {
  'stuff for tacos': {
    query: 'stuff for tacos',
    interpretation: 'Taco night ingredients',
    categories: [
      {
        name: 'Protein', emoji: '🥩',
        items: [
          { id: 20, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250 },
          { id: 21, name: 'PC Seasoned Chicken Strips', size: '400g', price: 9.49, image: '🍗', availability: 'in_stock', points: 300 },
        ],
      },
      {
        name: 'Tortillas & Wraps', emoji: '🌮',
        items: [
          { id: 22, name: 'Old El Paso Taco Shells', size: '12 pack', price: 3.99, image: '🌮', availability: 'in_stock', points: 120 },
          { id: 23, name: "Dempster's Flour Tortillas", size: '10 pack', price: 4.49, image: '🌮', availability: 'in_stock', points: 130 },
        ],
      },
      {
        name: 'Dairy', emoji: '🧀',
        items: [
          { id: 24, name: 'PC Shredded Tex-Mex Cheese', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160 },
          { id: 25, name: 'Sealtest Sour Cream', size: '500ml', price: 3.29, image: '🥄', availability: 'low_stock', points: 100 },
        ],
      },
      {
        name: 'Produce', emoji: '🥑',
        items: [
          { id: 26, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90 },
          { id: 27, name: 'Romaine Lettuce', size: 'each', price: 2.49, image: '🥬', availability: 'in_stock', points: 75 },
          { id: 28, name: 'Lime', size: 'each', price: 0.59, image: '🍋', availability: 'in_stock', points: 20 },
          { id: 29, name: 'Avocado', size: 'each', price: 1.99, image: '🥑', availability: 'in_stock', points: 60 },
        ],
      },
      {
        name: 'Pantry', emoji: '🫙',
        items: [
          { id: 30, name: 'Old El Paso Taco Seasoning', size: '24g', price: 1.99, image: '🌶️', availability: 'in_stock', points: 60 },
          { id: 31, name: 'Tostitos Medium Salsa', size: '423ml', price: 4.49, image: '🫙', availability: 'in_stock', points: 130 },
        ],
      },
    ],
  },
  'breakfast for the week': {
    query: 'breakfast for the week',
    interpretation: 'Weekly breakfast essentials',
    categories: [
      {
        name: 'Eggs & Dairy', emoji: '🥚',
        items: [
          { id: 40, name: 'PC Free Run Eggs', size: '12 pack', price: 4.99, image: '🥚', availability: 'in_stock', points: 150 },
          { id: 41, name: 'Neilson 2% Milk', size: '4L', price: 6.49, image: '🥛', availability: 'in_stock', points: 200 },
          { id: 42, name: 'PC Greek Yogurt Plain', size: '750g', price: 5.49, image: '🥛', availability: 'in_stock', points: 160 },
        ],
      },
      {
        name: 'Bread & Cereal', emoji: '🍞',
        items: [
          { id: 43, name: 'Wonder Bread White', size: '675g', price: 3.49, image: '🍞', availability: 'in_stock', points: 100 },
          { id: 44, name: 'Quaker Oats', size: '1kg', price: 5.99, image: '🥣', availability: 'in_stock', points: 175 },
        ],
      },
      {
        name: 'Fruit', emoji: '🍓',
        items: [
          { id: 45, name: 'Banana', size: '1 bunch', price: 0.69, image: '🍌', availability: 'in_stock', points: 25 },
          { id: 46, name: 'Blueberries', size: '312g', price: 4.99, image: '🫐', availability: 'in_stock', points: 150 },
          { id: 47, name: 'Strawberries', size: '454g', price: 5.49, image: '🍓', availability: 'low_stock', points: 160 },
        ],
      },
      {
        name: 'Spreads', emoji: '🧈',
        items: [
          { id: 48, name: 'Beatrice Butter Salted', size: '454g', price: 5.99, image: '🧈', availability: 'in_stock', points: 175 },
          { id: 49, name: 'Kraft Peanut Butter', size: '750g', price: 6.49, image: '🥜', availability: 'in_stock', points: 190 },
        ],
      },
    ],
  },
  'chicken stir fry': {
    query: 'chicken stir fry',
    interpretation: 'Stir fry dinner ingredients',
    categories: [
      {
        name: 'Protein', emoji: '🍗',
        items: [
          { id: 80, name: 'PC Chicken Breast Boneless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 },
        ],
      },
      {
        name: 'Vegetables', emoji: '🥦',
        items: [
          { id: 81, name: 'Broccoli', size: 'each', price: 2.99, image: '🥦', availability: 'in_stock', points: 90 },
          { id: 82, name: 'Red Bell Pepper', size: 'each', price: 1.99, image: '🫑', availability: 'in_stock', points: 60 },
          { id: 83, name: 'Snow Peas', size: '227g', price: 3.49, image: '🫛', availability: 'in_stock', points: 100 },
          { id: 84, name: 'Carrots', size: '2 lb bag', price: 2.49, image: '🥕', availability: 'in_stock', points: 75 },
        ],
      },
      {
        name: 'Sauce & Seasoning', emoji: '🫙',
        items: [
          { id: 85, name: 'VH Stir Fry Sauce', size: '355ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120 },
          { id: 86, name: 'Kikkoman Soy Sauce', size: '591ml', price: 4.49, image: '🍶', availability: 'in_stock', points: 130 },
        ],
      },
      {
        name: 'Rice & Noodles', emoji: '🍚',
        items: [
          { id: 87, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120 },
          { id: 88, name: 'PC Sesame Oil', size: '250ml', price: 4.99, image: '🫒', availability: 'in_stock', points: 150 },
        ],
      },
    ],
  },
};

// NLP trigger patterns
const aiTriggerPatterns = [
  'stuff for', 'ingredients for', 'things for', 'what do i need for',
  'make ', 'recipe for', 'dinner', 'lunch', 'breakfast', 'stir fry',
];

export function isAIQuery(query: string): boolean {
  const lower = query.toLowerCase().trim();
  return aiTriggerPatterns.some(p => lower.includes(p));
}

export function getAIResult(query: string): AISearchResult | null {
  const lower = query.toLowerCase().trim();
  for (const [key, result] of Object.entries(aiSearchResults)) {
    if (lower.includes(key) || key.includes(lower)) return result;
  }
  // Fuzzy match
  if (lower.includes('taco')) return aiSearchResults['stuff for tacos'];
  if (lower.includes('breakfast')) return aiSearchResults['breakfast for the week'];
  if (lower.includes('stir fry') || lower.includes('stirfry')) return aiSearchResults['chicken stir fry'];
  return null;
}

export function getSearchResult(query: string): { organic: Product[]; sponsored: Product[] } | null {
  const lower = query.toLowerCase().trim();
  for (const [key, result] of Object.entries(searchResults)) {
    if (lower.includes(key) || key.includes(lower)) return result;
  }
  // Fuzzy: search all products
  const allProducts = Object.values(searchResults).flatMap(r => [...r.organic, ...r.sponsored]);
  const matches = allProducts.filter(p => p.name.toLowerCase().includes(lower));
  if (matches.length > 0) {
    return { organic: matches.filter(p => !p.sponsored), sponsored: matches.filter(p => p.sponsored) };
  }
  return null;
}

// Cart item for checkout prototype
export const checkoutCartItems: Product[] = [
  { id: 1, name: 'Neilson 2% Milk', size: '4L', price: 6.49, image: '🥛', availability: 'in_stock', points: 200 },
  { id: 2, name: 'PC Free Run Eggs', size: '12 pack', price: 4.99, image: '🥚', availability: 'in_stock', points: 150 },
  { id: 3, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250 },
  { id: 7, name: 'Baby Spinach', size: '312g', price: 4.49, image: '🥬', availability: 'in_stock', points: 130 },
  { id: 5, name: 'Wonder Bread White', size: '675g', price: 3.49, image: '🍞', availability: 'in_stock', points: 100 },
  { id: 4, name: 'Banana', size: '1 bunch (~5)', price: 0.69, image: '🍌', availability: 'in_stock', points: 25 },
  { id: 8, name: 'PC Greek Yogurt Plain', size: '750g', price: 5.49, image: '🥄', availability: 'in_stock', points: 160 },
  { id: 6, name: 'Beatrice Butter Salted', size: '454g', price: 5.99, image: '🧈', availability: 'in_stock', points: 175 },
  { id: 9, name: 'Old El Paso Taco Shells', size: '12 pack', price: 3.99, image: '🌮', availability: 'in_stock', points: 120 },
  { id: 10, name: 'PC Shredded Tex-Mex Cheese', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160 },
  { id: 11, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90 },
  { id: 12, name: 'PC Chicken Breast Boneless Skinless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 },
];

export interface ValidationResult {
  itemId: number;
  status: 'clear' | 'warning' | 'blocker';
  reason?: string;
  type?: 'out_of_stock' | 'price_changed' | 'substitution_conflict';
  oldPrice?: number;
  newPrice?: number;
  substitutes?: Product[];
}

// ===== Meal Planning Agent Data =====

export interface MealIngredient {
  product: Product;
  quantity: number;
  unit: string;
  category: 'produce' | 'protein' | 'dairy' | 'pantry' | 'frozen' | 'bakery';
  sharedWith?: number[]; // meal indices this ingredient is shared with
}

export interface Meal {
  id: number;
  name: string;
  emoji: string;
  cuisine: string;
  prepTime: string;
  ingredients: MealIngredient[];
}

export interface MealPlan {
  meals: Meal[];
  people: number;
  totalCost: number;
  costPerPersonPerMeal: number;
  crossMealSavings: number;
  consolidatedItems: number;
  totalItems: number;
  totalPoints: number;
}

export const mealDatabase: Meal[] = [
  {
    id: 1, name: 'Taco Night', emoji: '🌮', cuisine: 'Mexican', prepTime: '25 min',
    ingredients: [
      { product: { id: 200, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250 }, quantity: 1, unit: 'pkg', category: 'protein' },
      { product: { id: 201, name: 'Old El Paso Taco Shells', size: '12 pack', price: 3.99, image: '🌮', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'box', category: 'pantry' },
      { product: { id: 202, name: 'PC Shredded Tex-Mex Cheese', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160 }, quantity: 1, unit: 'bag', category: 'dairy' },
      { product: { id: 203, name: 'Sour Cream', size: '500ml', price: 3.29, image: '🥄', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'tub', category: 'dairy' },
      { product: { id: 204, name: 'Yellow Onion', size: '3 lb bag', price: 3.49, image: '🧅', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'bag', category: 'produce', sharedWith: [2, 4] },
      { product: { id: 205, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90 }, quantity: 2, unit: 'lbs', category: 'produce', sharedWith: [3] },
      { product: { id: 206, name: 'Romaine Lettuce', size: 'each', price: 2.49, image: '🥬', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'head', category: 'produce' },
      { product: { id: 207, name: 'Old El Paso Taco Seasoning', size: '24g', price: 1.99, image: '🌶️', availability: 'in_stock', points: 60 }, quantity: 1, unit: 'pkt', category: 'pantry' },
    ],
  },
  {
    id: 2, name: 'Chicken Stir Fry', emoji: '🥘', cuisine: 'Asian', prepTime: '20 min',
    ingredients: [
      { product: { id: 210, name: 'PC Chicken Breast Boneless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 }, quantity: 0.5, unit: 'kg', category: 'protein' },
      { product: { id: 211, name: 'Broccoli', size: 'each', price: 2.99, image: '🥦', availability: 'in_stock', points: 90 }, quantity: 1, unit: 'head', category: 'produce' },
      { product: { id: 212, name: 'Red Bell Pepper', size: 'each', price: 1.99, image: '🫑', availability: 'in_stock', points: 60 }, quantity: 2, unit: 'each', category: 'produce' },
      { product: { id: 213, name: 'Snow Peas', size: '227g', price: 3.49, image: '🫛', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'bag', category: 'produce' },
      { product: { id: 214, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bag', category: 'pantry', sharedWith: [4] },
      { product: { id: 215, name: 'VH Stir Fry Sauce', size: '355ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bottle', category: 'pantry' },
      { product: { id: 216, name: 'Kikkoman Soy Sauce', size: '591ml', price: 4.49, image: '🍶', availability: 'in_stock', points: 130 }, quantity: 1, unit: 'bottle', category: 'pantry', sharedWith: [4] },
      { product: { id: 204, name: 'Yellow Onion', size: '3 lb bag', price: 3.49, image: '🧅', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'bag', category: 'produce', sharedWith: [0, 4] },
    ],
  },
  {
    id: 3, name: 'Pasta Bolognese', emoji: '🍝', cuisine: 'Italian', prepTime: '35 min',
    ingredients: [
      { product: { id: 220, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250 }, quantity: 1, unit: 'pkg', category: 'protein' },
      { product: { id: 221, name: 'Barilla Spaghetti', size: '454g', price: 2.49, image: '🍝', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'box', category: 'pantry' },
      { product: { id: 222, name: 'Classico Tomato Basil Sauce', size: '650ml', price: 3.99, image: '🫙', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'jar', category: 'pantry' },
      { product: { id: 223, name: 'Parmesan Cheese', size: '250g', price: 7.99, image: '🧀', availability: 'in_stock', points: 240 }, quantity: 1, unit: 'wedge', category: 'dairy' },
      { product: { id: 224, name: 'Garlic', size: '3 pack', price: 1.49, image: '🧄', availability: 'in_stock', points: 45 }, quantity: 1, unit: 'pack', category: 'produce', sharedWith: [4] },
      { product: { id: 205, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90 }, quantity: 1, unit: 'lb', category: 'produce', sharedWith: [0] },
    ],
  },
  {
    id: 4, name: 'Salmon & Veggies', emoji: '🐟', cuisine: 'Healthy', prepTime: '30 min',
    ingredients: [
      { product: { id: 230, name: 'Atlantic Salmon Fillets', size: '2 pack', price: 12.99, image: '🐟', availability: 'in_stock', points: 380 }, quantity: 1, unit: 'pack', category: 'protein' },
      { product: { id: 231, name: 'Asparagus', size: 'bunch', price: 3.99, image: '🌱', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bunch', category: 'produce' },
      { product: { id: 232, name: 'Sweet Potato', size: 'per lb', price: 1.99, image: '🍠', availability: 'in_stock', points: 60 }, quantity: 2, unit: 'lbs', category: 'produce' },
      { product: { id: 233, name: 'Lemon', size: 'each', price: 0.79, image: '🍋', availability: 'in_stock', points: 25 }, quantity: 2, unit: 'each', category: 'produce' },
      { product: { id: 234, name: 'Olive Oil', size: '500ml', price: 6.99, image: '🫒', availability: 'in_stock', points: 210 }, quantity: 1, unit: 'bottle', category: 'pantry' },
    ],
  },
  {
    id: 5, name: 'Fried Rice Bowl', emoji: '🍚', cuisine: 'Asian', prepTime: '15 min',
    ingredients: [
      { product: { id: 240, name: 'PC Free Run Eggs', size: '12 pack', price: 4.99, image: '🥚', availability: 'in_stock', points: 150 }, quantity: 1, unit: 'dozen', category: 'protein' },
      { product: { id: 241, name: 'Frozen Mixed Vegetables', size: '750g', price: 3.49, image: '🥕', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'bag', category: 'frozen' },
      { product: { id: 214, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bag', category: 'pantry', sharedWith: [1] },
      { product: { id: 216, name: 'Kikkoman Soy Sauce', size: '591ml', price: 4.49, image: '🍶', availability: 'in_stock', points: 130 }, quantity: 1, unit: 'bottle', category: 'pantry', sharedWith: [1] },
      { product: { id: 242, name: 'PC Sesame Oil', size: '250ml', price: 4.99, image: '🫒', availability: 'in_stock', points: 150 }, quantity: 1, unit: 'bottle', category: 'pantry' },
      { product: { id: 204, name: 'Yellow Onion', size: '3 lb bag', price: 3.49, image: '🧅', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'bag', category: 'produce', sharedWith: [0, 1] },
      { product: { id: 224, name: 'Garlic', size: '3 pack', price: 1.49, image: '🧄', availability: 'in_stock', points: 45 }, quantity: 1, unit: 'pack', category: 'produce', sharedWith: [2] },
    ],
  },
];

// Alternative meals for shuffle
export const altMeals: Meal[] = [
  {
    id: 6, name: 'Veggie Curry', emoji: '🍛', cuisine: 'Indian', prepTime: '30 min',
    ingredients: [
      { product: { id: 250, name: 'Chickpeas', size: '540ml can', price: 1.49, image: '🫘', availability: 'in_stock', points: 45 }, quantity: 2, unit: 'cans', category: 'pantry' },
      { product: { id: 251, name: 'Coconut Milk', size: '400ml', price: 2.49, image: '🥥', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'can', category: 'pantry' },
      { product: { id: 252, name: 'Patak\'s Curry Paste', size: '283ml', price: 4.99, image: '🌶️', availability: 'in_stock', points: 150 }, quantity: 1, unit: 'jar', category: 'pantry' },
      { product: { id: 253, name: 'Cauliflower', size: 'each', price: 3.99, image: '🥬', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'head', category: 'produce' },
      { product: { id: 254, name: 'Naan Bread', size: '4 pack', price: 3.99, image: '🫓', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'pack', category: 'bakery' },
      { product: { id: 214, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bag', category: 'pantry' },
    ],
  },
  {
    id: 7, name: 'Burgers & Fries', emoji: '🍔', cuisine: 'American', prepTime: '25 min',
    ingredients: [
      { product: { id: 260, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250 }, quantity: 1, unit: 'pkg', category: 'protein' },
      { product: { id: 261, name: 'Hamburger Buns', size: '8 pack', price: 3.49, image: '🍞', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'pack', category: 'bakery' },
      { product: { id: 262, name: 'Frozen French Fries', size: '1kg', price: 4.99, image: '🍟', availability: 'in_stock', points: 150 }, quantity: 1, unit: 'bag', category: 'frozen' },
      { product: { id: 263, name: 'Kraft Singles Cheese', size: '24 slices', price: 5.99, image: '🧀', availability: 'in_stock', points: 180 }, quantity: 1, unit: 'pack', category: 'dairy' },
      { product: { id: 205, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90 }, quantity: 1, unit: 'lb', category: 'produce' },
      { product: { id: 206, name: 'Romaine Lettuce', size: 'each', price: 2.49, image: '🥬', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'head', category: 'produce' },
    ],
  },
];

export function generateMealPlan(numMeals: number, numPeople: number): MealPlan {
  const selected = mealDatabase.slice(0, Math.min(numMeals, mealDatabase.length));
  const multiplier = numPeople / 2; // base recipes are for 2 people

  // Calculate cross-meal deduplication
  const productCounts = new Map<number, { count: number; product: Product; unit: string }>();
  let totalBeforeDedup = 0;
  let totalAfterDedup = 0;

  for (const meal of selected) {
    for (const ing of meal.ingredients) {
      const cost = ing.product.price * ing.quantity * multiplier;
      totalBeforeDedup += cost;
      const key = ing.product.id;
      const existing = productCounts.get(key);
      if (existing) {
        existing.count++;
      } else {
        productCounts.set(key, { count: 1, product: ing.product, unit: ing.unit });
      }
    }
  }

  // For shared items, you buy once (the bag/bottle covers all meals)
  let consolidatedItems = 0;
  for (const [, info] of productCounts) {
    if (info.count > 1) {
      totalAfterDedup += info.product.price; // buy one
      consolidatedItems++;
    } else {
      totalAfterDedup += info.product.price * multiplier;
    }
  }

  const savings = Math.max(0, Math.round((totalBeforeDedup - totalAfterDedup) * 100) / 100);
  const totalCost = Math.round(totalAfterDedup * 100) / 100;
  const totalItems = productCounts.size;
  const totalPoints = selected.reduce((sum, m) => sum + m.ingredients.reduce((s, i) => s + i.product.points, 0), 0);

  return {
    meals: selected,
    people: numPeople,
    totalCost,
    costPerPersonPerMeal: Math.round((totalCost / numPeople / selected.length) * 100) / 100,
    crossMealSavings: savings,
    consolidatedItems,
    totalItems,
    totalPoints,
  };
}

// ===== End Meal Planning Data =====

export const scenarioBValidation: ValidationResult[] = [
  {
    itemId: 12, status: 'blocker', reason: 'Out of stock at your store', type: 'out_of_stock',
    substitutes: [
      { id: 120, name: 'PC Chicken Thighs', size: 'per kg', price: 11.99, image: '🦵', availability: 'in_stock', points: 350 },
      { id: 121, name: 'Maple Leaf Chicken Breast Frozen', size: '700g', price: 12.49, image: '🧊', availability: 'in_stock', points: 370 },
      { id: 122, name: 'PC Blue Menu Chicken Strips', size: '600g', price: 13.99, image: '🥢', availability: 'low_stock', points: 420 },
    ],
  },
  {
    itemId: 9, status: 'blocker', reason: 'Out of stock at your store', type: 'out_of_stock',
    substitutes: [
      { id: 90, name: 'Old El Paso Flour Tortillas', size: '10 pack', price: 4.49, image: '🫓', availability: 'in_stock', points: 130 },
      { id: 91, name: "Dempster's Tortillas", size: '10 pack', price: 3.99, image: '🥙', availability: 'in_stock', points: 120 },
    ],
  },
  {
    itemId: 10, status: 'warning', reason: 'Price changed since you added this item', type: 'price_changed',
    oldPrice: 5.49, newPrice: 5.99,
  },
];
