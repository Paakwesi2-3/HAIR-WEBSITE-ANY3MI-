import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/pages/HomePage'
import ServicesPage from './components/pages/ServicesPage'
import ShopPage from './components/pages/ShopPage'
import GalleryPage from './components/pages/GalleryPage'
import BookingPage from './components/pages/BookingPage'
import AdminPage from './components/pages/AdminPage'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'
import { CartProvider } from './components/CartContext'

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash === '#admin' ? 'admin' : 'home')

  function navigate(page) {
    setCurrentPage(page)
  }

  useEffect(() => {
    // Scroll to top smoothly on page change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  function renderPage() {
    switch (currentPage) {
      case 'services':
        return <ServicesPage onNavigate={navigate} />
      case 'shop':
        return <ShopPage onNavigate={navigate} />
      case 'gallery':
        return <GalleryPage onNavigate={navigate} />
      case 'booking':
        return <BookingPage onNavigate={navigate} />
      case 'about':
        return <AboutPage onNavigate={navigate} />
      case 'contact':
        return <ContactPage onNavigate={navigate} />
      case 'admin':
        return <AdminPage onNavigate={navigate} />
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#070707] text-gray-100">
        <Header onNavigate={navigate} currentPage={currentPage} />
        <main className="flex-1 container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <Footer onNavigate={navigate} />
      </div>
    </CartProvider>
  )
}
