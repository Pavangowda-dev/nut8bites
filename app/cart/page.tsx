'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  const total = getTotalPrice()
  const shipping = total > 499 ? 0 : 99
  const grandTotal = total + shipping

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center bg-white px-4">
          <div className="text-center max-w-md">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>

            <p className="text-gray-600 mb-8">
              Add some delicious peanut snacks to get started.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
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

      <main className="flex-1 bg-white">

        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
              Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-5"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-28 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">

                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.category}
                      </p>

                      <p className="text-xl font-bold text-gray-900 mt-3">
                        ₹{item.product.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4 flex-wrap">

                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-4 py-2 text-lg hover:bg-gray-50"
                          >
                            −
                          </button>

                          <div className="px-4 py-2 border-x border-gray-200 min-w-[48px] text-center font-medium">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-4 py-2 text-lg hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="self-start sm:self-center text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-all"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 bg-gray-50">

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">

                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-medium">₹{total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        Add more items worth ₹{(499 - total).toFixed(2)} for free shipping
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-amber-600">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full block text-center py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all mb-4"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/shop"
                    className="w-full block text-center py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all"
                  >
                    Continue Shopping
                  </Link>

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