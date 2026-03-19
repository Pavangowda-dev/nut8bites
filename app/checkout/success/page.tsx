'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was successful and your order has been placed.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            Order ID:
            <span className="font-bold text-gray-900 ml-2">
              {orderId}
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Estimated Delivery: 4–8 Business Days
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SuccessContent />
      </Suspense>

      <Footer />
    </div>
  )
}