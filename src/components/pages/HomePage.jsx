import React from 'react'
import { Sparkles, Star, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

export default function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
        }}
      >
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Braiding</h3>
              <p className="text-gray-600">Skilled in all braiding styles from box braids to cornrows</p>
            </Card>

            <Card className="p-6 border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-gray-600">High-quality wigs and hair extensions you can trust</p>
            </Card>

            <Card className="p-6 border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">UK Based</h3>
              <p className="text-gray-600">Conveniently located to serve clients across the UK</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
