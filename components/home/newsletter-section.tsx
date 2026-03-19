'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('newsletter').insert([{ email }])

    if (error) {
      if (error.code === '23505') {
        setMessage('This email is already subscribed.')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } else {
      setMessage('Subscribed successfully!')
      setEmail('')
    }

    setLoading(false)
  }

  return (
    <section className="py-12 md:py-16 bg-amber-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          Join the Nut8Bites Community
        </h2>

        <p className="text-base md:text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
          Get exclusive offers, nutrition tips, and first updates on new products.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              flex-1 px-5 py-3 rounded-lg text-gray-900 text-sm md:text-base
              font-medium bg-white border border-white
              focus:outline-none focus:ring-2 focus:ring-white
              placeholder-gray-500
            "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg
              hover:bg-amber-50 hover:shadow-md
              transition-all duration-300 whitespace-nowrap
              disabled:opacity-60
            "
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-white">
            {message}
          </p>
        )}

      </div>
    </section>
  )
}