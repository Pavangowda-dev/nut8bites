'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Lock, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()

  const [showConfirmation, setShowConfirmation] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  })

  const getItemPrice = (item: typeof cart[number]) => {
    return (
      item.selectedPrice ||
      item.product.prices?.[item.selectedPack] ||
      item.product.prices?.[item.product.packSizes[0]] ||
      0
    )
  }

  const total = cart.reduce((sum, item) => {
    return sum + getItemPrice(item) * item.quantity
  }, 0)

  const shipping = total > 499 ? 0 : 99
  const grandTotal = total + shipping

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert('Please fill all required fields')
      return
    }

    setShowConfirmation(true)

    setTimeout(() => {
      clearCart()
      setTimeout(() => {
        router.push('/')
      }, 2500)
    }, 1000)
  }

  if (showConfirmation) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Order Confirmed
            </h1>

            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                Order Total:
                <span className="font-bold text-gray-900 ml-2">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Estimated Delivery: 3–5 Business Days
              </p>
            </div>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>

            <Link href="/shop" className="text-amber-600 font-medium">
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Secure Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePayNow} className="space-y-8">

                {/* Customer */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Customer Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email (Optional)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address1"
                      placeholder="Address Line 1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />

                    <input
                      type="text"
                      name="address2"
                      placeholder="Address Line 2 (Optional)"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                        required
                      />

                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      >
                        <option>India</option>
                      </select>

                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-600" />
                    Payment
                  </h2>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-green-800">
                      Secure online payment via Razorpay
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Pay Now ₹{grandTotal.toFixed(2)}
                  </button>
                </div>

              </form>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 bg-gray-50">

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-5 mb-6">

                  {cart.map((item) => {
                    const price = getItemPrice(item)

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedPack}`}
                        className="flex gap-3"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={70}
                            height={70}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">
                            {item.product.name}
                          </p>

                          <p className="text-xs text-amber-600">
                            {item.selectedPack}
                          </p>

                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-sm text-gray-900">
                          ₹{(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    )
                  })}

                </div>

                <div className="space-y-3 border-t pt-4">

                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-3 border-t">
                    <span>Total</span>
                    <span className="text-amber-600">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}