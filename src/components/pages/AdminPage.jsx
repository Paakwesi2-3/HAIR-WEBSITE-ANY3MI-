import React, { useEffect, useState } from 'react';
import { format, startOfDay, addDays } from 'date-fns';
import { Button } from '../ui/button';

export default function AdminPage({ onNavigate }) {
  const [disabledDates, setDisabledDates] = useState([]);
  const [founderPreview, setFounderPreview] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('disabledDates') || '[]';
      setDisabledDates(JSON.parse(raw || '[]'));
      const img = localStorage.getItem('founderImage');
      if (img) setFounderPreview(img);
    } catch (e) {
      setDisabledDates([]);
    }
  }, []);

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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
