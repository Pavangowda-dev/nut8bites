'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useCart } from '@/lib/cart-context'
import { Heart, ArrowRight } from 'lucide-react'

export default function WishlistPage() {
  const { wishlist } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <Heart className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Add your favorite peanut snacks to save them for later!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-serif font-bold hover:opacity-90 transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-amber-600 font-medium">Wishlist</span>
            </nav>
          </div>
        </div>

        {/* Wishlist Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 mb-12">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
