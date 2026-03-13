import { testimonials } from '@/lib/data'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Our Community
          </h2>

          <p className="text-lg text-gray-600">
            See what our customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                p-7 md:p-8 rounded-2xl border border-gray-200 bg-white
                shadow-sm hover:shadow-xl hover:-translate-y-1
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
                <div className="w-11 h-11 rounded-full bg-amber-600 flex items-center justify-center text-white font-semibold">
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