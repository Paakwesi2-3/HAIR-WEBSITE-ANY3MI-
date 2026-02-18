import React from 'react'

export default function Gallery(){
  const images = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1533236896876-0f0f30c6c3f0?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60',
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold">Gallery</h1>
      <p className="text-sm text-gray-300 mt-1">Portfolio showcasing different hairstyles and products. Replace placeholders with your images.</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({length:12}).map((_,i)=> (
          <div key={i} className="h-40 bg-neutral-800 overflow-hidden rounded">
            <img src={images[i % images.length]} alt={`gallery-${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
