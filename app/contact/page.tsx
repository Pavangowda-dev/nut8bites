'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Form submitted:', formData)

    setSubmitted(true)

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-14">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We’d love to hear from you. Reach out for questions, support, or feedback.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'nut8bites@gmail.com',
                  link: 'mailto:nut8bites@gmail.com',
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  value: '+91 9901475158',
                  link: 'tel:+919901475158',
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  value: 'India-wide shipping available',
                },
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={index}
                    className="p-7 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{item.value}</p>
                    )}
                  </div>
                )
              })}

            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">

                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Thank You!
                    </h3>

                    <p className="text-gray-600">
                      We’ve received your message and will get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="inquiry">Product Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="order">Order Related</option>
                      <option value="bulk">Bulk Orders</option>
                    </select>

                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Send Message
                    </button>

                  </form>
                )}
              </div>

              {/* Right Info */}
              <div className="space-y-6">

                {/* WhatsApp */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        WhatsApp Support
                      </h3>

                      <p className="text-gray-600 mb-4">
                        Chat directly with us for quick support and product assistance.
                      </p>

                      <a
                        href="https://wa.me/919901475158"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-5 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>

                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Business Hours
                  </h3>

                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    We usually respond within 24 hours.
                  </p>
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