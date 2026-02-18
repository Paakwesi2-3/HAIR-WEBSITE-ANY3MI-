import React from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [openImage, setOpenImage] = useState(null)

  const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1733532915163-02915638c793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Box Braids', category: 'braids' },
    { id: 2, url: 'https://images.unsplash.com/photo-1588527962980-72746d95973e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Knotless Braids', category: 'braids' },
    { id: 3, url: 'https://images.unsplash.com/photo-1481385694031-f2b14f8621d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Cornrows', category: 'braids' },
    { id: 4, url: 'https://images.unsplash.com/photo-1747979022469-43e0f3d7641f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Straight Wig', category: 'wigs' },
    { id: 5, url: 'https://images.unsplash.com/photo-1664099160144-f6991681878d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Curly Wig', category: 'wigs' },
    { id: 6, url: 'https://images.unsplash.com/photo-1600879368265-74ef8b9d2735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', title: 'Braiding Extensions', category: 'extensions' }
  ]

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter(i => i.category === filter)

  return (
    <div>
      <section className="bg-gradient-to-r from-pink-500 to-blue-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Explore our portfolio of stunning braiding styles and premium wigs</p>
        </div>
      </section>

      <section className="py-8 bg-neutral-900/10 border-b border-neutral-800">
        <div className="container mx-auto px-4 flex justify-center gap-3">
          <Button onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : ''}>All</Button>
          <Button onClick={() => setFilter('braids')} className={filter === 'braids' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : ''}>Braids</Button>
          <Button onClick={() => setFilter('wigs')} className={filter === 'wigs' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : ''}>Wigs</Button>
          <Button onClick={() => setFilter('extensions')} className={filter === 'extensions' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : ''}>Extensions</Button>
        </div>
      </section>

      <section className="py-16 bg-neutral-900/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(img => (
              <Dialog key={img.id} open={openImage === img.id} onOpenChange={(open) => { if (!open) setOpenImage(null) }}>
                <DialogTrigger asChild>
                  <div onClick={() => setOpenImage(img.id)} className="relative group cursor-pointer overflow-hidden rounded-lg">
                    <img src={img.url} alt={img.title} className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white font-semibold text-lg p-4">{img.title}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative">
                    <button onClick={() => setOpenImage(null)} className="absolute right-2 top-2 p-2 rounded bg-neutral-800 text-white"><X /></button>
                    <img src={img.url} alt={img.title} className="w-full h-auto rounded-lg" />
                    <h3 className="text-2xl font-bold mt-4">{img.title}</h3>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
