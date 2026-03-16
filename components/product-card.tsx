'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  const [isAdded, setIsAdded] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const defaultPack = product.packSizes[0]
  const defaultPrice = product.prices[defaultPack]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, 1)
    setIsAdded(true)

    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block h-full"
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">

        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {product.isBestSeller && (
            <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              Best Seller
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">

          <div className="mb-2">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
              {product.category}
            </p>

            <h3 className="font-semibold text-gray-900 text-base mt-1 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <span className="text-xs text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Price + Pack Size */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-bold text-gray-900">
                ₹{defaultPrice}
              </span>

              <span className="text-sm text-gray-400 line-through">
                ₹{Math.round(defaultPrice * 1.2)}
              </span>

              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                15% OFF
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {defaultPack}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-blue-600 text-white'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdded ? 'In Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={handleWishlist}
              className={`py-2.5 px-3 rounded-lg transition-all duration-300 ${
                inWishlist
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

          </div>

          {/* View Details */}
          <div className="mt-3 text-center text-sm font-medium text-amber-600 group-hover:text-amber-700 transition-colors">
            View Details
          </div>

        </div>
      </div>
    </Link>
  )
}