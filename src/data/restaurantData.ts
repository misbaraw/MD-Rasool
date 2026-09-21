import { MenuItem, Review, SeatingArea } from '../types';

export const RESTAURANT_INFO = {
  name: "Artisan Kitchen & Hearth",
  tagline: "Wood-Fired Seasonal Dining & Craft Cellar",
  address: "452 Market Street, San Francisco, CA 94105",
  neighborhood: "Financial District / SoMa",
  phone: "(415) 555-0198",
  email: "reservations@artisankitchensf.com",
  executiveChef: "Marco Valenti",
  established: 2018,
  priceRange: "$$$",
  dressCode: "Smart Casual",
  valetParking: "Available Friday & Saturday evenings ($15)",
  openingHours: [
    { day: "Monday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:00 PM" },
    { day: "Tuesday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:00 PM" },
    { day: "Wednesday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:00 PM" },
    { day: "Thursday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 10:30 PM" },
    { day: "Friday", lunch: "11:30 AM – 2:30 PM", dinner: "5:00 PM – 11:00 PM" },
    { day: "Saturday", brunch: "10:30 AM – 2:30 PM", dinner: "5:00 PM – 11:00 PM" },
    { day: "Sunday", brunch: "10:30 AM – 3:00 PM", dinner: "4:30 PM – 9:30 PM" }
  ],
  happyHour: "Tuesday – Friday: 4:00 PM – 6:00 PM (Bar & Patio)",
  awards: [
    "Michelin Guide Recommended (2023, 2024, 2025)",
    "Wine Spectator Award of Excellence (Best of Award)",
    "San Francisco Chronicle Top 100 Bay Area Dining"
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Charred Heirloom Burrata',
    category: 'starters',
    description: 'Fresh Point Reyes burrata with blistered mission figs, aged balsamic glaze, wild arugula, and toasted sourdough levain from our wood hearth.',
    price: 21,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian', 'chef-pick'],
    calories: 420,
    prepTimeMinutes: 12,
    pairing: 'Sancerre Blanc, Domaine Vacheron 2022',
    ingredients: ['Point Reyes Burrata', 'Mission Figs', '25-Year Modena Balsamic', 'Wild Arugula', 'Wood-Fired Levain'],
    allergens: ['Dairy', 'Gluten'],
    isPopular: true
  },
  {
    id: 'starter-2',
    name: 'Wood-Smoked Hamachi Crudo',
    category: 'starters',
    description: 'Sashimi-grade Pacific yellowtail lightly smoked over applewood, yuzu kosho vinaigrette, pickled shallots, sea grapes, and crisp lotus root.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free', 'chef-pick'],
    calories: 280,
    prepTimeMinutes: 10,
    pairing: 'Riesling Trocken, Peter Lauer 2021',
    ingredients: ['Pacific Hamachi', 'Yuzu Kosho', 'Shallots', 'Avocado Puree', 'Sea Grapes'],
    allergens: ['Fish']
  },
  {
    id: 'starter-3',
    name: 'Cast Iron Hearth Polenta',
    category: 'starters',
    description: 'Slow-cooked organic stoneground corn polenta, roasted wild chanterelle mushrooms, fonduta of Taleggio cheese, and fried thyme.',
    price: 19,
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian', 'gluten-free'],
    calories: 380,
    prepTimeMinutes: 14,
    pairing: 'Barbera d’Alba, Massolino 2020',
    ingredients: ['Organic Cornmeal', 'Wild Chanterelles', 'Taleggio DOP', 'Garlic Confit', 'Fresh Thyme'],
    allergens: ['Dairy']
  },
  {
    id: 'starter-4',
    name: 'Fire-Roasted Spanish Octopus',
    category: 'starters',
    description: 'Tender Galician octopus char-grilled over embers, fingerling potato confit, smoked pimentón emulsion, caperberries, and lemon oil.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free'],
    calories: 340,
    prepTimeMinutes: 15,
    pairing: 'Albariño, Do Ferreiro 2022',
    ingredients: ['Galician Octopus', 'Fingerling Potatoes', 'Smoked Pimentón', 'Caperberries', 'Meyer Lemon'],
    allergens: ['Molluscs'],
    isPopular: true
  },

  // Wood-Fired Mains
  {
    id: 'main-1',
    name: 'Prime Dry-Aged Ribeye (16oz)',
    category: 'mains',
    description: '45-day dry-aged USDA Prime beef cooked over California white oak, bone marrow butter, roasted baby garlic, and charred spring onions.',
    price: 64,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free', 'chef-pick'],
    calories: 890,
    prepTimeMinutes: 22,
    pairing: 'Cabernet Sauvignon, Stag’s Leap Napa 2019',
    ingredients: ['45-Day Dry-Aged Beef', 'Bone Marrow', 'Organic Butter', 'Fire-Roasted Garlic', 'Maldon Sea Salt'],
    allergens: ['Dairy'],
    isPopular: true
  },
  {
    id: 'main-2',
    name: 'Crisp Skin Pacific Black Cod',
    category: 'mains',
    description: 'Sustainably caught black cod in a rich white miso dashi broth, charred bok choy, maitake mushrooms, and crisp ginger tuile.',
    price: 44,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free'],
    calories: 520,
    prepTimeMinutes: 18,
    pairing: 'Chardonnay, Kistler Sonoma Coast 2021',
    ingredients: ['Pacific Black Cod', 'White Miso', 'Dashi', 'Maitake Mushrooms', 'Ginger'],
    allergens: ['Fish', 'Soy']
  },
  {
    id: 'main-3',
    name: 'Wood-Roasted Sonoma Duck Breast',
    category: 'mains',
    description: 'Liberty Farms duck breast with honey-lavender glaze, parsnip velvet puree, caramelized black plums, and natural duck jus.',
    price: 42,
    image: 'https://images.unsplash.com/photo-1514944298352-f4728f328906?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free', 'chef-pick'],
    calories: 680,
    prepTimeMinutes: 20,
    pairing: 'Pinot Noir, Goldeneye Anderson Valley 2020',
    ingredients: ['Liberty Duck Breast', 'Local Wild Honey', 'Culinary Lavender', 'Parsnip', 'Santa Rosa Plums']
  },
  {
    id: 'main-4',
    name: 'Hearth-Baked Cauliflower Steak',
    category: 'mains',
    description: 'Whole-roasted Romanesco cauliflower spiced with Moroccan dukkah, green tahini sauce, pomegranate arils, and crispy chickpeas.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegan', 'gluten-free', 'organic'],
    calories: 390,
    prepTimeMinutes: 16,
    pairing: 'Syrah, Domaine Gramenon Côtes du Rhône 2021',
    ingredients: ['Romanesco Cauliflower', 'Sesame Tahini', 'House Dukkah', 'Pomegranate', 'Chickpeas'],
    allergens: ['Sesame']
  },

  // Pastas
  {
    id: 'pasta-1',
    name: 'Handcrafted Truffle Tagliolini',
    category: 'pastas',
    description: 'Daily extruded 40-yolk pasta tossed in cultured French butter, 24-month aged Parmigiano-Reggiano, and fresh black Norcia truffle shavings.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian', 'chef-pick'],
    calories: 610,
    prepTimeMinutes: 15,
    pairing: 'Barolo, Vietti Castiglione 2018',
    ingredients: ['Semolina & Egg Yolk Pasta', 'Black Truffle', 'Parmigiano-Reggiano DOP', 'Normandy Butter'],
    allergens: ['Egg', 'Gluten', 'Dairy'],
    isPopular: true
  },
  {
    id: 'pasta-2',
    name: 'Braised Wild Boar Pappardelle',
    category: 'pastas',
    description: 'Wide ribbons of pasta with 12-hour braised wild boar ragù, Chianti wine reduction, juniper berries, and shaved Pecorino Romano.',
    price: 33,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    dietary: [],
    calories: 720,
    prepTimeMinutes: 16,
    pairing: 'Brunello di Montalcino, Il Poggione 2017',
    ingredients: ['House Pappardelle', 'Wild Boar Shoulder', 'Chianti Classico', 'Juniper', 'Pecorino'],
    allergens: ['Egg', 'Gluten', 'Dairy']
  },
  {
    id: 'pasta-3',
    name: 'Sweet Corn & Ricotta Agnolotti',
    category: 'pastas',
    description: 'Pillows of fresh pasta filled with roasted Brentwood sweet corn and sheep milk ricotta, brown butter sauce, crispy sage, and chanterelles.',
    price: 31,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian'],
    calories: 540,
    prepTimeMinutes: 14,
    pairing: 'Friulano, Schiopetto 2021',
    ingredients: ['Brentwood Corn', 'Sheep Milk Ricotta', 'Brown Butter', 'Crisp Sage', 'Pine Nuts'],
    allergens: ['Egg', 'Gluten', 'Dairy', 'Nuts']
  },

  // Chef's Specials
  {
    id: 'special-1',
    name: 'Wood-Fired Whole Branzino',
    category: 'specials',
    description: 'Whole Mediterranean sea bass roasted inside our hearth with wild fennel fronds, Meyer lemon, salsa verde, and castelvetrano olives.',
    price: 52,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free', 'chef-pick'],
    calories: 590,
    prepTimeMinutes: 24,
    pairing: 'Etna Bianco, Benanti 2021',
    ingredients: ['Whole Sea Bass', 'Wild Fennel', 'Meyer Lemon', 'Castelvetrano Olives', 'Italian Parsley'],
    allergens: ['Fish'],
    isPopular: true
  },
  {
    id: 'special-2',
    name: 'Heritage Porchetta & Spiced Quince',
    category: 'specials',
    description: 'Slow-roasted Berkshire pork belly stuffed with rosemary, garlic, and fennel pollen, with crispy crackling skin, braised Swiss chard, and spiced quince mostarda.',
    price: 39,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free'],
    calories: 780,
    prepTimeMinutes: 18,
    pairing: 'Amarone della Valpolicella, Tedeschi 2018',
    ingredients: ['Berkshire Pork', 'Fennel Pollen', 'Rosemary Confit', 'Rainbow Chard', 'Quince']
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Smoked Vanilla Bean Panna Cotta',
    category: 'desserts',
    description: 'Tahitian vanilla bean panna cotta infused with light wood smoke, passion fruit curd, roasted almond crumble, and mint blossoms.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian', 'gluten-free', 'chef-pick'],
    calories: 340,
    prepTimeMinutes: 8,
    pairing: 'Château d’Yquem Sauternes 2016',
    ingredients: ['Tahitian Vanilla', 'Organic Cream', 'Passion Fruit', 'Almonds', 'Mint'],
    allergens: ['Dairy', 'Nuts'],
    isPopular: true
  },
  {
    id: 'dessert-2',
    name: 'Hearth-Baked Warm Chocolate Torta',
    category: 'desserts',
    description: 'Single-origin 72% Valrhona dark chocolate cake with molten center, house-spun espresso gelato, and fleur de sel caramel.',
    price: 16,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian'],
    calories: 460,
    prepTimeMinutes: 12,
    pairing: 'Tawny Port 20 Year, Quinta do Noval',
    ingredients: ['Valrhona Dark Chocolate', 'Espresso Gelato', 'Sea Salt Caramel', 'European Butter'],
    allergens: ['Dairy', 'Egg', 'Gluten']
  },
  {
    id: 'dessert-3',
    name: 'Olive Oil & Meyer Lemon Cake',
    category: 'desserts',
    description: 'Napa Valley extra virgin olive oil sponge, candied lemon zest, whipped mascarpone, and blackberry coulis.',
    price: 14,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegetarian'],
    calories: 380,
    prepTimeMinutes: 8,
    pairing: 'Moscato d’Asti, Saracco 2022',
    ingredients: ['Extra Virgin Olive Oil', 'Meyer Lemon', 'Mascarpone', 'Wild Blackberries'],
    allergens: ['Dairy', 'Egg', 'Gluten']
  },

  // Craft Cocktails & Drinks
  {
    id: 'drink-1',
    name: 'The Smoked Rosemary Old Fashioned',
    category: 'drinks',
    description: 'WhistlePig 10-Year Rye, charred rosemary syrup, angostura & orange bitters, expressed orange peel, smoked under a cloche at table.',
    price: 19,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegan', 'gluten-free', 'chef-pick'],
    prepTimeMinutes: 5,
    ingredients: ['WhistlePig Rye', 'Demerara', 'Bitters', 'Torched Rosemary', 'Orange Oil'],
    isPopular: true
  },
  {
    id: 'drink-2',
    name: 'Blood Orange & Thyme Botanical Spritz',
    category: 'drinks',
    description: 'Nonino Aperitivo, fresh Sicilian blood orange juice, garden thyme, prosecco superiore, and sparkling mineral water.',
    price: 17,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegan', 'gluten-free'],
    prepTimeMinutes: 4,
    ingredients: ['Nonino Aperitivo', 'Blood Orange', 'Garden Thyme', 'Prosecco', 'Fever-Tree Soda']
  },
  {
    id: 'drink-3',
    name: 'Clarified Milk Punch & Calvados',
    category: 'drinks',
    description: 'Christian Drouin Calvados, spiced chai tea, fresh pineapple, lemon, clarified through organic whole milk for crystalline silky texture.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    dietary: ['gluten-free'],
    prepTimeMinutes: 4,
    ingredients: ['Calvados', 'Chai Spices', 'Pineapple', 'Milk Clarification', 'Clear Ice'],
    allergens: ['Dairy']
  },
  {
    id: 'drink-4',
    name: 'Garden Botanist (Zero-Proof Mocktail)',
    category: 'drinks',
    description: 'Seedlip Spice 94 distilled non-alcoholic spirit, pressed cucumber, fresh basil elixir, lime cordial, and elderflower tonic.',
    price: 13,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
    dietary: ['vegan', 'gluten-free'],
    prepTimeMinutes: 4,
    ingredients: ['Seedlip Spice 94', 'Cucumber Juice', 'Sweet Basil', 'Lime Cordial', 'Elderflower Tonic']
  }
];

