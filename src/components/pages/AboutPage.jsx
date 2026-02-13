import React, { useEffect, useState } from 'react';
import { Heart, Award, Users, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

function AboutFounderImage(){
  const [img, setImg] = useState(null);
  useEffect(() => {
    const load = () => {
      const d = localStorage.getItem('founderImage');
      setImg(d);
    };
    load();
    const onUpdate = () => load();
    window.addEventListener('founderImageUpdated', onUpdate);
    return () => window.removeEventListener('founderImageUpdated', onUpdate);
  }, []);

  if (img) return <img src={img} alt="Iabella Nana Yaa Asenso" className="rounded-lg shadow-xl w-full h-auto object-cover" />;
  return <img src="https://i.postimg.cc/nVmY9Wj5/ed8601d8-4e8b-4883-9d59-31fbd79d5639.jpg" alt="Iabella Nana Yaa Asenso" className="rounded-lg shadow-xl w-full h-auto object-cover" />;
}

export default function AboutPage({ onNavigate }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Bringing beauty, confidence, and style to every client
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Welcome to Excella Braids
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are a UK-based hair braiding and beauty business dedicated to helping you look 
                and feel your absolute best. With years of experience in African hair braiding and 
                a passion for quality, we've built a reputation for excellence in every style we create.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our founder, Iabella Nana Yaa Asenso, has been perfecting the art of hair braiding for over a decade, 
                combining traditional techniques with modern styles to create looks that are both 
                timeless and on-trend.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you're looking for protective styles, a complete transformation with a premium wig, 
                or quality hair products, we're here to make your vision a reality. Every appointment begins 
                with a consultation to ensure we understand exactly what you want.
              </p>
              <Button 
                onClick={() => onNavigate('booking')}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg"
              >
                Book Your Appointment
              </Button>
            </div>
            <div>
              {(() => {
                const [preview, setPreview] = (() => {
                  // placeholder for hooking into state via closure
                  return [null, () => {}];
                })();
                return (
                  <AboutFounderImage />
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Passion & Care</h3>
              <p className="text-gray-600">
                We treat every client with the utmost care and attention, ensuring you leave feeling 
                confident and beautiful.
              </p>
            </Card>

            <Card className="p-8 text-center border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Products</h3>
              <p className="text-gray-600">
                We use only premium quality hair extensions and products to ensure long-lasting, 
                beautiful results.
              </p>
            </Card>

            <Card className="p-8 text-center border-t-4 border-pink-500 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Client Focused</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen to your needs and work to exceed 
                your expectations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-600 text-sm">
                Over 10 years of experience in braiding and styling
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Convenient appointment times to fit your busy schedule
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <MapPin className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">UK Based</h3>
              <p className="text-gray-600 text-sm">
                Proudly serving clients across Birmingham and the surrounding areas
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Premium Products</h3>
              <p className="text-gray-600 text-sm">
                Only the finest wigs and hair extensions available
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference that passion and expertise make
          </p>
          <Button 
            onClick={() => onNavigate('booking')}
            className="bg-white text-pink-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6"
          >
            Book Your Appointment
          </Button>
        </div>
      </section>
    </div>
  );
}
