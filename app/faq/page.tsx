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
        question: 'What are the key ingredients in Nut8Bites products?',
        answer:
          'Our products are made with premium roasted peanuts, natural spices, jaggery, and seeds. We use only natural ingredients with no artificial additives or preservatives.',
      },
      {
        question: 'Are Nut8Bites products suitable for vegetarians?',
        answer:
          'Yes, all Nut8Bites products are 100% vegetarian. They are made from plant-based ingredients and are perfect for vegetarian diets.',
      },
      {
        question: 'Do your products contain allergens?',
        answer:
          'All Nut8Bites products contain peanuts. They may also contain traces of other nuts and sesame. Please check the packaging for detailed allergen information.',
      },
      {
        question: 'How much protein is in each Nut8Bites product?',
        answer:
          'Our products contain 8-10g of protein per serving, making them excellent for post-workout recovery and sustained energy.',
      },
      {
        question: 'Are Nut8Bites products sugar-free?',
        answer:
          'Most products contain natural sugars from jaggery. We do not use refined sugar or artificial sweeteners. Check individual product nutrition labels for details.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    items: [
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery takes 5-7 business days. We also offer express delivery (2-3 business days) for an additional charge. Delivery time may vary by location.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes! Free shipping is available on orders above ₹499. For orders below ₹499, shipping cost is ₹99.',
      },
      {
        question: 'Can I track my order?',
        answer:
          'Yes, you will receive a tracking link via email once your order is dispatched. You can use this to track your package in real-time.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Currently, we offer India-wide shipping only. We are working on expanding to international markets soon.',
      },
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy. If you are not satisfied with your purchase, you can return it for a full refund or exchange.',
      },
    ],
  },
  {
    category: 'Storage & Shelf Life',
    items: [
      {
        question: 'How should I store Nut8Bites products?',
        answer:
          'Store in a cool, dry place away from direct sunlight. For peanut butter, refrigerate after opening and consume within 2 weeks for best quality.',
      },
      {
        question: 'What is the shelf life of Nut8Bites products?',
        answer:
          'Our products have a shelf life of 6-12 months from the date of manufacture. Check the packaging for the exact expiry date.',
      },
      {
        question: 'Can I freeze Nut8Bites products?',
        answer:
          'Yes, you can freeze peanut butter and laddoos for extended storage. Thaw at room temperature before consuming.',
      },
    ],
  },
  {
    category: 'Health & Nutrition',
    items: [
      {
        question: 'Are Nut8Bites products good for fitness enthusiasts?',
        answer:
          'Absolutely! With 8-10g of protein per serving, our products are perfect for muscle recovery and sustained energy for fitness enthusiasts.',
      },
      {
        question: 'Can I consume Nut8Bites products if I am diabetic?',
        answer:
          'We recommend consulting with your healthcare provider before consuming products containing jaggery if you have diabetes. We have products with minimal sugar options.',
      },
      {
        question: 'Are Nut8Bites products organic?',
        answer:
          'While we source premium quality peanuts and natural ingredients, not all products are certified organic. We focus on clean, natural ingredients without artificial additives.',
      },
      {
        question: 'What are the health benefits of peanuts?',
        answer:
          'Peanuts are rich in protein, healthy fats, fiber, vitamins, and minerals. They support heart health, muscle growth, and provide sustained energy.',
      },
    ],
  },
  {
    category: 'Payment & Billing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards, debit cards, and digital payment methods. Our checkout process is secure and encrypted.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Yes, all transactions are processed through secure, encrypted connections. We never store your complete card details.',
      },
      {
        question: 'Do you offer discounts or promotional codes?',
        answer:
          'Yes, we regularly offer discounts and promotional codes. Subscribe to our newsletter to stay updated on special offers.',
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
        {/* Breadcrumb */}
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

        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-700">
                Find answers to common questions about our products, shipping, and more
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {faqs.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-amber-600 hover:bg-amber-700 rounded"></div>
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

        {/* Contact CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-serif font-bold hover:opacity-90 transition-all"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/918800000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-green-500 text-green-600 rounded-lg font-serif font-bold hover:bg-green-50 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
