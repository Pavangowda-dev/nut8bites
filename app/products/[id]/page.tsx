'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RefreshCw,
} from 'lucide-react'

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params)

  const product = products.find((p) => p.id === resolvedParams.id)

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart()

  const [quantity, setQuantity] = useState(1)

  const [activeTab, setActiveTab] = useState<
    'description' | 'ingredients' | 'nutrition' | 'reviews'
  >('description')

  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>

            <Link href="/shop" className="text-amber-600 font-medium">
              Back to Shop
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Product Detail */}
        <section className="py-10 md:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

              {/* Product Image */}
              <div>
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={700}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div>

                <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
                  {product.category}
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-gray-600 text-sm">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>

                    <span className="text-xl text-gray-400 line-through">
                      ₹{Math.round(product.price * 1.2)}
                    </span>

                    <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                      15% OFF
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quantity + Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">

                  <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-lg"
                    >
                      −
                    </button>

                    <div className="px-5 py-3 border-x border-gray-200 font-medium">
                      {quantity}
                    </div>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAdded
                        ? 'bg-green-600'
                        : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={handleWishlist}
                    className={`px-5 py-3 rounded-lg transition-all ${
                      inWishlist
                        ? 'bg-red-50 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>

                </div>

                {/* Trust */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">

                  {[
                    {
                      icon: Truck,
                      title: 'Free Shipping',
                      text: 'Above ₹499',
                    },
                    {
                      icon: Shield,
                      title: 'Secure Payment',
                      text: 'Safe checkout',
                    },
                    {
                      icon: RefreshCw,
                      title: 'Easy Returns',
                      text: 'Simple support',
                    },
                  ].map((item, index) => {
                    const Icon = item.icon

                    return (
                      <div key={index} className="text-center">
                        <Icon className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.text}</p>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              <div className="flex overflow-x-auto border-b">
                {['description', 'ingredients', 'nutrition', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-5 py-4 font-medium capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-amber-600 border-b-2 border-amber-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">

                {activeTab === 'description' && (
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {activeTab === 'ingredients' && (
                  <ul className="space-y-3">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 bg-amber-600 rounded-full" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-4 rounded-xl bg-amber-50 border border-amber-100"
                      >
                        <p className="text-sm text-gray-600 capitalize">{key}</p>
                        <p className="font-semibold text-amber-700">{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-6 text-gray-600">
                    Customer reviews coming soon.
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-14 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Related Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}