import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function Header({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeBtnRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'shop', label: 'Shop' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', onKey)
      // focus the close button when opened
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/5 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center transition-transform hover:scale-105">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Excella Braids
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-base font-medium relative group transition-colors px-1 ${
                  currentPage === item.id
                    ? 'text-pink-400 font-semibold'
                    : 'text-gray-200 hover:text-pink-400'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-pink-400 transition-all ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </nav>

          {/* Book Now Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick('booking')}
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-6 py-2.5 shadow-md"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-expanded={mobileMenuOpen} aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">Excella Braids</span>
                  </div>
                  <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} ref={closeBtnRef}>
                    <X className="w-5 h-5 text-gray-300" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4 mt-8 px-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-3 text-lg font-medium transition-colors ${
                          currentPage === item.id
                            ? 'text-pink-400 font-semibold'
                            : 'text-gray-200 hover:text-pink-400'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => handleNavClick('booking')}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold mt-4"
                  >
                    Book Now
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

