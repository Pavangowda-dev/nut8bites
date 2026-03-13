import { Zap, Heart, Sparkles } from 'lucide-react'

export function PeanutPowerSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Power of Peanuts
            </h2>

            <div className="space-y-5">

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900">Rich in Protein</h3>
                  <p className="text-gray-600">10g+ protein per serving for muscle recovery</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900">Healthy Fats</h3>
                  <p className="text-gray-600">Monounsaturated fats for heart health</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900">Energy Boosting</h3>
                  <p className="text-gray-600">Sustained energy for active lifestyle</p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-amber-600 rounded-3xl p-12 text-white shadow-xl">
            <div className="text-7xl font-serif font-bold mb-4">8g+</div>

            <p className="text-xl font-medium mb-6">
              Protein per serving across our products
            </p>

            <p className="text-amber-100">
              Carefully crafted with premium peanuts to deliver maximum nutrition.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}