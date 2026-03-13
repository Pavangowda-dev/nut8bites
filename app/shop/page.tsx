'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'
import { ChevronDown } from 'lucide-react'

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.reverse()
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [selectedCategory, sortBy])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Page Title */}
        <section className="bg-white py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Our Products
            </h1>

            <p className="text-lg text-gray-600">
              Discover our complete range of premium peanut snacks
            </p>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-10 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar Desktop */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-24 border border-gray-200 shadow-sm">

                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Category
                  </h3>

                  <div className="space-y-2">

                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === null
                          ? 'bg-amber-100 text-amber-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All Products
                    </button>

                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-amber-100 text-amber-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}

                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="lg:col-span-3">

                {/* Top Controls */}
                <div className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 shadow-sm">

                  <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold">
                      {filteredAndSortedProducts.length}
                    </span>{' '}
                    products
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">

                    {/* Mobile Category Dropdown */}
                    <div className="relative lg:hidden">
                      <select
                        value={selectedCategory || ''}
                        onChange={(e) =>
                          setSelectedCategory(e.target.value || null)
                        }
                        className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium"
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>

                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium"
                      >
                        <option value="popular">Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                      </select>

                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                  </div>
                </div>

                {/* Product Grid */}
                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                      No Products Found
                    </h3>

                    <p className="text-gray-600 mb-6">
                      Try adjusting category filters.
                    </p>

                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all duration-300"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}