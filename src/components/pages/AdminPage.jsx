import React, { useEffect, useState } from 'react';
import { format, startOfDay, addDays } from 'date-fns';
import { Button } from '../ui/button';

export default function AdminPage({ onNavigate }) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [founderPreview, setFounderPreview] = useState(null);
  const [bookingToOpen, setBookingToOpen] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('disabledDates') || '[]';
      setDisabledDates(JSON.parse(raw || '[]'));
      const img = localStorage.getItem('founderImage');
      if (img) setFounderPreview(img);
    } catch (e) {
      setDisabledDates([]);
    }
    // parse booking id from URL hash (e.g. #admin?booking=12)
    try {
      const hash = window.location.hash || '';
      if (hash.includes('#admin')) {
        const parts = hash.split('?');
        if (parts[1]) {
          const params = new URLSearchParams(parts[1]);
          const bid = params.get('booking');
          if (bid) setBookingToOpen(Number(bid));
        }
      }
    } catch (e) { /* ignore */ }
    // load bookings
    loadBookings();
  }, []);

  let apiBase = 'http://localhost:4001';
  try {
    if (import.meta && import.meta.env && import.meta.env.VITE_API_URL) apiBase = import.meta.env.VITE_API_URL;
  } catch (e) {
    if (typeof process !== 'undefined' && process && process.env && process.env.REACT_APP_API_URL) {
      apiBase = process.env.REACT_APP_API_URL;
    }
  }

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`${apiBase}/api/bookings`);
      if (res.ok) {
        const body = await res.json();
        setBookings(body);
        // if opened via email link, open the requested booking for quick access
        if (bookingToOpen) {
          const found = body.find(b => Number(b.id) === Number(bookingToOpen));
          if (found) startEdit(found);
          setBookingToOpen(null);
        }
      }
    } catch (e) {
      // ignore
    } finally {
      setLoadingBookings(false);
    }
  };

  const startEdit = (b) => { setEditingId(b.id); setEditData({ ...b }); };
  const cancelEdit = () => { setEditingId(null); setEditData({}); };
  const saveEdit = async () => {
    try {
      const res = await fetch(`${apiBase}/api/bookings/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        await loadBookings();
        cancelEdit();
      } else {
        const b = await res.json().catch(() => ({}));
        alert(b.error || 'Failed to save');
      }
    } catch (e) { alert('Network error'); }
  };

  const actOn = async (id, action) => {
    try {
      const res = await fetch(`${apiBase}/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) loadBookings();
    } catch (e) { /* ignore */ }
  };

  const save = (arr) => {
    localStorage.setItem('disabledDates', JSON.stringify(arr));
    setDisabledDates(arr);
    // notify booking page in same tab
    window.dispatchEvent(new Event('disabledDatesUpdated'));
  };

  const toggleDate = (d) => {
    const key = startOfDay(d).toISOString().slice(0,10);
    const exists = disabledDates.includes(key);
    const next = exists ? disabledDates.filter(x => x !== key) : [...disabledDates, key];
    save(next);
  };

  const clearAll = () => save([]);

  const handleFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      localStorage.setItem('founderImage', data);
      setFounderPreview(data);
      // notify other pages
      window.dispatchEvent(new Event('founderImageUpdated'));
    };
    reader.readAsDataURL(file);
  };

  const removeFounder = () => {
    localStorage.removeItem('founderImage');
    setFounderPreview(null);
    window.dispatchEvent(new Event('founderImageUpdated'));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin — Manage Disabled Dates</h1>
        <div>
          <Button onClick={() => onNavigate('home')} className="mr-2">Exit Admin</Button>
          <Button onClick={clearAll} className="bg-red-500 text-white">Clear All</Button>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-4">Toggle dates below to mark them unavailable for booking. Changes are saved locally (localStorage) and take effect immediately.</p>

      <div className="grid grid-cols-7 gap-2">
          {([...Array(60)].map((_, i) => {
          const day = addDays(startOfDay(new Date()), i);
          const key = day.toISOString().slice(0,10);
          const disabled = disabledDates.includes(key);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggleDate(day)}
              className={`py-2 px-1 rounded-md text-xs ${disabled ? 'bg-red-900/20 border border-red-800 text-red-200' : 'bg-green-900/20 border border-green-800 text-green-200'}`}
            >
              <div className="font-semibold">{format(day, 'EEE')}</div>
              <div className="text-sm">{format(day, 'd MMM')}</div>
            </button>
          );
        }))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        {loadingBookings ? <div className="text-sm text-gray-400">Loading...</div> : (
          <div className="bg-neutral-800 rounded-lg p-4">
            {bookings.length === 0 ? <div className="text-sm text-gray-400">No bookings yet</div> : (
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="p-3 bg-neutral-900/20 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{b.name} <span className="text-sm text-gray-400">({b.email})</span></div>
                        <div className="text-sm text-gray-300">{b.service} — {b.date} @ {b.time}</div>
                        <div className="text-sm text-gray-400 mt-2">{b.notes}</div>
                      </div>
                      <div className="text-right">
                        <div className="mb-2"><span className={`px-2 py-1 rounded text-sm ${b.status === 'accepted' ? 'bg-green-600 text-white' : b.status === 'declined' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}>{b.status || 'pending'}</span></div>
                        <div className="flex gap-2">
                          <Button onClick={() => actOn(b.id, 'accepted')} className="bg-green-600 text-white">Accept</Button>
                          <Button onClick={() => actOn(b.id, 'declined')} className="bg-red-600 text-white">Decline</Button>
                          <Button onClick={() => startEdit(b)} variant="outline">Edit</Button>
                        </div>
                      </div>
                    </div>
                    {editingId === b.id && (
                      <div className="mt-3 border-t pt-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input className="p-2 bg-neutral-800 rounded" value={editData.name || ''} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                          <input className="p-2 bg-neutral-800 rounded" value={editData.email || ''} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                          <input className="p-2 bg-neutral-800 rounded" value={editData.service || ''} onChange={(e) => setEditData({ ...editData, service: e.target.value })} />
                          <input className="p-2 bg-neutral-800 rounded" value={editData.date || ''} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
                          <input className="p-2 bg-neutral-800 rounded" value={editData.time || ''} onChange={(e) => setEditData({ ...editData, time: e.target.value })} />
                          <input className="p-2 bg-neutral-800 rounded" value={editData.phone || ''} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button onClick={saveEdit} className="bg-blue-600 text-white">Save</Button>
                          <Button onClick={cancelEdit} variant="outline">Cancel</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Founder Photo</h3>
        <p className="text-sm text-gray-300 mb-2">Upload a photo for the About page. This is stored locally in your browser.</p>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files && e.target.files[0])}
          />
          {founderPreview ? (
            <div className="flex items-center gap-2">
              <img src={founderPreview} alt="preview" className="w-20 h-20 object-cover rounded-full border" />
              <Button onClick={removeFounder} className="bg-red-500 text-white">Remove</Button>
            </div>
          ) : <div className="text-sm text-gray-400">No image uploaded</div>}
        </div>
      </div>
    </div>
  );
}
