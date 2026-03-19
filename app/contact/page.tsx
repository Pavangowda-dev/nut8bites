'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
    ])

    if (!error) {
      setSubmitted(true)

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } else {
      alert('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We’d love to hear from you. Reach out for product questions, order support, or feedback.
              </p>
            </div>

          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              <div className="order-1 lg:order-1 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">

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
                      disabled={loading}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>

                  </form>
                )}
              </div>

              <div className="order-2 lg:order-2 space-y-6">

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
                        Chat directly with us for quick support and order assistance.
                      </p>

                      <a
                        href="https://wa.me/919902714771"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-5 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>

                  </div>
                </div>

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