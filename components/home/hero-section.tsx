import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Mobile Background */}
      <div className="md:hidden bg-gradient-to-br from-white via-amber-50 to-white py-16">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-600 opacity-5 rounded-full -mr-36 -mt-36"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-600 opacity-5 rounded-full -ml-28 -mb-28"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-xl">

            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Fuel Your Day With <span className="text-amber-600">Peanut Power</span>
            </h1>

            <p className="text-base text-gray-700 mb-3 leading-relaxed">
              Protein-packed peanut snacks made with natural ingredients.
            </p>

            <p className="text-base text-amber-700 font-medium italic mb-7">
              Taste the authentic flavor of Chintamani peanuts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#featured"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border-2 border-amber-600 text-amber-600 bg-white rounded-lg font-bold hover:bg-amber-50 transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Tablet Background */}
      <div
        className="hidden md:block lg:hidden relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/tablet-hero-banner.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">

            <h1 className="font-serif text-5xl font-bold text-white mb-6 leading-tight">
              Fuel Your Day With <span className="text-amber-300">Peanut Power</span>
            </h1>

            <p className="text-lg text-white/90 mb-3 leading-relaxed">
              Protein-packed peanut snacks made with natural ingredients.
            </p>

            <p className="text-lg text-amber-200 font-medium italic mb-8">
              Taste the authentic flavor of Chintamani peanuts.
            </p>

            <div className="flex gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#featured"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Desktop Background */}
      <div
        className="hidden lg:block relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/desktop-hero-banner.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-2xl">

            <h1 className="font-serif text-6xl font-bold text-white mb-6 leading-tight">
              Fuel Your Day With <span className="text-amber-300">Peanut Power</span>
            </h1>

            <p className="text-lg text-white/90 mb-3 leading-relaxed">
              Protein-packed peanut snacks made with natural ingredients.
            </p>

            <p className="text-lg text-amber-200 font-medium italic mb-8">
              Taste the authentic flavor of Chintamani peanuts.
            </p>

            <div className="flex gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#featured"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}