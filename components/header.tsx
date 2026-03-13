'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, Heart, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const { cart, wishlist } = useCart()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Header */}
        <div className="relative flex items-center justify-between h-20">

          {/* Mobile Left - Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              className="text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Logo */}
          <Link href="/" className="hidden md:flex items-center flex-shrink-0">
            <Image
              src="/images/Nut8bites-logo.png"
              alt="Nut8Bites Logo"
              width={130}
              height={42}
              priority
              className="object-contain h-auto"
            />
          </Link>

          {/* Mobile Center Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:hidden flex items-center"
          >
            <Image
              src="/images/Nut8bites-logo.png"
              alt="Nut8Bites Logo"
              width={115}
              height={38}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative text-gray-700 font-medium text-sm transition-all duration-300
                  hover:text-amber-600
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-amber-600 after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-5 ml-auto">

            {/* Search Desktop */}
            <div className="hidden md:block relative" ref={searchRef}>
              <button
                className="
                  text-gray-700 hover:text-amber-600 transition-all duration-300
                  hover:scale-110
                "
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 shadow-xl rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="
                      w-full border border-gray-300 rounded-md px-4 py-2
                      focus:outline-none focus:ring-2 focus:ring-amber-500
                    "
                  />
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="
                relative text-gray-700 hover:text-amber-600
                transition-all duration-300 hover:scale-110
              "
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="
                relative text-gray-700 hover:text-amber-600
                transition-all duration-300 hover:scale-110
              "
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}