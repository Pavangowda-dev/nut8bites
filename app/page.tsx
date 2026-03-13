import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { WhyChooseSection } from '@/components/home/why-choose-section'
import { BestSellers } from '@/components/home/best-sellers'
import { PeanutPowerSection } from '@/components/home/peanut-power-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { NewsletterSection } from '@/components/home/newsletter-section'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <WhyChooseSection />
        <BestSellers />
        <PeanutPowerSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  )
}