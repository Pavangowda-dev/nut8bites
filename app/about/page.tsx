import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Leaf, Heart, Zap, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Hero / Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-14">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About Nut8Bites
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed">
                We’re on a mission to bring the power of peanuts to modern healthy lifestyles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Story */}
              <div>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold">Welcome to Nut8Bites.</span>
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  I’m Shruthi, an MTech graduate and the founder of Nut8Bites, proudly from Chintamani,
                  a town well known for its premium quality peanuts.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  With a passion for healthy living and entrepreneurship, I chose to step away from my job
                  to follow my dream of building something meaningful.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Inspired by the rich taste and quality of Chintamani peanuts, Nut8Bites was born —
                  offering wholesome, protein-rich snacks crafted from carefully selected peanuts and natural ingredients.
                </p>

                <p className="text-lg text-amber-700 font-medium italic mt-6 pt-6 border-t border-gray-200">
                  Taste the authentic flavor of Chintamani peanuts.
                </p>
              </div>

              {/* Founder Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-100 rounded-3xl rotate-3"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/our-story.png"
                    alt="Founder of Nut8Bites"
                    width={600}
                    height={700}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>

                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-4">
                  Our Mission
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  To transform simple peanuts into delicious, protein-packed snacks that fuel your body naturally.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-amber-600" />
                </div>

                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-4">
                  Our Vision
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  To become a trusted healthy snacking brand rooted in natural ingredients and authentic taste.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  icon: Leaf,
                  title: 'Natural',
                  desc: 'Only natural ingredients, no artificial additives.',
                },
                {
                  icon: Heart,
                  title: 'Healthy',
                  desc: 'Crafted to support wellness and active lifestyles.',
                },
                {
                  icon: Zap,
                  title: 'Energizing',
                  desc: 'Protein-rich nutrition for daily energy.',
                },
                {
                  icon: Users,
                  title: 'Community',
                  desc: 'Built around trust and meaningful connections.',
                },
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the Peanut Power Movement
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Experience the difference that natural, premium peanut snacks can make.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-all duration-300"
            >
              Explore Our Products
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}