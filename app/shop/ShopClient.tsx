'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'
import { ChevronDown } from 'lucide-react'

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest'

export default function ShopClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const categories = [...new Set(products.map((p) => p.category))]

  const getBasePrice = (product: (typeof products)[number]) => {
    return product.prices[product.packSizes[0]] || 0
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      )
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => getBasePrice(a) - getBasePrice(b))
        break
      case 'price-high':
        result.sort((a, b) => getBasePrice(b) - getBasePrice(a))
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
  }, [selectedCategory, sortBy, searchQuery])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* 🔥 STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: filteredAndSortedProducts.map((product, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: product.name,
              })),
            }),
          }}
        />

        <section className="bg-white py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Buy Peanut Butter & Healthy Snacks Online
            </h1>

            <p className="text-lg text-gray-600">
              Fresh, homemade peanut butter and natural peanut snacks with no preservatives.
            </p>

            {searchQuery && (
              <p className="text-sm text-amber-600 mt-3">
                Search results for "{searchQuery}"
              </p>
            )}

          </div>
        </section>

        <section className="py-10 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-24 border border-gray-200 shadow-sm">

                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Category
                  </h3>

                  <div className="space-y-2">

                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-4 py-2 rounded-lg ${
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
                        className={`block w-full text-left px-4 py-2 rounded-lg ${
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

                <div className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between gap-4 border border-gray-200 shadow-sm">

                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
                  </p>

                  <div className="flex gap-3">

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="popular">Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>

                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}