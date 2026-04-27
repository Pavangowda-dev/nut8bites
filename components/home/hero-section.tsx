import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full">
      <Link href="/shop" className="block">

        {/* Mobile */}
        <div className="block md:hidden w-full">
          <Image
            src="/images/nut8bites-mobile-banner.png"
            alt="Nut8Bites Peanut Butter"
            width={430}
            height={384}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Tablet (iPad Mini + Air + Pro) */}
        <div className="hidden md:block xl:hidden w-full">
          <Image
            src="/images/nut8bites-tablet-banner.png"
            alt="Nut8Bites Peanut Butter"
            width={1024}
            height={420}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Desktop */}
        <div className="hidden xl:block w-full">
          <Image
            src="/images/nut8bites-desktop-banner.png"
            alt="Nut8Bites Peanut Butter"
            width={1280}
            height={500}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

      </Link>
    </section>
  )
}