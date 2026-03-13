export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  image: string
  category: string
  tags: string[]
  ingredients: string[]
  nutrition: {
    protein: string
    fat: string
    carbs: string
    fiber: string
    energy: string
  }
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

export interface Testimonial {
  id: string
  name: string
  message: string
  rating: number
  image: string
}

export const products: Product[] = [
  {
    id: 'super-seeds-pb',
    name: 'Super Seeds Peanut Butter',
    description:
      'A creamy peanut butter enriched with nutrient-dense super seeds to deliver balanced protein, healthy fats, and sustained energy throughout the day.',
    shortDescription: 'Creamy peanut butter blended with super seeds.',
    price: 549,
    image: '/images/Product-images/super-seeds.png',
    category: 'Peanut Butter',
    tags: ['protein', 'natural', 'seeds', 'creamy'],
    ingredients: [
      'Roasted Peanuts',
      'Sunflower Seeds',
      'Pumpkin Seeds',
      'Sea Salt',
      'Honey',
    ],
    nutrition: {
      protein: '8g / 2 tbsp',
      fat: '16g / 2 tbsp',
      carbs: '5g / 2 tbsp',
      fiber: '2g / 2 tbsp',
      energy: '190 kcal / 2 tbsp',
    },
    storage: 'Store in a cool dry place. Refrigerate after opening.',
    isBestSeller: true,
    rating: 4.8,
    reviews: 156,
  },

  {
    id: 'crunchy-pb',
    name: 'Crunchy Peanut Butter',
    description:
      'Classic crunchy peanut butter made from roasted peanuts with natural texture and rich flavor, ideal for breakfast and snacking.',
    shortDescription: 'Classic crunchy peanut butter.',
    price: 449,
    image: '/images/Product-images/crunchy.png',
    category: 'Peanut Butter',
    tags: ['crunchy', 'natural', 'classic'],
    ingredients: ['Roasted Peanuts', 'Sea Salt', 'Palm Oil'],
    nutrition: {
      protein: '7g / 2 tbsp',
      fat: '15g / 2 tbsp',
      carbs: '4g / 2 tbsp',
      fiber: '2g / 2 tbsp',
      energy: '180 kcal / 2 tbsp',
    },
    storage: 'Store in a cool dry place. Refrigerate after opening.',
    isBestSeller: true,
    rating: 4.7,
    reviews: 203,
  },

  {
    id: 'peanut-chikki',
    name: 'Peanut Chikki Bites',
    description:
      'Traditional jaggery-based peanut chikki crafted into bite-sized crunchy snacks with authentic taste.',
    shortDescription: 'Traditional bite-sized peanut chikki.',
    price: 299,
    image: '/images/Product-images/chikki.png',
    category: 'Snacks',
    tags: ['chikki', 'traditional', 'crispy'],
    ingredients: ['Roasted Peanuts', 'Jaggery', 'Ghee', 'Sesame Seeds'],
    nutrition: {
      protein: '6g / 30g',
      fat: '12g / 30g',
      carbs: '18g / 30g',
      fiber: '2g / 30g',
      energy: '210 kcal / 30g',
    },
    storage: 'Store airtight in a cool dry place.',
    rating: 4.6,
    reviews: 89,
  },

  {
    id: 'green-kadlebeja',
    name: 'Green Kadlebeja',
    description:
      'Premium roasted green peanuts with high protein and natural flavor, ideal for healthy snacking.',
    shortDescription: 'Premium roasted green peanuts.',
    price: 379,
    image: '/images/Product-images/green-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['green', 'roasted', 'protein'],
    ingredients: ['Green Peanuts', 'Sea Salt'],
    nutrition: {
      protein: '10g / 30g',
      fat: '14g / 30g',
      carbs: '8g / 30g',
      fiber: '3g / 30g',
      energy: '220 kcal / 30g',
    },
    storage: 'Keep airtight in cool dry place.',
    isBestSeller: true,
    rating: 4.8,
    reviews: 134,
  },

  {
    id: 'salt-roasted-kadlebeja',
    name: 'Salt Roasted Kadlebeja',
    description:
      'Lightly salted roasted peanuts for everyday natural snacking and clean energy.',
    shortDescription: 'Salt roasted peanuts.',
    price: 329,
    image: '/images/Product-images/Salted-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['salted', 'roasted'],
    ingredients: ['Roasted Peanuts', 'Sea Salt'],
    nutrition: {
      protein: '10g / 30g',
      fat: '14g / 30g',
      carbs: '8g / 30g',
      fiber: '3g / 30g',
      energy: '220 kcal / 30g',
    },
    storage: 'Keep airtight in cool dry place.',
    rating: 4.7,
    reviews: 167,
  },

  {
    id: 'red-kadlebeja',
    name: 'Red Kadlebeja',
    description:
      'Roasted red peanuts delivering authentic traditional flavor with balanced nutrition.',
    shortDescription: 'Roasted red peanuts.',
    price: 349,
    image: '/images/Product-images/red-peanut.png',
    category: 'Roasted Peanuts',
    tags: ['red', 'roasted'],
    ingredients: ['Red Peanuts', 'Sea Salt'],
    nutrition: {
      protein: '10g / 30g',
      fat: '14g / 30g',
      carbs: '8g / 30g',
      fiber: '3g / 30g',
      energy: '220 kcal / 30g',
    },
    storage: 'Keep airtight in cool dry place.',
    rating: 4.6,
    reviews: 112,
  },

  {
    id: 'peanut-energy-ladoo',
    name: 'Peanut Energy Ladoo',
    description:
      'Energy-rich peanut ladoos crafted with jaggery and natural ingredients, ideal pre or post workout.',
    shortDescription: 'Energy-rich peanut ladoo.',
    price: 399,
    image: '/images/Product-images/laddoo.png',
    category: 'Energy Snacks',
    tags: ['energy', 'ladoo'],
    ingredients: ['Roasted Peanuts', 'Jaggery', 'Dates', 'Coconut'],
    nutrition: {
      protein: '7g / ladoo',
      fat: '12g / ladoo',
      carbs: '22g / ladoo',
      fiber: '2g / ladoo',
      energy: '250 kcal / ladoo',
    },
    storage: 'Keep airtight in cool place.',
    isBestSeller: true,
    rating: 4.9,
    reviews: 178,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Singh',
    message:
      'Nut8Bites has become my favorite healthy snack. The quality and taste are excellent.',
    rating: 5,
    image: '/images/testimonials/user1.png',
  },
  {
    id: '2',
    name: 'Rahul Patel',
    message:
      'Very fresh products and excellent peanut flavor. Highly recommended.',
    rating: 5,
    image: '/images/testimonials/user2.png',
  },
  {
    id: '3',
    name: 'Anjali Mehta',
    message:
      'Perfect for daily snacking and feels very natural compared to market snacks.',
    rating: 4,
    image: '/images/testimonials/user3.png',
  },
  {
    id: '4',
    name: 'Vikram Kumar',
    message:
      'The roasted peanuts are excellent quality and very addictive.',
    rating: 5,
    image: '/images/testimonials/user4.png',
  },
]