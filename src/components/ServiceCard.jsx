import React from 'react'

export default function ServiceCard({ service }){
  const img = `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=60`
  return (
    <div className="border rounded-lg p-0 overflow-hidden shadow-sm">
      <img src={img} alt={service.name} className="w-full h-40 object-cover" />
      <div className="p-4 bg-neutral-800">
        <h3 className="text-lg font-semibold text-white">{service.name}</h3>
        <p className="text-sm text-gray-300">Price: £{service.price}</p>
        <p className="text-sm text-pink-300 font-medium">Deposit: £{service.deposit}</p>
      </div>
    </div>
  )
}
