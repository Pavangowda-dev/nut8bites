import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-4">
            Most Popular
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best Seller Collection
          </h2>

          <p className="text-lg text-gray-600">
            Customer favorites — tried, tested, and loved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}