import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Alert, AlertDescription } from '../ui/alert';
import React, { useState, useEffect } from 'react';
import { format, differenceInCalendarWeeks, startOfDay, addDays } from 'date-fns';

export default function BookingPage({ onNavigate }) {
  const [date, setDate] = useState();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', time: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slotAvailable, setSlotAvailable] = useState(null);

  const services = [
    { id: 1, name: 'Box Braids', price: 80, minDeposit: 30, duration: '4-6 hours' },
    { id: 2, name: 'Knotless Braids', price: 100, minDeposit: 40, duration: '5-7 hours' },
    { id: 3, name: 'Cornrows', price: 50, minDeposit: 20, duration: '2-4 hours' },
    { id: 4, name: 'Feed-In Braids', price: 70, minDeposit: 25, duration: '3-5 hours' },
  ];

  const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
  const selectedServiceData = services.find(s => s.name === selectedService);

  // Two-week repeating schedule:
  // Week A (parity 0): available Monday (1) & Tuesday (2)
  // Week B (parity 1): available Saturday (6) & Sunday (0)
  const referenceMonday = new Date(2026, 0, 5); // fixed Monday reference
  const today = startOfDay(new Date());
  const [disabledDates, setDisabledDates] = useState([]);

  const loadDisabledDates = () => {
    try {
      const raw = localStorage.getItem('disabledDates') || '[]';
      const arr = JSON.parse(raw || '[]');
      setDisabledDates(Array.isArray(arr) ? arr : []);
    } catch (e) {
      setDisabledDates([]);
    }
  };

  useEffect(() => {
    loadDisabledDates();
    const onStorage = (e) => {
      if (e.key === 'disabledDates') loadDisabledDates();
    };
    const onCustom = () => loadDisabledDates();
    window.addEventListener('storage', onStorage);
    window.addEventListener('disabledDatesUpdated', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('disabledDatesUpdated', onCustom);
    };
  }, []);

  const isAvailable = (d) => {
    if (!d) return false;
    const day = d.getDay(); // 0 = Sun ... 6 = Sat
    if (startOfDay(d) < today) return false; // disable past
    // check disabled list (date-only ISO yyyy-mm-dd)
    const dKey = startOfDay(d).toISOString().slice(0,10);
    if (disabledDates.includes(dKey)) return false;
    const weekDiff = Math.abs(differenceInCalendarWeeks(d, referenceMonday, { weekStartsOn: 1 }));
    const parity = weekDiff % 2;
    // New two-week flipped schedule:
    // Week A (parity 0): work Mon(1), Tue(2), Sat(6), Sun(0) — off Wed-Fri
    // Week B (parity 1): work Wed(3), Thu(4), Fri(5) — off Sat-Sun & Mon-Tue
    if (parity === 0) {
      return day === 1 || day === 2 || day === 6 || day === 0; // Mon, Tue, Sat, Sun
    }
    return day === 3 || day === 4 || day === 5; // Wed, Thu, Fri
  };

  const findNextAvailable = (fromDate = today) => {
    let cursor = startOfDay(fromDate);
    for (let i = 0; i < 60; i++) {
      if (isAvailable(cursor)) return cursor;
      cursor = addDays(cursor, 1);
    }
    return null;
  };

  useEffect(() => {
    const next = findNextAvailable(today);
    if (next) setDate(next);
  }, []);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!selectedService || !date || !formData.time || !formData.name || !formData.email || !formData.phone) {
      setError('Please complete all required fields.');
      return;
    }
    setLoading(true);
    try {
      // final availability check before submit (best-effort UX; server still enforces uniqueness)
      // prefer Vite env var, then CRA-style REACT_APP_API_URL, then localhost
      let viteUrl = null;
      try { viteUrl = import.meta && import.meta.env && import.meta.env.VITE_API_URL; } catch (e) { viteUrl = null; }
      const craUrl = (typeof process !== 'undefined' && process && process.env && process.env.REACT_APP_API_URL) || null;
      const apiBase = viteUrl || craUrl || 'http://localhost:4001';
      const checkRes = await fetch(`${apiBase}/api/availability?date=${encodeURIComponent(date.toISOString())}&time=${encodeURIComponent(formData.time)}`);
      if (checkRes.ok) {
        const body = await checkRes.json();
        if (!body.available) {
          setError('Selected slot is no longer available. Please choose another time.');
          setLoading(false);
          setSlotAvailable(false);
          return;
        }
      }
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedService,
        date: date.toISOString(),
        time: formData.time,
        notes: formData.notes,
      };
      const res = await fetch(apiBase + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Server error');
      }
      await res.json();
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  // Client-side availability check when date or time changes
  useEffect(() => {
    let mounted = true;
    setSlotAvailable(null);
    setError(null);
    if (!date || !formData.time) return;
    let viteUrl = null;
    try { viteUrl = import.meta && import.meta.env && import.meta.env.VITE_API_URL; } catch (e) { viteUrl = null; }
    const craUrl = (typeof process !== 'undefined' && process && process.env && process.env.REACT_APP_API_URL) || null;
    const apiBase = viteUrl || craUrl || 'http://localhost:4001';
    const url = `${apiBase}/api/availability?date=${encodeURIComponent(date.toISOString())}&time=${encodeURIComponent(formData.time)}`;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!mounted) return;
        if (res.ok) {
          const body = await res.json();
          setSlotAvailable(Boolean(body.available));
          if (!body.available) setError('Selected slot is already booked.');
        }
      } catch (e) {
        if (e.name !== 'AbortError') {
          // ignore network errors for availability check
        }
      }
    })();
    return () => { mounted = false; controller.abort(); };
  }, [date, formData.time]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-900/10 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-200" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Booking Request Received!</h2>
            <p className="text-gray-300 mb-8">Thank you for your booking request. We'll contact you shortly to confirm your appointment and provide payment details for your deposit.</p>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-lg mb-4 text-white">Next Steps:</h3>
              <ol className="space-y-3">
                <li className="flex items-start"><span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>We'll contact you within 24 hours to confirm availability</li>
                <li className="flex items-start"><span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>You'll receive payment instructions for your deposit</li>
                <li className="flex items-start"><span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>Once deposit is received, your appointment is confirmed</li>
                <li className="flex items-start"><span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>Pay the remaining balance on the day of your appointment</li>
              </ol>
            </div>

            <div className="bg-neutral-800 rounded-lg p-6 mb-8 text-left text-gray-200">
              <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-300">Service:</span><span className="font-semibold">{selectedService}</span></div>
                <div className="flex justify-between text-lg mt-2"><span className="text-blue-300 font-semibold">Deposit Required:</span><span className="text-blue-300 font-bold">£{selectedServiceData?.minDeposit}</span></div>
                <div className="flex justify-between"><span className="text-gray-300">Balance Due:</span><span className="font-semibold">£{selectedServiceData ? selectedServiceData.price - selectedServiceData.minDeposit : 0}</span></div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setSubmitted(false)} variant="outline" className="flex-1">Book Another Appointment</Button>
              <Button onClick={() => onNavigate('home')} className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white">Return to Home</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Appointment</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Secure your spot with a minimum deposit. Choose your service and preferred date below.</p>
        </div>
      </section>

      <section className="py-16 bg-neutral-900/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <Alert className="mb-8 border-pink-800 bg-pink-900/20">
            <AlertCircle className="h-5 w-5 text-pink-300" />
            <AlertDescription className="text-pink-200"><strong>Important:</strong> All bookings require a minimum deposit to secure your appointment. The deposit amount varies by service and will be deducted from your total.</AlertDescription>
          </Alert>

          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert className="mb-6 border-red-800 bg-red-900/20">
                  <AlertCircle className="h-5 w-5 text-red-300" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}
              {slotAvailable === false && (
                <Alert className="mb-6 border-red-800 bg-red-900/20">
                  <AlertCircle className="h-5 w-5 text-red-300" />
                  <AlertDescription className="text-red-200">Selected date/time is unavailable. Please choose another slot.</AlertDescription>
                </Alert>
              )}
              <div className="mb-6">
                <Label htmlFor="service" className="text-lg font-semibold mb-2 block">Select Service *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a braiding service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.name}>{service.name} - £{service.price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedServiceData && (
                <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800 text-gray-200">
                  <h3 className="font-semibold mb-3 text-white">Service Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-300" />{selectedServiceData.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Price</p>
                      <p className="font-semibold text-lg">£{selectedServiceData.price}</p>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-2"><span className="text-blue-300 font-semibold">Deposit Required:</span><span className="text-2xl font-bold text-blue-300">£{selectedServiceData.minDeposit}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-300">Balance Due (pay on day):</span><span className="font-semibold">£{selectedServiceData.price - selectedServiceData.minDeposit}</span></div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Label className="text-lg font-semibold mb-2 block">Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => !isAvailable(d)} initialFocus />
                    </PopoverContent>
                </Popover>
              </div>

                <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-gray-300 mt-2">Availability follows a two-week cycle that flips: Week A — work Mon/Tue and Sat/Sun (off Wed–Fri); Week B — work Wed/Thu/Fri (off Sat–Tue).</p>
                <div className="text-right mt-2">
                  {(() => {
                    const next = findNextAvailable(today);
                        return next ? (
                      <div className="space-x-2">
                        <span className="text-sm text-gray-200 mr-3">Next available:</span>
                        <Button onClick={() => setDate(next)} className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-gray-200">{format(next, 'EEE, d MMM')}</Button>
                      </div>
                    ) : <span className="text-sm text-gray-400">No availability found</span>;
                  })()}
                </div>
              </div>

              {/* Mini availability calendar: next 28 days */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Availability Calendar (next 4 weeks)</h4>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {[...Array(28)].map((_, i) => {
                    const day = addDays(today, i);
                    const available = isAvailable(day);
                    const isSelected = date && startOfDay(day).getTime() === startOfDay(date).getTime();
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => available && setDate(day)}
                        className={`py-2 px-1 rounded-md text-xs ${isSelected ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : available ? 'bg-green-900/20 border border-green-800 text-green-200' : 'bg-neutral-800 text-gray-400 cursor-not-allowed'}`}
                        aria-disabled={!available}
                        aria-label={`${format(day, 'EEEE, MMM d')}${available ? ' available' : ' unavailable'}`}
                      >
                        <div className="font-semibold">{format(day, 'EEE')}</div>
                        <div className="text-sm">{format(day, 'd')}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="time" className="text-lg font-semibold mb-2 block">Preferred Time *</Label>
                <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (<SelectItem key={time} value={time}>{time}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="mb-4">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter your full name" required />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="your.email@example.com" required />
                </div>
                <div className="mb-4">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+44 7XXX XXXXXX" required />
                </div>
                <div className="mb-4">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} placeholder="Any specific requests or questions?" rows={4} />
                </div>
              </div>

              <div className="bg-neutral-800 p-4 rounded-lg mb-6 text-sm text-gray-200">
                <p className="font-semibold mb-2">Booking Policy:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Deposits are non-refundable but transferable with 48 hours notice</li>
                  <li>Late arrivals may result in shortened appointment time</li>
                  <li>Please bring your own hair extensions if not purchasing from us</li>
                  <li>Payment can be made via bank transfer or cash</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold text-lg py-6" disabled={loading || !selectedService || !date || !formData.time || !formData.name || !formData.email || !formData.phone}>{loading ? 'Submitting...' : 'Submit Booking Request'}</Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}

