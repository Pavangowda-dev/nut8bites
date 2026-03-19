'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { supabase } from '@/lib/supabase'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

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

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayNow = async (e: React.FormEvent) => {
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

    setLoading(true)

    const res = await loadRazorpay()

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.')
      setLoading(false)
      return
    }

    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: grandTotal,
        }),
      })

      if (!orderRes.ok) {
        const err = await orderRes.text()
        throw new Error(`Order creation failed: ${err}`)
      }

      const order = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Nut8Bites',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response: any) {
          // Step 1: Verify payment signature first (critical security step)
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          const verifyData = await verifyRes.json()

          if (!verifyData.success) {
            setLoading(false)
            alert('Payment verification failed. Please contact support.')
            return
          }

          // Step 2: Save order only after successful verification
          const customerName = `${formData.firstName} ${formData.lastName}`.trim()

          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert([
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                payment_status: 'paid',

                customer_name: customerName,
                email: formData.email || null,
                phone: formData.phone,

                address1: formData.address1,
                address2: formData.address2 || null,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pincode: formData.pincode,

                subtotal: total,
                shipping,
                total: grandTotal,

                order_status: 'confirmed',
              },
            ])
            .select()
            .single()

          if (orderError || !orderData) {
            setLoading(false)
            console.error('Order insert error:', orderError)
            alert('Failed to save order details. Please contact support.')
            return
          }

          // Save order items
          const items = cart.map((item) => ({
            order_id: orderData.id,
            product_id: item.product.id,
            product_name: item.product.name,
            pack_size: item.selectedPack || null,
            quantity: item.quantity,
            price: getItemPrice(item),
          }))

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(items)

          if (itemsError) {
            setLoading(false)
            console.error('Order items insert error:', itemsError)
            alert('Failed to save order items. Please contact support.')
            return
          }

          // Success — redirect to dedicated success page
          setLoading(false)
          clearCart()
          router.push(`/checkout/success?order=${orderData.id}`)
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email || undefined,
          contact: formData.phone,
        },
        theme: {
          color: '#d97706',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const paymentObject = new (window as any).Razorpay(options)

      paymentObject.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + (response.error.description || 'Unknown error'))
        setLoading(false)
      })

      paymentObject.open()
    } catch (err: any) {
      console.error('Payment flow error:', err)
      alert('Payment initiation failed. Please try again.\n' + (err.message || ''))
      setLoading(false)
    }
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
                {/* Customer Details */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Customer Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
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
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address1"
                      placeholder="Address Line 1 *"
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
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-600"
                        required
                      />

                      <input
                        type="text"
                        name="state"
                        placeholder="State *"
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
                        placeholder="Pincode *"
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
                    disabled={loading}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    {loading ? 'Processing...' : `Pay Now ₹${grandTotal.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
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
                        key={`${item.product.id}-${item.selectedPack || 'default'}`}
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
                            {item.selectedPack || 'Default'}
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