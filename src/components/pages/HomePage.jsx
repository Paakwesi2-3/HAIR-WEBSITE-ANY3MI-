import React, { Suspense, lazy } from 'react'
import { Sparkles, Star, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import ErrorBoundary from '../ErrorBoundary'

const HeroGeometric = lazy(() => import('../ui/shape-landing-hero').then(m => ({ default: m.HeroGeometric })))
export default function HomePage({ onNavigate }) {
  return (
    <div>
      <ErrorBoundary fallback={<StaticHero />}>
        <Suspense fallback={<StaticHero />}>
          <HeroGeometric onNavigate={onNavigate} badge="Kokonut UI" title1="Elevate Your" title2="Digital Vision" />
        </Suspense>
      </ErrorBoundary>

      {/* Features Section */}
      <section className="py-16 bg-neutral-900/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Braiding</h3>
              <p className="text-gray-300">Skilled in all braiding styles from box braids to cornrows</p>
            </Card>

            <Card className="p-6 border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-gray-300">High-quality wigs and hair extensions you can trust</p>
            </Card>

            <Card className="p-6 border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">UK Based</h3>
              <p className="text-gray-300">Conveniently located to serve clients across the UK</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
  function StaticHero() {
    return (
      <section className="relative h-[600px] bg-cover bg-center">
          <img src="https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="hero" className="absolute inset-0 w-full h-full object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white max-w-4xl mx-auto">
              Expert Hair Braiding & Premium Wigs
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mt-6 max-w-2xl mx-auto">
              Transform your look with professional braiding services and high-quality wigs in the UK
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('booking')}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold text-lg px-8 py-6"
              >
                Book Appointment
              </Button>
              <Button
                onClick={() => onNavigate('shop')}
                className="bg-white text-pink-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
              >
                Shop Wigs & Hair
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