export const SEATING_OPTIONS: { id: SeatingArea; name: string; description: string; tag: string }[] = [
  {
    id: 'main-dining',
    name: 'Main Dining Room',
    description: 'Spacious leather banquettes under exposed timber beams with warm ambient candlelight.',
    tag: 'Classic'
  },
  {
    id: 'hearth-counter',
    name: 'Hearth & Chef’s Counter',
    description: 'Front-row seats directly overlooking our 800° white oak wood hearth and culinary prep.',
    tag: 'Immersive'
  },
  {
    id: 'patio-garden',
    name: 'Heated Garden Terrace',
    description: 'Enclosed botanical patio with overhead heaters, lush greenery, and soft acoustic jazz.',
    tag: 'Atmospheric'
  },
  {
    id: 'wine-cellar',
    name: 'Sommelier Wine Vault',
    description: 'Intimate vaulted stone room surrounded by our reserve collection of vintage wines.',
    tag: 'Exclusive'
  }
];

export const TIME_SLOTS = [
  { time: '11:30 AM', period: 'lunch', popular: false },
  { time: '12:00 PM', period: 'lunch', popular: true },
  { time: '12:30 PM', period: 'lunch', popular: true },
  { time: '1:00 PM', period: 'lunch', popular: false },
  { time: '1:30 PM', period: 'lunch', popular: false },
  { time: '5:00 PM', period: 'dinner', popular: false },
  { time: '5:30 PM', period: 'dinner', popular: false },
  { time: '6:00 PM', period: 'dinner', popular: true },
  { time: '6:30 PM', period: 'dinner', popular: true },
  { time: '7:00 PM', period: 'dinner', popular: true },
  { time: '7:30 PM', period: 'dinner', popular: true },
  { time: '8:00 PM', period: 'dinner', popular: true },
  { time: '8:30 PM', period: 'dinner', popular: false },
  { time: '9:00 PM', period: 'dinner', popular: false },
  { time: '9:30 PM', period: 'dinner', popular: false },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    location: 'San Francisco, CA',
    rating: 5,
    date: 'Last week',
    title: 'The Truffle Tagliolini is unforgettable',
    comment: 'Sat at the Chef’s Hearth Counter for our 10th anniversary. Watching the culinary team work with open fire was mesmerizing. The dry-aged ribeye and pasta are genuinely world-class.',
    dishRecommended: 'Handcrafted Truffle Tagliolini',
    verifiedGuest: true
  },
  {
    id: 'rev-2',
    author: 'Marcus Chen',
    location: 'Oakland, CA',
    rating: 5,
    date: '2 weeks ago',
    title: 'Wine list is among the best in the city',
    comment: 'The sommelier paired our charred octopus and whole branzino with spectacular Sicilian white wines. Remarkable service from start to finish without any pretentiousness.',
    dishRecommended: 'Wood-Fired Whole Branzino',
    verifiedGuest: true
  },
  {
    id: 'rev-3',
    author: 'Sophia Rossi',
    location: 'New York, NY',
    rating: 5,
    date: '1 month ago',
    title: 'Best wood-fired dining in Northern California',
    comment: 'Every single plate had depth and intention. The heirloom burrata with blistered figs was pure perfection, and the smoked old fashioned had my entire table talking.',
    dishRecommended: 'Charred Heirloom Burrata',
    verifiedGuest: true
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    title: "California White Oak Hearth",
    subtitle: "800° Living Flame",
    description: "Every main course and charred starter touches genuine oak embers. The flame coaxes natural sugars, smoky depth, and crisp textures that gas ranges simply cannot replicate."
  },
  {
    title: "Regenerative Farm Partners",
    subtitle: "Zero-Mile Produce",
    description: "We partner directly with Star Route Farms, Point Reyes Cheese, and Capay Valley Organic growers. Our menu shifts seamlessly with micro-seasons."
  },
  {
    title: "Low-Intervention Wine Vault",
    subtitle: "320+ Curated Labels",
    description: "Focusing on biodynamic vineyards, small-batch Mediterranean producers, and iconic California heritage vintages thoughtfully cellared at 55°."
  }
];
