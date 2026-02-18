import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="leading-relaxed">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=60" alt="braids hero" className="absolute inset-0 w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white">Expert Hair Braiding & Premium Wigs</h1>
          <p className="mt-4 text-white text-sm sm:text-base">Luxury, precision and care — professional braiding and premium wigs tailored for you. Secure your appointment with a deposit.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="px-6 py-3 rounded-md text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg transition-transform transform hover:scale-105">Book Appointment</Link>
            <Link to="/shop" className="px-6 py-3 rounded-md bg-white text-gray-900 shadow hover:scale-105">Shop Wigs & Hair</Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="bg-neutral-900/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800 rounded-lg border-t-4 border-pink-500 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-white">Expert Braiding</h3>
              <p className="mt-2 text-sm text-gray-300">Decades of experience in precision braiding and styling.</p>
            </div>
            <div className="bg-neutral-800 rounded-lg border-t-4 border-blue-500 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-white">Premium Products</h3>
              <p className="mt-2 text-sm text-gray-300">High-quality wigs and hair extensions sourced for longevity and style.</p>
            </div>
            <div className="bg-neutral-800 rounded-lg border-t-4 border-pink-500 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-white">UK Based</h3>
              <p className="mt-2 text-sm text-gray-300">Proudly serving clients across the UK with professional care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <p className="text-sm text-gray-300 mt-2">From classic box braids to custom wig installations. Deposits vary by service.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src="https://images.unsplash.com/photo-1533236896876-0f0f30c6c3f0?auto=format&fit=crop&w=1200&q=60" alt="braiding services" className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="text-xl font-bold">Braiding Services</h3>
                  <p className="mt-2 text-sm">Explore our full range of braiding styles and pricing.</p>
                  <Link to="/services" className="mt-4 inline-block px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white">View Services</Link>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=60" alt="wigs and products" className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h3 className="text-xl font-bold">Wigs & Hair Products</h3>
                  <p className="mt-2 text-sm">Premium wigs and essential care products available in-store and online.</p>
                  <Link to="/shop" className="mt-4 inline-block px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Ready to Transform Your Look?</h2>
          <p className="mt-2 text-sm max-w-2xl mx-auto">Secure your appointment with a small deposit. Deposits vary per service and are shown on the booking page.</p>
          <div className="mt-6">
            <Link to="/booking" className="inline-block px-6 py-3 rounded-md bg-white text-pink-500 font-semibold">Book Now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
