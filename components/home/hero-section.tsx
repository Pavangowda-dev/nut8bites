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

        {/* Tablet Banner (includes iPad + iPad Pro) */}
        <div
          className="hidden md:block xl:hidden w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nut8bites-tablet-banner.png')",
            minHeight: '420px',
          }}
        />

        {/* Desktop Banner */}
        <div
          className="hidden xl:block w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/nut8bites-desktop-banner.png')",
            minHeight: '500px',
          }}
        />

      </Link>
    </section>
  )
}