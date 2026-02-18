import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { differenceInCalendarWeeks, startOfDay, addDays, format } from 'date-fns';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-900/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <Card className="p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-900/20 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-pink-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Phone</h3>
                      <p className="text-gray-300">+44 7XXX XXXXXX</p>
                      <p className="text-sm text-gray-400 mt-1">Mon-Sat, 9AM-6PM</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Email</h3>
                      <p className="text-gray-300">info@excellabraids.co.uk</p>
                      <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-900/20 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-pink-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Location</h3>
                      <p className="text-gray-300">Birmingham, United Kingdom</p>
                      <p className="text-sm text-gray-400 mt-1">Serving clients nationwide</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Business Hours (Two-week pattern)</h3>
                      <p className="text-sm text-gray-400 mb-2">We run a repeating two-week schedule that flips between Week A and Week B.</p>
                      <div className="text-gray-300 space-y-2">
                        <div>
                          <strong>Week A (parity 0):</strong> Workdays — Monday, Tuesday, Saturday, Sunday — Hours: 09:00 — 18:00
                        </div>
                        <div>
                          <strong>Week B (parity 1):</strong> Workdays — Wednesday, Thursday, Friday — Hours: 09:00 — 18:00
                        </div>
                        <div className="mt-2 text-sm">
                          <em>Today's status:</em> <span className="font-semibold text-gray-200">{(() => {
                            const today = startOfDay(new Date());
                            const referenceMonday = new Date(2026, 0, 5);
                            const parity = Math.abs(differenceInCalendarWeeks(today, referenceMonday, { weekStartsOn: 1 })) % 2;
                            const day = today.getDay();
                            const isWork = parity === 0 ? [1,2,6,0].includes(day) : [3,4,5].includes(day);
                            return isWork ? `Open — ${format(today, 'EEEE')}` : `Closed — ${format(today, 'EEEE')}`;
                          })()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12 rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12 rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12 rounded-full hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

              {/* Availability mini-calendar (next 28 days) */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Availability (next 4 weeks)</h3>
                <AvailabilityCalendar />
              </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
                
                {submitted && (
                  <Alert className="mb-6 bg-green-900/20 border-green-800">
                    <Send className="h-5 w-5 text-green-200" />
                    <AlertDescription className="text-green-200">
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="contact-subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Inquiry</SelectItem>
                        <SelectItem value="products">Product Question</SelectItem>
                        <SelectItem value="pricing">Pricing Information</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold py-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Quick Tips */}
              <Alert className="mt-6 border-blue-800 bg-blue-900/20">
                <AlertDescription className="text-blue-200 text-sm">
                  <strong>Quick Tips:</strong> For booking inquiries, please include your preferred date and service. 
                  For urgent matters, call us directly during business hours.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AvailabilityCalendar(){
  const [disabledDates, setDisabledDates] = useState([]);
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('disabledDates') || '[]';
        setDisabledDates(JSON.parse(raw || '[]'));
      } catch (e) { setDisabledDates([]); }
    };
    load();
    const onCustom = () => load();
    window.addEventListener('storage', onCustom);
    window.addEventListener('disabledDatesUpdated', onCustom);
    return () => {
      window.removeEventListener('storage', onCustom);
      window.removeEventListener('disabledDatesUpdated', onCustom);
    };
  }, []);

  const today = startOfDay(new Date());
  const referenceMonday = new Date(2026, 0, 5);

  const isAvailable = (d) => {
    if (!d) return false;
    if (startOfDay(d) < today) return false;
    const key = startOfDay(d).toISOString().slice(0,10);
    if (disabledDates.includes(key)) return false;
    const parity = Math.abs(differenceInCalendarWeeks(d, referenceMonday, { weekStartsOn: 1 })) % 2;
    const day = d.getDay();
    if (parity === 0) return [1,2,6,0].includes(day);
    return [3,4,5].includes(day);
  };

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {[...Array(28)].map((_, i) => {
        const day = addDays(today, i);
        const available = isAvailable(day);
        return (
          <div key={i} className={`py-2 px-1 rounded-md text-xs ${available ? 'bg-green-900/20 border border-green-800 text-green-200' : 'bg-neutral-800 text-gray-400'}`}>
            <div className="font-semibold">{format(day, 'EEE')}</div>
            <div className="text-sm">{format(day, 'd')}</div>
          </div>
        );
      })}
    </div>
  );
}
