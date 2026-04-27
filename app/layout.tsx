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
    default:
      'Homemade Peanut Butter & Natural Peanut Snacks | Nut8Bites India',
    template: '%s | Nut8Bites',
  },

  description:
    'Buy homemade peanut butter and natural peanut snacks in India. No preservatives, no additives. Freshly made in Karnataka using premium Chintamani peanuts. High protein, healthy and delicious.',

  keywords: [
    'homemade peanut butter',
    'natural peanut butter India',
    'no preservatives peanut butter',
    'healthy peanut snacks',
    'protein snacks India',
    'Chintamani peanuts',
    'peanut butter Bangalore',
    'fresh peanut butter Karnataka',
    'organic peanut butter India',
    'healthy snacks India',
  ],

  applicationName: 'Nut8Bites',

  authors: [{ name: 'Nut8Bites' }],
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
    title: 'Homemade Peanut Butter | No Preservatives | Nut8Bites India',
    description:
      'Fresh homemade peanut butter with no preservatives. Made in Karnataka using premium peanuts.',
    images: [
      {
        url: '/images/Nut8bites-favicon.png',
        width: 1200,
        height: 630,
        alt: 'Nut8Bites Peanut Butter',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Homemade Peanut Butter | Nut8Bites',
    description:
      'Natural peanut butter with no preservatives. Fresh & healthy.',
    images: ['/images/Nut8bites-favicon.png'],
  },

  icons: {
    icon: '/images/Nut8bites-favicon.png',
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
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-inter antialiased bg-white text-gray-900"
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        {/* ✅ Structured Data (safe) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FoodProduct',
              name: 'Nut8Bites Peanut Butter',
              description:
                'Homemade peanut butter with no preservatives made in Karnataka, India.',
              brand: {
                '@type': 'Brand',
                name: 'Nut8Bites',
              },
              countryOfOrigin: 'India',
            }),
          }}
        />

        <Analytics />
      </body>
    </html>
  )
}