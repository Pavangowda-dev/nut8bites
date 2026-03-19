'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Products',
    items: [
      {
        question: 'What makes Nut8Bites products special?',
        answer:
          'Nut8Bites products are crafted using premium Chintamani peanuts, known for their rich taste, strong aroma, and natural nutritional value. Each batch is freshly prepared using carefully selected ingredients with no preservatives or artificial additives.',
      },
      {
        question: 'Are Nut8Bites products homemade?',
        answer:
          'Yes, our products are freshly prepared in small batches with a focus on hygiene, freshness, and traditional quality.',
      },
      {
        question: 'Do your products contain preservatives?',
        answer:
          'No. Nut8Bites products do not contain preservatives, artificial colors, or unnecessary additives.',
      },
      {
        question: 'Do Nut8Bites products contain allergens?',
        answer:
          'Yes. All our products contain peanuts. Some products may also include seeds such as sunflower seeds and other natural ingredients. Customers with peanut allergies should avoid consumption.',
      },
      {
        question: 'Are your products vegetarian?',
        answer:
          'Yes, all Nut8Bites products are 100% vegetarian and made using plant-based ingredients.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    items: [
      {
        question: 'How long does dispatch take?',
        answer:
          'Orders are usually freshly prepared, packed, and dispatched within 24 to 48 business hours after order confirmation.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Delivery usually takes 4 to 8 business days depending on your location and courier availability.',
      },
      {
        question: 'Which courier partners do you use?',
        answer:
          'We currently ship through DTDC and India Post depending on service availability for your location.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Shipping charges are calculated during checkout. Free shipping is currently not available.',
      },
      {
        question: 'Do you offer Cash on Delivery?',
        answer:
          'No. Nut8Bites currently accepts prepaid online payments only.',
      },
      {
        question: 'Do you ship outside India?',
        answer:
          'Currently, we ship only within India.',
      },
    ],
  },
  {
    category: 'Storage & Shelf Life',
    items: [
      {
        question: 'What is the shelf life of Nut8Bites products?',
        answer:
          'Most Nut8Bites products have an approximate shelf life of 4 months from the date of manufacture when stored properly.',
      },
      {
        question: 'How should I store peanut butter?',
        answer:
          'Store in a cool, dry place away from direct sunlight. Refrigeration is not necessary, but always keep the jar tightly closed after use.',
      },
      {
        question: 'Is oil separation normal in peanut butter?',
        answer:
          'Yes. Natural oil separation is completely normal in preservative-free peanut butter. Stir well before use.',
      },
      {
        question: 'Are products made fresh after order?',
        answer:
          'Yes. Our products are prepared in fresh batches after order confirmation to maintain freshness and quality.',
      },
    ],
  },
  {
    category: 'Nutrition & Ingredients',
    items: [
      {
        question: 'What ingredients are used in Nut8Bites peanut butter?',
        answer:
          'Our classic peanut butter is made using 100% roasted peanuts. Some variants may include seeds such as sunflower seeds and other natural seed blends.',
      },
      {
        question: 'Does Nut8Bites use sugar or jaggery?',
        answer:
          'No. Our peanut butter products do not contain added sugar, jaggery, or artificial sweeteners unless specifically mentioned.',
      },
      {
        question: 'Are Nut8Bites products protein-rich?',
        answer:
          'Yes. Peanuts are naturally rich in plant protein, healthy fats, and essential nutrients, making them suitable for healthy snacking and active lifestyles.',
      },
      {
        question: 'Are your products suitable for fitness-focused diets?',
        answer:
          'Yes. Nut8Bites products are popular among customers looking for natural protein-rich snack options.',
      },
    ],
  },
  {
    category: 'Refunds & Support',
    items: [
      {
        question: 'Can I return food products?',
        answer:
          'No. Due to food safety reasons, returns are not accepted once delivered.',
      },
      {
        question: 'When is a refund allowed?',
        answer:
          'Refunds are considered only for damaged products, leaked packaging, or incorrect items delivered.',
      },
      {
        question: 'Is unboxing video required for refund claims?',
        answer:
          'Yes. A complete unboxing video is mandatory for all refund requests.',
      },
      {
        question: 'Can I cancel my order?',
        answer:
          'Orders can only be cancelled before dispatch. Once shipped, cancellation is not possible.',
      },
      {
        question: 'How can I contact Nut8Bites support?',
        answer:
          'You can contact us through our contact page or email us at nut8bytes@gmail.com.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-amber-600 font-medium">FAQ</span>
            </nav>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-700">
                Everything you need to know about Nut8Bites products, freshness, delivery, and support.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-amber-600 rounded"></div>
                    {section.category}
                  </h2>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => {
                      const itemId = `${sectionIndex}-${itemIndex}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <div
                          key={itemId}
                          className="bg-white rounded-lg border border-gray-200 hover:border-amber-200 transition-all duration-300"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-amber-50 transition-colors"
                          >
                            <h3 className="font-serif font-bold text-gray-900 text-left">
                              {item.question}
                            </h3>
                            <ChevronDown
                              className={`w-5 h-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our team is happy to help with product details, delivery questions, and order support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-serif font-bold transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}