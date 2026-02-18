import React from 'react'
import { useCart } from './CartContext'

export default function ProductCard({ product }){
  const { addItem } = useCart()
  const img = `https://images.unsplash.com/photo-1533236896876-0f0f30c6c3f0?auto=format&fit=crop&w=1000&q=60`
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img src={img} alt={product.name} className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105" />
      <div className="p-4 bg-neutral-800">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-300">Price: £{product.price}</p>
        <button onClick={()=>addItem(product)} className="mt-3 px-3 py-2 rounded text-white bg-blue-500">Add to cart</button>
      </div>
    </div>
  )
}
