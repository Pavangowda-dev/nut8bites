'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle } from 'lucide-react'

interface Order {
  id: string
  customer_name: string
  total: number
  payment_status: string
  order_status: string
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setError(true)
      setLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/get-order?orderId=${orderId}`)

        if (!res.ok) throw new Error()

        const data = await res.json()

        if (!data.order) throw new Error()

        setOrder(data.order)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  // 🔄 Loading
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Fetching your order...</p>
      </main>
    )
  }

  // ❌ Invalid order
  if (error || !order) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid Order
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find your order. Please contact support.
          </p>

          <Link href="/shop" className="text-amber-600 font-medium">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  // ✅ Success UI
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Confirmed 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you <span className="font-semibold">{order.customer_name}</span>, your payment was successful.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-gray-700">
            Order ID:
            <span className="font-bold text-gray-900 ml-2">
              {order.id}
            </span>
          </p>

          <p className="text-sm text-gray-700 mt-2">
            Total Paid:
            <span className="font-bold text-amber-600 ml-2">
              ₹{order.total.toFixed(2)}
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Payment Status: {order.payment_status}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Order Status: {order.order_status}
          </p>

          <p className="text-sm text-gray-600 mt-3">
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

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>

      <Footer />
    </div>
  )
}