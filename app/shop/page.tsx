import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShopClient from './ShopClient'

/* 🔥 SEO METADATA FOR SHOP PAGE */
export const metadata: Metadata = {
  title: 'Buy Peanut Butter & Healthy Peanut Snacks Online | Nut8Bites',
  description:
    'Shop homemade peanut butter and healthy peanut snacks online in India. No preservatives, high protein, fresh and natural. Order Nut8Bites now.',
  keywords: [
    'buy peanut butter online India',
    'healthy peanut snacks',
    'protein snacks India',
    'natural peanut butter',
    'no preservatives peanut butter',
    'peanut snacks online',
    'Nut8Bites products',
  ],
  openGraph: {
    title: 'Buy Peanut Butter & Healthy Snacks | Nut8Bites',
    description:
      'Shop fresh peanut butter and natural snacks made in Karnataka.',
    url: 'https://nut8bites.com/shop',
    siteName: 'Nut8Bites',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading products...</div>}>
      <ShopClient />
    </Suspense>
  )
}