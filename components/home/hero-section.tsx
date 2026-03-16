import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Link href="/shop" className="block">

        {/* Mobile Banner */}
        <div
          className="block md:hidden w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nut8bites-mobile-banner.png')",
            minHeight: '384px',
          }}
        />

        {/* Tablet Banner */}
        <div
          className="hidden md:block lg:hidden w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nut8bites-tablet-banner.png')",
            minHeight: '420px',
          }}
        />

        {/* Desktop Banner */}
        <div
          className="hidden lg:block w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nut8bites-desktop-banner.png')",
            minHeight: '500px',
          }}
        />

      </Link>
    </section>
  )
}