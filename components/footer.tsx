import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-amber-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/Nut8bites-logo.png"
                alt="Nut8Bites Logo"
                width={140}
                height={45}
                className="object-contain"
              />
            </Link>

            <p className="text-white text-sm leading-relaxed max-w-sm">
              Pure peanut power in every bite. Premium, natural, protein-packed snacks crafted for active lifestyles and healthy everyday choices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-300 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Policies</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-amber-300 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-exchange" className="hover:text-amber-300 transition-colors">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:nut8bites@gmail.com"
                  className="hover:text-amber-300 transition-colors"
                >
                  nut8bites@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919901475158"
                  className="hover:text-amber-300 transition-colors"
                >
                  +91 9901475158
                </a>
              </li>
              <li>India-wide shipping available</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-amber-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Social */}
          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white text-center md:text-right">
            © {currentYear} Nut8Bites. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}