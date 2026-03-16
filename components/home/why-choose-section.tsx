import { Award, Flame, Microscope, Users } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Heritage Grade Peanuts',
    description:
      'Hand-picked and manually graded, organically sourced from premium Chintamani peanuts.',
  },
  {
    icon: Flame,
    title: 'Bold Roast Aroma',
    description:
      'Traditional wood-fired, hand-roasted peanuts that create a richer and more intense aroma.',
  },
  {
    icon: Microscope,
    title: 'Single-Origin Uniformity',
    description:
      'Research-backed evidence shows high oleic content and strong protein profiles.',
  },
  {
    icon: Users,
    title: 'Women-Led Business',
    description:
      'Created and developed by rural women, empowering local communities through every batch.',
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Nut8Bites?
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafted with authentic Chintamani peanuts, traditional roasting methods,
            and a commitment to quality, nutrition, and rural empowerment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="
                  group bg-white border border-amber-100 rounded-2xl
                  p-6 md:p-7 shadow-sm
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="
                  w-12 h-12 md:w-14 md:h-14
                  rounded-2xl bg-amber-100
                  flex items-center justify-center
                  mb-4
                  group-hover:bg-amber-600
                  transition-all duration-300
                ">
                  <Icon className="
                    w-6 h-6 md:w-7 md:h-7 text-amber-600
                    group-hover:text-white
                    transition-all duration-300
                  " />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-3 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
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