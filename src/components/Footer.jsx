import React from 'react';
import { Sparkles, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer({ onNavigate = () => {} }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-white">Excella Braids</span>
            </div>
            <p className="text-sm mb-4">
              Expert hair braiding and premium wigs in the UK. Transform your look with professional care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">Box Braids</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">Knotless Braids</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">Cornrows</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">Goddess Braids</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">All Braiding Styles</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('shop')} className="hover:text-blue-400 transition-colors">Shop Wigs & Hair</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-blue-400 transition-colors">Gallery</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-blue-400 transition-colors">Book Appointment</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>Birmingham, United Kingdom</li>
              <li>Phone: +44 7XXX XXXXXX</li>
              <li>Email: info@excellabraids.co.uk</li>
              <li className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent font-semibold mt-2">
                Deposit Required for All Bookings
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {currentYear} Excella Braids. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pink-400 transition-colors">Booking Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
