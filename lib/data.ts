export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  prices: Record<string, number>
  image: string
  category: string
  tags: string[]
  ingredients: string[]
  packSizes: string[]
  nutrition: {
    nutrient: string
    value: string
  }[]
  storage: string
  isBestSeller?: boolean
  rating: number
  reviews: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  category: string
}

export const products: Product[] = [
  {
    id: 'super-seeds-pb',
    name: 'Super Seeds Peanut Butter | High Protein Natural Peanut Butter',
    description:
      'Buy homemade super seeds peanut butter made with premium roasted peanuts, sunflower seeds, pumpkin seeds, chia seeds, melon seeds, and raisins. No preservatives, no additives. A healthy high-protein peanut butter made fresh in Karnataka, India.',
    shortDescription:
      'High protein peanut butter with super seeds. No preservatives.',
    prices: {
      '500 g': 300,
      '1 kg': 600,
    },
    image: '/images/Product-images/super-seeds.png',
    category: 'Peanut Butter',
    tags: [
      'homemade peanut butter',
      'high protein peanut butter',
      'natural peanut butter India',
      'no preservatives',
      'healthy peanut butter',
    ],
    ingredients: [
      'Roasted Peanuts',
      'Sunflower Seeds',
      'Pumpkin Seeds',
      'Chia Seeds',
      'Melon Seeds',
      'Raisins',
    ],
    packSizes: ['500 g', '1 kg'],
    nutrition: [
      { nutrient: 'Protein', value: '8g / 2 tbsp' },
      { nutrient: 'Fat', value: '16g / 2 tbsp' },
      { nutrient: 'Carbohydrates', value: '5g / 2 tbsp' },
      { nutrient: 'Fiber', value: '2g / 2 tbsp' },
      { nutrient: 'Energy', value: '190 kcal / 2 tbsp' },
    ],
    storage: 'Store in a cool dry place. Refrigerate after opening.',
    isBestSeller: true,
    rating: 4.8,
    reviews: 156,
  },

  {
    id: 'crunchy-pb',
    name: 'Crunchy Peanut Butter | 100% Natural No Preservatives',
    description:
      'Buy crunchy peanut butter made from 100% roasted peanuts with no preservatives or additives. Freshly made natural peanut butter in India, perfect for protein intake, gym diet, and healthy lifestyle.',
    shortDescription:
      '100% natural crunchy peanut butter with no preservatives.',
    prices: {
      '500 g': 250,
      '1 kg': 500,
    },
    image: '/images/Product-images/crunchy.png',
    category: 'Peanut Butter',
    tags: [
      'crunchy peanut butter',
      'natural peanut butter',
      'no preservatives peanut butter',
      'protein food',
      'healthy snacks India',
    ],
    ingredients: ['100% Roasted Peanuts'],
    packSizes: ['500 g', '1 kg'],
    nutrition: [
      { nutrient: 'Protein', value: '8g / 2 tbsp' },
      { nutrient: 'Fat', value: '15g / 2 tbsp' },
      { nutrient: 'Carbohydrates', value: '4g / 2 tbsp' },
      { nutrient: 'Fiber', value: '2g / 2 tbsp' },
      { nutrient: 'Energy', value: '180 kcal / 2 tbsp' },
    ],
    storage: 'Store in a cool dry place. Refrigerate after opening.',
    isBestSeller: true,
    rating: 4.7,
    reviews: 203,
  },

  {
    id: 'peanut-chikki',
    name: 'Peanut Chikki Bites | Jaggery Healthy Snack',
    description:
      'Traditional peanut chikki made with jaggery and roasted peanuts. A healthy Indian snack with natural sweetness, no refined sugar, and no preservatives. Perfect for energy and daily snacking.',
    shortDescription:
      'Healthy jaggery peanut chikki with no preservatives.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/chikki.png',
    category: 'Snacks',
    tags: [
      'peanut chikki',
      'jaggery snacks',
      'healthy Indian snacks',
      'natural sweets',
      'energy snacks',
    ],
    ingredients: [
      'Roasted Peanuts',
      'Jaggery',
      'Sesame Seeds',
      'Mixed Seeds',
    ],
    packSizes: ['250 g', '500 g'],
    nutrition: [
      { nutrient: 'Protein', value: '8g / 30g' },
      { nutrient: 'Fat', value: '12g / 30g' },
      { nutrient: 'Carbohydrates', value: '18g / 30g' },
      { nutrient: 'Fiber', value: '2g / 30g' },
      { nutrient: 'Energy', value: '210 kcal / 30g' },
    ],
    storage: 'Store airtight in a cool dry place.',
    rating: 4.6,
    reviews: 89,
  },

  {
    id: 'green-kadalebeeja',
    name: 'Green Chilli Peanuts | Spicy Roasted Peanuts',
    description:
      'Spicy roasted peanuts flavored with fresh green chilli and curry leaves. A traditional Karnataka snack made fresh with no preservatives. Perfect crunchy snack for spice lovers.',
    shortDescription:
      'Spicy green chilli roasted peanuts.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/green-peanut.png',
    category: 'Roasted Peanuts',
    tags: [
      'spicy peanuts',
      'green chilli peanuts',
      'roasted peanuts India',
      'healthy snacks',
      'no preservatives snacks',
    ],
    ingredients: [
      'Roasted Peanuts',
      'Fresh Green Chilli Paste',
      'Salt',
      'Curry Leaves',
    ],
    packSizes: ['250 g', '500 g'],
    nutrition: [
      { nutrient: 'Protein', value: '10g / 30g' },
      { nutrient: 'Fat', value: '14g / 30g' },
      { nutrient: 'Carbohydrates', value: '8g / 30g' },
      { nutrient: 'Fiber', value: '3g / 30g' },
      { nutrient: 'Energy', value: '220 kcal / 30g' },
    ],
    storage: 'Keep airtight in cool dry place.',
    isBestSeller: true,
    rating: 4.8,
    reviews: 134,
  },

  {
    id: 'red-kadalebeeja',
    name: 'Spicy Red Chilli Peanuts | Roasted Peanut Snack',
    description:
      'Roasted peanuts seasoned with red chilli and cumin for bold spicy flavor. A traditional Indian snack with no preservatives, perfect for evening cravings.',
    shortDescription:
      'Spicy red chilli roasted peanuts.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/red-peanut.png',
    category: 'Roasted Peanuts',
    tags: [
      'red chilli peanuts',
      'spicy peanuts India',
      'roasted peanut snacks',
      'healthy snacks',
      'evening snacks',
    ],
    ingredients: [
      'Roasted Peanuts',
      'Red Chilli Powder',
      'Salt',
      'Cumin',
    ],
    packSizes: ['250 g', '500 g'],
    nutrition: [
      { nutrient: 'Protein', value: '10g / 30g' },
      { nutrient: 'Fat', value: '14g / 30g' },
      { nutrient: 'Carbohydrates', value: '8g / 30g' },
      { nutrient: 'Fiber', value: '3g / 30g' },
      { nutrient: 'Energy', value: '220 kcal / 30g' },
    ],
    storage: 'Keep airtight in cool dry place.',
    rating: 4.6,
    reviews: 112,
  },

  {
    id: 'salt-roasted-kadalebeeja',
    name: 'Salted Roasted Peanuts | Classic Healthy Snack',
    description:
      'Classic salted roasted peanuts made with premium quality peanuts and sea salt. A simple, healthy, and protein-rich snack with no preservatives.',
    shortDescription:
      'Classic salted roasted peanuts.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/Salted-peanut.png',
    category: 'Roasted Peanuts',
    tags: [
      'salted peanuts',
      'roasted peanuts',
      'healthy snacks India',
      'protein snacks',
      'natural snacks',
    ],
    ingredients: ['Roasted Peanuts', 'Sea Salt'],
    packSizes: ['250 g', '500 g'],
    nutrition: [
      { nutrient: 'Protein', value: '10g / 30g' },
      { nutrient: 'Fat', value: '14g / 30g' },
      { nutrient: 'Carbohydrates', value: '8g / 30g' },
      { nutrient: 'Fiber', value: '3g / 30g' },
      { nutrient: 'Energy', value: '220 kcal / 30g' },
    ],
    storage: 'Keep airtight in cool dry place.',
    rating: 4.7,
    reviews: 167,
  },

  {
    id: 'peanut-energy-ladoo',
    name: 'Peanut Energy Ladoo | Natural Protein Energy Balls',
    description:
      'Healthy peanut energy ladoos made with peanuts, dates, seeds, and dry fruits. No refined sugar, no preservatives. A perfect natural energy snack for gym, travel, and daily nutrition.',
    shortDescription:
      'Natural peanut energy ladoos with no preservatives.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/laddoo.png',
    category: 'Energy Snacks',
    tags: [
      'energy ladoo',
      'protein snacks India',
      'healthy sweets',
      'natural energy balls',
      'no sugar snacks',
    ],
    ingredients: [
      'Roasted Peanuts',
      'Dates',
      'Cardamom',
      'Sesame Seeds',
      'Pumpkin Seeds',
      'Melon Seeds',
      'Sunflower Seeds',
      'Almonds',
    ],
    packSizes: ['250 g', '500 g'],
    nutrition: [
      { nutrient: 'Protein', value: '8g / ladoo' },
      { nutrient: 'Fat', value: '12g / ladoo' },
      { nutrient: 'Carbohydrates', value: '22g / ladoo' },
      { nutrient: 'Fiber', value: '2g / ladoo' },
      { nutrient: 'Energy', value: '250 kcal / ladoo' },
    ],
    storage: 'Keep airtight in cool place.',
    isBestSeller: true,
    rating: 4.9,
    reviews: 178,
  },
]