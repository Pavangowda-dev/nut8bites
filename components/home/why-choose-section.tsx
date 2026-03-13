import { Zap, Leaf, Heart, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'High Protein Snacks',
    description: 'Energy-packed nutrition for active lifestyles',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Made without artificial additives or preservatives',
  },
  {
    icon: Heart,
    title: 'Healthy Snacking',
    description: 'Pure, clean snacks crafted for everyday wellness',
  },
  {
    icon: Sparkles,
    title: 'Energy Boosting',
    description: 'Sustain your energy throughout the day naturally',
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Why Choose Nut8Bites?
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Healthy snacking made simple with premium ingredients and natural nutrition.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="
                  p-4 md:p-6 rounded-2xl border border-gray-200 bg-white
                  shadow-sm hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm md:text-lg text-gray-900 mb-2 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}