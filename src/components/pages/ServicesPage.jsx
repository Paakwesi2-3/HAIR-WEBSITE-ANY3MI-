import React from 'react';
import { Clock, Info } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

export default function ServicesPage({ onNavigate }) {
  const services = [
    { 
      id: 1,
      name: 'Box Braids', 
      price: 80, 
      minDeposit: 30, 
      duration: '4-6 hours', 
      description: 'Classic individual braids in various sizes, perfect for a protective style that lasts'
    },
    { 
      id: 2,
      name: 'Knotless Braids', 
      price: 100, 
      minDeposit: 40, 
      duration: '5-7 hours', 
      description: 'Lighter, more natural-looking braids that are easier on your scalp and edges'
    },
    { 
      id: 3,
      name: 'Cornrows', 
      price: 50, 
      minDeposit: 20, 
      duration: '2-4 hours', 
      description: 'Neat, close-to-the-scalp braiding in straight lines or creative patterns'
    },
    { 
      id: 4,
      name: 'Feed-In Braids', 
      price: 70, 
      minDeposit: 25, 
      duration: '3-5 hours', 
      description: 'Gradual, natural-looking braids that start small and get thicker'
    },
    { 
      id: 5,
      name: 'Fulani Braids', 
      price: 90, 
      minDeposit: 35, 
      duration: '4-6 hours', 
      description: 'Traditional African style featuring cornrows and braids with beads and accessories'
    },
    { 
      id: 6,
      name: 'Goddess Braids', 
      price: 80, 
      minDeposit: 30, 
      duration: '3-5 hours', 
      description: 'Thick, elegant braids that make a bold statement'
    },
    { 
      id: 7,
      name: 'Triangle Box Braids', 
      price: 100, 
      minDeposit: 40, 
      duration: '5-7 hours', 
      description: 'Box braids with triangle-shaped parts for a unique geometric look'
    },
    { 
      id: 8,
      name: 'Twist Braids', 
      price: 70, 
      minDeposit: 25, 
      duration: '3-5 hours', 
      description: 'Two-strand twists that create a beautiful textured look'
    },
    { 
      id: 9,
      name: 'Lemonade Braids', 
      price: 85, 
      minDeposit: 30, 
      duration: '4-6 hours', 
      description: "Side-swept cornrows inspired by Beyoncé's iconic style"
    },
    { 
      id: 10,
      name: 'Crochet Braids', 
      price: 60, 
      minDeposit: 20, 
      duration: '2-4 hours', 
      description: 'Protective style using the crochet method for quick installation'
    },
    { 
      id: 11,
      name: 'Stitch Braids', 
      price: 90, 
      minDeposit: 35, 
      duration: '4-6 hours', 
      description: 'Precise, stitched cornrows with clean, defined parts'
    },
    { 
      id: 12,
      name: 'Braids with Curly Ends', 
      price: 100, 
      minDeposit: 40, 
      duration: '5-7 hours', 
      description: 'Box braids or twists with beautiful curly ends for added flair'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Braiding Services</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Professional braiding services with styles to suit every preference. All bookings require a minimum deposit.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Info Alert */}
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Booking Policy:</strong> A minimum deposit is required to secure your appointment. The deposit amount varies by service and will be deducted from your final payment. Deposits are non-refundable but can be transferred to a future appointment if cancelled 48 hours in advance.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow border-t-4 border-pink-500">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                <div className="flex items-center text-gray-500 mb-3">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{service.duration}</span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-2xl font-bold text-gray-900">£{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deposit Required:</span>
                    <span className="text-lg font-semibold text-pink-600">£{service.minDeposit}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('booking')}
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold text-lg px-8 py-6"
            >
              Book Your Appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

