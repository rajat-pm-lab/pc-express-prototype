export type DietTag = 'veg' | 'non-veg' | 'vegan';

export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  image: string;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  points: number;
  sponsored?: boolean;
  diet?: DietTag;
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
          { id: 20, name: 'Lean Ground Beef', size: '450g', price: 7.99, image: '🥩', availability: 'in_stock', points: 250, diet: 'non-veg' },
          { id: 21, name: 'PC Seasoned Chicken Strips', size: '400g', price: 9.49, image: '🍗', availability: 'in_stock', points: 300, diet: 'non-veg' },
        ],
      },
      {
        name: 'Tortillas & Wraps', emoji: '🌮',
        items: [
          { id: 22, name: 'Old El Paso Taco Shells', size: '12 pack', price: 3.99, image: '🌮', availability: 'in_stock', points: 120, diet: 'vegan' },
          { id: 23, name: "Dempster's Flour Tortillas", size: '10 pack', price: 4.49, image: '🌮', availability: 'in_stock', points: 130, diet: 'vegan' },
        ],
      },
      {
        name: 'Dairy', emoji: '🧀',
        items: [
          { id: 24, name: 'PC Shredded Tex-Mex Cheese', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160, diet: 'veg' },
          { id: 25, name: 'Sealtest Sour Cream', size: '500ml', price: 3.29, image: '🥄', availability: 'low_stock', points: 100, diet: 'veg' },
        ],
      },
      {
        name: 'Produce', emoji: '🥑',
        items: [
          { id: 26, name: 'Tomatoes on the Vine', size: 'per lb', price: 2.99, image: '🍅', availability: 'in_stock', points: 90, diet: 'vegan' },
          { id: 27, name: 'Romaine Lettuce', size: 'each', price: 2.49, image: '🥬', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 28, name: 'Lime', size: 'each', price: 0.59, image: '🍋', availability: 'in_stock', points: 20, diet: 'vegan' },
          { id: 29, name: 'Avocado', size: 'each', price: 1.99, image: '🥑', availability: 'in_stock', points: 60, diet: 'vegan' },
        ],
      },
      {
        name: 'Pantry', emoji: '🫙',
        items: [
          { id: 30, name: 'Old El Paso Taco Seasoning', size: '24g', price: 1.99, image: '🌶️', availability: 'in_stock', points: 60, diet: 'vegan' },
          { id: 31, name: 'Tostitos Medium Salsa', size: '423ml', price: 4.49, image: '🫙', availability: 'in_stock', points: 130, diet: 'vegan' },
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
          { id: 40, name: 'PC Free Run Eggs', size: '12 pack', price: 4.99, image: '🥚', availability: 'in_stock', points: 150, diet: 'veg' },
          { id: 41, name: 'Neilson 2% Milk', size: '4L', price: 6.49, image: '🥛', availability: 'in_stock', points: 200, diet: 'veg' },
          { id: 42, name: 'PC Greek Yogurt Plain', size: '750g', price: 5.49, image: '🥛', availability: 'in_stock', points: 160, diet: 'veg' },
        ],
      },
      {
        name: 'Bread & Cereal', emoji: '🍞',
        items: [
          { id: 43, name: 'Wonder Bread White', size: '675g', price: 3.49, image: '🍞', availability: 'in_stock', points: 100, diet: 'veg' },
          { id: 44, name: 'Quaker Oats', size: '1kg', price: 5.99, image: '🥣', availability: 'in_stock', points: 175, diet: 'vegan' },
        ],
      },
      {
        name: 'Fruit', emoji: '🍓',
        items: [
          { id: 45, name: 'Banana', size: '1 bunch', price: 0.69, image: '🍌', availability: 'in_stock', points: 25, diet: 'vegan' },
          { id: 46, name: 'Blueberries', size: '312g', price: 4.99, image: '🫐', availability: 'in_stock', points: 150, diet: 'vegan' },
          { id: 47, name: 'Strawberries', size: '454g', price: 5.49, image: '🍓', availability: 'low_stock', points: 160, diet: 'vegan' },
        ],
      },
      {
        name: 'Spreads', emoji: '🧈',
        items: [
          { id: 48, name: 'Beatrice Butter Salted', size: '454g', price: 5.99, image: '🧈', availability: 'in_stock', points: 175, diet: 'veg' },
          { id: 49, name: 'Kraft Peanut Butter', size: '750g', price: 6.49, image: '🥜', availability: 'in_stock', points: 190, diet: 'vegan' },
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
          { id: 80, name: 'PC Chicken Breast Boneless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400, diet: 'non-veg' },
        ],
      },
      {
        name: 'Vegetables', emoji: '🥦',
        items: [
          { id: 81, name: 'Broccoli', size: 'each', price: 2.99, image: '🥦', availability: 'in_stock', points: 90, diet: 'vegan' },
          { id: 82, name: 'Red Bell Pepper', size: 'each', price: 1.99, image: '🫑', availability: 'in_stock', points: 60, diet: 'vegan' },
          { id: 83, name: 'Snow Peas', size: '227g', price: 3.49, image: '🫛', availability: 'in_stock', points: 100, diet: 'vegan' },
          { id: 84, name: 'Carrots', size: '2 lb bag', price: 2.49, image: '🥕', availability: 'in_stock', points: 75, diet: 'vegan' },
        ],
      },
      {
        name: 'Sauce & Seasoning', emoji: '🫙',
        items: [
          { id: 85, name: 'VH Stir Fry Sauce', size: '355ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120, diet: 'vegan' },
          { id: 86, name: 'Kikkoman Soy Sauce', size: '591ml', price: 4.49, image: '🍶', availability: 'in_stock', points: 130, diet: 'vegan' },
        ],
      },
      {
        name: 'Rice & Noodles', emoji: '🍚',
        items: [
          { id: 87, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120, diet: 'vegan' },
          { id: 88, name: 'PC Sesame Oil', size: '250ml', price: 4.99, image: '🫒', availability: 'in_stock', points: 150, diet: 'vegan' },
        ],
      },
    ],
  },
  'thai green curry': {
    query: 'thai green curry',
    interpretation: 'Thai green curry dinner',
    categories: [
      {
        name: 'Protein', emoji: '🍗',
        items: [
          { id: 300, name: 'PC Chicken Thighs Boneless', size: 'per kg', price: 11.99, image: '🦵', availability: 'in_stock', points: 350, diet: 'non-veg' },
        ],
      },
      {
        name: 'Curry Base', emoji: '🍛',
        items: [
          { id: 301, name: 'Thai Kitchen Green Curry Paste', size: '112g', price: 3.99, image: '🌶️', availability: 'in_stock', points: 120, diet: 'vegan' },
          { id: 302, name: 'Thai Kitchen Coconut Milk', size: '400ml', price: 2.49, image: '🥥', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 303, name: 'Fish Sauce', size: '200ml', price: 3.49, image: '🍶', availability: 'in_stock', points: 100, diet: 'non-veg' },
        ],
      },
      {
        name: 'Vegetables', emoji: '🥬',
        items: [
          { id: 304, name: 'Thai Basil', size: 'bunch', price: 2.49, image: '🌿', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 305, name: 'Red Bell Pepper', size: 'each', price: 1.99, image: '🫑', availability: 'in_stock', points: 60, diet: 'vegan' },
          { id: 306, name: 'Bamboo Shoots', size: '227g can', price: 1.99, image: '🎋', availability: 'in_stock', points: 60, diet: 'vegan' },
          { id: 307, name: 'Baby Bok Choy', size: '300g', price: 2.99, image: '🥬', availability: 'low_stock', points: 90, diet: 'vegan' },
        ],
      },
      {
        name: 'Rice', emoji: '🍚',
        items: [
          { id: 308, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120, diet: 'vegan' },
        ],
      },
    ],
  },
  'homemade pizza': {
    query: 'homemade pizza',
    interpretation: 'Pizza night ingredients',
    categories: [
      {
        name: 'Dough & Base', emoji: '🍕',
        items: [
          { id: 310, name: 'PC Pizza Dough', size: '450g', price: 3.49, image: '🍕', availability: 'in_stock', points: 100, diet: 'veg' },
          { id: 311, name: 'Classico Pizza Sauce', size: '396ml', price: 3.29, image: '🫙', availability: 'in_stock', points: 100, diet: 'vegan' },
        ],
      },
      {
        name: 'Cheese', emoji: '🧀',
        items: [
          { id: 312, name: 'PC Shredded Mozzarella', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160, diet: 'veg' },
          { id: 313, name: 'Parmesan Cheese Grated', size: '250g', price: 7.99, image: '🧀', availability: 'in_stock', points: 240, diet: 'veg' },
        ],
      },
      {
        name: 'Toppings', emoji: '🫒',
        items: [
          { id: 314, name: 'PC Pepperoni Sliced', size: '250g', price: 5.49, image: '🥓', availability: 'in_stock', points: 160, diet: 'non-veg' },
          { id: 315, name: 'Mushrooms White', size: '227g', price: 2.99, image: '🍄', availability: 'in_stock', points: 90, diet: 'vegan' },
          { id: 316, name: 'Green Bell Pepper', size: 'each', price: 1.49, image: '🫑', availability: 'in_stock', points: 45, diet: 'vegan' },
          { id: 317, name: 'Black Olives Sliced', size: '375ml', price: 2.99, image: '🫒', availability: 'in_stock', points: 90, diet: 'vegan' },
          { id: 318, name: 'Red Onion', size: 'each', price: 0.99, image: '🟣', availability: 'in_stock', points: 30, diet: 'vegan' },
        ],
      },
      {
        name: 'Extras', emoji: '🌿',
        items: [
          { id: 319, name: 'Fresh Basil', size: 'bunch', price: 2.49, image: '🌿', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 320, name: 'Olive Oil Extra Virgin', size: '500ml', price: 6.99, image: '🫒', availability: 'in_stock', points: 210, diet: 'vegan' },
        ],
      },
    ],
  },
  'red sauce pasta': {
    query: 'red sauce pasta',
    interpretation: 'Classic pasta with red sauce',
    categories: [
      {
        name: 'Pasta', emoji: '🍝',
        items: [
          { id: 330, name: 'Barilla Penne Rigate', size: '454g', price: 2.49, image: '🍝', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 331, name: 'Barilla Spaghetti', size: '454g', price: 2.49, image: '🍝', availability: 'in_stock', points: 75, diet: 'vegan' },
        ],
      },
      {
        name: 'Sauce', emoji: '🫙',
        items: [
          { id: 332, name: 'Classico Tomato Basil Sauce', size: '650ml', price: 3.99, image: '🫙', availability: 'in_stock', points: 120, diet: 'vegan' },
          { id: 333, name: 'Crushed Tomatoes', size: '796ml', price: 2.49, image: '🍅', availability: 'in_stock', points: 75, diet: 'vegan' },
        ],
      },
      {
        name: 'Produce', emoji: '🧄',
        items: [
          { id: 334, name: 'Garlic', size: '3 pack', price: 1.49, image: '🧄', availability: 'in_stock', points: 45, diet: 'vegan' },
          { id: 335, name: 'Fresh Basil', size: 'bunch', price: 2.49, image: '🌿', availability: 'in_stock', points: 75, diet: 'vegan' },
          { id: 336, name: 'Yellow Onion', size: 'each', price: 0.99, image: '🧅', availability: 'in_stock', points: 30, diet: 'vegan' },
        ],
      },
      {
        name: 'Dairy & Extras', emoji: '🧀',
        items: [
          { id: 337, name: 'Parmesan Cheese', size: '250g', price: 7.99, image: '🧀', availability: 'in_stock', points: 240, diet: 'veg' },
          { id: 338, name: 'Olive Oil Extra Virgin', size: '500ml', price: 6.99, image: '🫒', availability: 'in_stock', points: 210, diet: 'vegan' },
          { id: 339, name: 'PC Garlic Bread Frozen', size: '340g', price: 3.99, image: '🍞', availability: 'in_stock', points: 120, diet: 'veg' },
        ],
      },
    ],
  },
};

