const testimonials = [
  {
    id: '1',
    name: 'Priya Singh',
    message:
      'Nut8Bites has become my favorite healthy snack. The quality, freshness, and authentic taste are excellent.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Rahul Patel',
    message:
      'Very fresh products and excellent peanut flavor. The roasted varieties are especially addictive.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Anjali Mehta',
    message:
      'Perfect for daily snacking. It feels natural, premium, and much healthier than packaged snacks.',
    rating: 4,
  },
  {
    id: '4',
    name: 'Vikram Kumar',
    message:
      'The peanut butter quality is outstanding and tastes genuinely homemade.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Our Community
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from customers who enjoy Nut8Bites every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                bg-white border border-amber-100 rounded-2xl
                p-6 md:p-8 shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < testimonial.rating
                        ? 'text-amber-400 text-lg'
                        : 'text-gray-300 text-lg'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 leading-relaxed mb-6 text-[15px] md:text-base">
                "{testimonial.message}"
              </p>

              {/* Customer */}
              <div className="flex items-center gap-3">
                <div className="
                  w-11 h-11 rounded-full bg-amber-600
                  flex items-center justify-center
                  text-white font-semibold
                ">
                  {testimonial.name[0]}
                </div>

                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}