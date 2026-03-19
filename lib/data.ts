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
    name: 'Super Seeds Peanut Butter',
    description:
      'Roasted peanut butter with sunflower seeds, pumpkin seeds, chia seeds, melon seeds, and raisins for added texture, taste, and nutrition.',
    shortDescription: 'Roasted peanut butter enriched with super seeds and raisins.',
    prices: {
      '500 g': 300,
      '1 kg': 600,
    },
    image: '/images/Product-images/super-seeds.png',
    category: 'Peanut Butter',
    tags: ['protein', 'natural', 'seeds', 'crunchy'],
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
    name: 'Crunchy Peanut Butter',
    description:
      'Pure crunchy peanut butter made from 100% roasted peanuts with no unnecessary additives.',
    shortDescription: 'Pure crunchy peanut butter.',
    prices: {
      '500 g': 250,
      '1 kg': 500,
    },
    image: '/images/Product-images/crunchy.png',
    category: 'Peanut Butter',
    tags: ['crunchy', 'natural', 'classic'],
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
    name: 'Peanut Chikki Bites',
    description:
      'Traditional jaggery-based peanut chikki crafted into bite-sized crunchy snacks that deliver authentic homemade taste.',
    shortDescription: 'Traditional bite-sized peanut chikki.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/chikki.png',
    category: 'Snacks',
    tags: ['chikki', 'traditional', 'crispy'],
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
    name: 'Green kadalebeeja',
    description:
      'A flavorful traditional peanut snack seasoned with fresh green chilli and curry leaves.',
    shortDescription: 'Traditional green chilli peanut snack.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/green-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['green', 'roasted', 'spicy'],
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
    name: 'Red kadalebeeja',
    description:
      'A spicy roasted peanut snack prepared with red chilli and cumin for bold flavor.',
    shortDescription: 'Spicy roasted red peanut snack.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/red-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['red', 'roasted', 'spicy'],
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
    name: 'Salt Roasted Peanuts',
    description:
      'Classic roasted peanuts lightly seasoned with sea salt for a simple and crunchy snack.',
    shortDescription: 'Salt roasted peanuts.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/Salted-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['salted', 'roasted'],
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
    name: 'Peanut Energy Ladoo',
    description:
      'Nutritious energy ladoos made with peanuts, dates, seeds, and dry fruits for natural energy.',
    shortDescription: 'Nutritious energy ladoos.',
    prices: {
      '250 g': 150,
      '500 g': 300,
    },
    image: '/images/Product-images/laddoo.png',
    category: 'Energy Snacks',
    tags: ['energy', 'ladoo'],
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