// Broken mode results — flat lists of irrelevant packaged products (mimics real Loblaws.ca)
export const brokenSearchResults: Record<string, Product[]> = {
  'thai green curry': [
    { id: 500, name: 'Thai Kitchen Green Curry Paste', size: '112g', price: 3.99, image: '🥫', availability: 'in_stock', points: 120 },
    { id: 501, name: 'PC Thai Green Curry Sauce', size: '350ml', price: 4.49, image: '🥫', availability: 'in_stock', points: 130 },
    { id: 502, name: 'Blue Dragon Green Curry Paste', size: '285g', price: 5.99, image: '🥫', availability: 'in_stock', points: 175 },
    { id: 503, name: "Patak's Thai Green Curry Simmer Sauce", size: '400ml', price: 4.99, image: '🥫', availability: 'in_stock', points: 150 },
    { id: 504, name: 'PC Thai Coconut Curry Soup', size: '540ml', price: 3.49, image: '🥫', availability: 'in_stock', points: 100 },
    { id: 505, name: 'Thai Kitchen Coconut Cream', size: '160ml', price: 2.99, image: '🥫', availability: 'in_stock', points: 90 },
    { id: 506, name: 'Blue Dragon Sweet Chili Sauce', size: '380ml', price: 4.49, image: '🥫', availability: 'low_stock', points: 130, sponsored: true },
    { id: 507, name: "Sharwood's Green Curry Cooking Sauce", size: '395g', price: 3.99, image: '🥫', availability: 'in_stock', points: 120 },
  ],
  'pizza': [
    { id: 510, name: 'Dr. Oetker Ristorante Pizza Pepperoni', size: '320g', price: 5.99, image: '🍕', availability: 'in_stock', points: 175, sponsored: true },
    { id: 511, name: 'Dr. Oetker Ristorante Mozzarella', size: '325g', price: 5.99, image: '🍕', availability: 'in_stock', points: 175 },
    { id: 512, name: 'Delissio Rising Crust Pepperoni', size: '788g', price: 8.49, image: '🍕', availability: 'in_stock', points: 250 },
    { id: 513, name: 'Dr. Oetker Casa di Mama Pizza', size: '395g', price: 6.49, image: '🍕', availability: 'in_stock', points: 190 },
    { id: 514, name: 'PC Thin Crust Margherita Pizza', size: '370g', price: 5.49, image: '🍕', availability: 'low_stock', points: 160, sponsored: true },
    { id: 515, name: 'Delissio Thin Crust Vegetable', size: '547g', price: 7.99, image: '🍕', availability: 'in_stock', points: 240 },
    { id: 516, name: "McCain's Pizza Pockets Pepperoni", size: '6 pack', price: 6.99, image: '🍕', availability: 'in_stock', points: 210 },
    { id: 517, name: 'Pillsbury Pizza Pops', size: '4 pack', price: 4.99, image: '🍕', availability: 'in_stock', points: 150 },
  ],
  'red sauce pasta': [
    { id: 520, name: 'Classico Tomato Basil Pasta Sauce', size: '650ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120 },
    { id: 521, name: "Ragu Traditional Sauce", size: '640ml', price: 3.49, image: '🥫', availability: 'in_stock', points: 100 },
    { id: 522, name: 'Prego Traditional Italian Sauce', size: '645ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120, sponsored: true },
    { id: 523, name: "Catelli Garden Select Tomato", size: '640ml', price: 3.29, image: '🥫', availability: 'in_stock', points: 100 },
    { id: 524, name: 'PC Roasted Garlic Pasta Sauce', size: '700ml', price: 4.49, image: '🥫', availability: 'in_stock', points: 130 },
    { id: 525, name: 'Classico Spicy Red Pepper Sauce', size: '650ml', price: 3.99, image: '🥫', availability: 'low_stock', points: 120, sponsored: true },
    { id: 526, name: "Hunt's Thick & Rich Pasta Sauce", size: '680ml', price: 2.99, image: '🥫', availability: 'in_stock', points: 90 },
    { id: 527, name: 'Bertolli Marinara Sauce', size: '680ml', price: 5.49, image: '🥫', availability: 'in_stock', points: 160 },
  ],
  'stuff for tacos': [
    { id: 530, name: 'Old El Paso Taco Shells Stand \'n Stuff', size: '10 pack', price: 4.49, image: '🌮', availability: 'in_stock', points: 130, sponsored: true },
    { id: 531, name: 'Old El Paso Hard Taco Shells', size: '12 pack', price: 3.99, image: '🌮', availability: 'in_stock', points: 120 },
    { id: 532, name: 'Old El Paso Soft Taco Kit', size: '8 pack', price: 5.49, image: '🌮', availability: 'in_stock', points: 160 },
    { id: 533, name: 'Old El Paso Taco Seasoning Mix', size: '24g', price: 1.99, image: '🌶️', availability: 'in_stock', points: 60 },
    { id: 534, name: 'PC Blue Menu Whole Wheat Tortillas', size: '10 pack', price: 4.29, image: '🌮', availability: 'in_stock', points: 125 },
    { id: 535, name: 'Old El Paso Refried Beans', size: '398ml', price: 2.49, image: '🥫', availability: 'low_stock', points: 75 },
    { id: 536, name: 'Tostitos Restaurant Style Tortilla Chips', size: '275g', price: 4.99, image: '🍟', availability: 'in_stock', points: 150, sponsored: true },
    { id: 537, name: 'Old El Paso Taco Sauce Medium', size: '200ml', price: 3.49, image: '🥫', availability: 'in_stock', points: 100 },
  ],
  'chicken stir fry': [
    { id: 540, name: 'PC Chicken Breast Boneless', size: 'per kg', price: 14.99, image: '🍗', availability: 'in_stock', points: 400 },
    { id: 541, name: 'VH Teriyaki Stir Fry Sauce', size: '355ml', price: 3.99, image: '🥫', availability: 'in_stock', points: 120, sponsored: true },
    { id: 542, name: 'VH Pad Thai Sauce', size: '341ml', price: 4.49, image: '🥫', availability: 'in_stock', points: 130 },
    { id: 543, name: 'Kikkoman Stir Fry Seasoning Mix', size: '28g', price: 1.99, image: '🥫', availability: 'in_stock', points: 60 },
    { id: 544, name: 'PC Chicken Thighs Boneless', size: 'per kg', price: 11.99, image: '🍗', availability: 'in_stock', points: 350 },
    { id: 545, name: 'PC Stir Fry Vegetable Blend Frozen', size: '500g', price: 3.99, image: '🥦', availability: 'in_stock', points: 120 },
    { id: 546, name: 'VH General Tao Sauce', size: '341ml', price: 3.99, image: '🥫', availability: 'low_stock', points: 120, sponsored: true },
    { id: 547, name: 'Blue Dragon Sweet Chili Stir Fry Sauce', size: '150ml', price: 3.49, image: '🥫', availability: 'in_stock', points: 100 },
  ],
  'breakfast': [
    { id: 550, name: 'Quaker Instant Oatmeal Variety Pack', size: '380g', price: 5.99, image: '🥣', availability: 'in_stock', points: 175, sponsored: true },
    { id: 551, name: 'Kellogg\'s Corn Flakes', size: '680g', price: 5.49, image: '🥣', availability: 'in_stock', points: 160 },
    { id: 552, name: "Nature's Path Organic Granola", size: '750g', price: 7.99, image: '🥣', availability: 'in_stock', points: 240 },
    { id: 553, name: 'General Mills Cheerios', size: '430g', price: 5.49, image: '🥣', availability: 'in_stock', points: 160 },
    { id: 554, name: 'PC Blue Menu Oat Bran Flakes', size: '425g', price: 4.99, image: '🥣', availability: 'in_stock', points: 150 },
    { id: 555, name: 'Kellogg\'s Special K Protein', size: '349g', price: 5.99, image: '🥣', availability: 'low_stock', points: 175 },
    { id: 556, name: 'Eggo Waffles Homestyle', size: '10 pack', price: 4.49, image: '🧇', availability: 'in_stock', points: 130, sponsored: true },
    { id: 557, name: 'Pop-Tarts Strawberry', size: '8 pack', price: 4.99, image: '🍓', availability: 'in_stock', points: 150 },
  ],
};

export function getBrokenResult(query: string): Product[] | null {
  const lower = query.toLowerCase().trim();
  for (const [key, results] of Object.entries(brokenSearchResults)) {
    if (lower.includes(key) || key.includes(lower)) return results;
  }
  if (lower.includes('taco')) return brokenSearchResults['stuff for tacos'];
  if (lower.includes('breakfast')) return brokenSearchResults['breakfast'];
  if (lower.includes('stir fry') || lower.includes('stirfry')) return brokenSearchResults['chicken stir fry'];
  if (lower.includes('thai') || lower.includes('green curry') || lower.includes('curry')) return brokenSearchResults['thai green curry'];
  if (lower.includes('pizza')) return brokenSearchResults['pizza'];
  if (lower.includes('red sauce') || lower.includes('pasta') || lower.includes('spaghetti') || lower.includes('penne')) return brokenSearchResults['red sauce pasta'];
  return null;
}

// NLP trigger patterns
const aiTriggerPatterns = [
  'stuff for', 'ingredients for', 'things for', 'what do i need for',
  'make ', 'recipe for', 'dinner', 'lunch', 'breakfast', 'stir fry',
  'curry', 'pizza', 'pasta', 'thai', 'red sauce',
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
  if (lower.includes('thai') || lower.includes('green curry') || lower.includes('curry')) return aiSearchResults['thai green curry'];
  if (lower.includes('pizza')) return aiSearchResults['homemade pizza'];
  if (lower.includes('red sauce') || lower.includes('pasta') || lower.includes('spaghetti') || lower.includes('penne')) return aiSearchResults['red sauce pasta'];
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
  {
    id: 8, name: 'Thai Green Curry', emoji: '🍛', cuisine: 'Thai', prepTime: '25 min',
    ingredients: [
      { product: { id: 300, name: 'PC Chicken Thighs Boneless', size: 'per kg', price: 11.99, image: '🦵', availability: 'in_stock', points: 350 }, quantity: 0.5, unit: 'kg', category: 'protein' },
      { product: { id: 301, name: 'Thai Kitchen Green Curry Paste', size: '112g', price: 3.99, image: '🌶️', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'jar', category: 'pantry' },
      { product: { id: 302, name: 'Thai Kitchen Coconut Milk', size: '400ml', price: 2.49, image: '🥥', availability: 'in_stock', points: 75 }, quantity: 2, unit: 'cans', category: 'pantry' },
      { product: { id: 307, name: 'Baby Bok Choy', size: '300g', price: 2.99, image: '🥬', availability: 'in_stock', points: 90 }, quantity: 1, unit: 'bag', category: 'produce' },
      { product: { id: 305, name: 'Red Bell Pepper', size: 'each', price: 1.99, image: '🫑', availability: 'in_stock', points: 60 }, quantity: 1, unit: 'each', category: 'produce' },
      { product: { id: 214, name: 'PC Jasmine Rice', size: '900g', price: 3.99, image: '🍚', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'bag', category: 'pantry' },
    ],
  },
  {
    id: 9, name: 'Homemade Pizza', emoji: '🍕', cuisine: 'Italian', prepTime: '30 min',
    ingredients: [
      { product: { id: 310, name: 'PC Pizza Dough', size: '450g', price: 3.49, image: '🍕', availability: 'in_stock', points: 100 }, quantity: 2, unit: 'pkg', category: 'bakery' },
      { product: { id: 311, name: 'Classico Pizza Sauce', size: '396ml', price: 3.29, image: '🫙', availability: 'in_stock', points: 100 }, quantity: 1, unit: 'jar', category: 'pantry' },
      { product: { id: 312, name: 'PC Shredded Mozzarella', size: '320g', price: 5.49, image: '🧀', availability: 'in_stock', points: 160 }, quantity: 2, unit: 'bags', category: 'dairy' },
      { product: { id: 314, name: 'PC Pepperoni Sliced', size: '250g', price: 5.49, image: '🥓', availability: 'in_stock', points: 160 }, quantity: 1, unit: 'pkg', category: 'protein' },
      { product: { id: 315, name: 'Mushrooms White', size: '227g', price: 2.99, image: '🍄', availability: 'in_stock', points: 90 }, quantity: 1, unit: 'pkg', category: 'produce' },
      { product: { id: 319, name: 'Fresh Basil', size: 'bunch', price: 2.49, image: '🌿', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'bunch', category: 'produce' },
    ],
  },
  {
    id: 10, name: 'Red Sauce Pasta', emoji: '🍝', cuisine: 'Italian', prepTime: '20 min',
    ingredients: [
      { product: { id: 331, name: 'Barilla Spaghetti', size: '454g', price: 2.49, image: '🍝', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'box', category: 'pantry' },
      { product: { id: 332, name: 'Classico Tomato Basil Sauce', size: '650ml', price: 3.99, image: '🫙', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'jar', category: 'pantry' },
      { product: { id: 337, name: 'Parmesan Cheese', size: '250g', price: 7.99, image: '🧀', availability: 'in_stock', points: 240 }, quantity: 1, unit: 'wedge', category: 'dairy' },
      { product: { id: 334, name: 'Garlic', size: '3 pack', price: 1.49, image: '🧄', availability: 'in_stock', points: 45 }, quantity: 1, unit: 'pack', category: 'produce' },
      { product: { id: 335, name: 'Fresh Basil', size: 'bunch', price: 2.49, image: '🌿', availability: 'in_stock', points: 75 }, quantity: 1, unit: 'bunch', category: 'produce' },
      { product: { id: 339, name: 'PC Garlic Bread Frozen', size: '340g', price: 3.99, image: '🍞', availability: 'in_stock', points: 120 }, quantity: 1, unit: 'box', category: 'frozen' },
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
