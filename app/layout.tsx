import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nut8bites.com'),

  title: {
    default: 'Nut8Bites | Premium Peanut Snacks',
    template: '%s | Nut8Bites',
  },

  description:
    'Premium peanut snacks crafted from selected Chintamani peanuts. Natural ingredients, protein-rich nutrition, and authentic flavor in every bite.',

  keywords: [
    'Nut8Bites',
    'peanut snacks',
    'healthy snacks',
    'protein snacks',
    'natural peanuts',
    'Chintamani peanuts',
    'peanut butter',
    'healthy nutrition',
  ],

  applicationName: 'Nut8Bites',

  authors: [
    {
      name: 'Nut8Bites',
    },
  ],

  creator: 'Nut8Bites',

  publisher: 'Nut8Bites',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nut8bites.com',
    siteName: 'Nut8Bites',
    title: 'Nut8Bites | Premium Peanut Snacks',
    description:
      'Premium peanut snacks crafted from selected Chintamani peanuts.',
    images: [
      {
        url: '/images/Nut8bites-favicon.png',
        width: 1200,
        height: 630,
        alt: 'Nut8Bites',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nut8Bites | Premium Peanut Snacks',
    description:
      'Premium peanut snacks crafted from selected Chintamani peanuts.',
    images: ['/images/Nut8bites-favicon.png'],
  },

  icons: {
    icon: '/images/Nut8bites-favicon.png',
    shortcut: '/images/Nut8bites-favicon.png',
    apple: '/images/Nut8bites-favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-white text-gray-900">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}