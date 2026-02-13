import React from 'react'
import ProductCard from '../components/ProductCard'

const products = [
  { id: 1, name: 'Lace Front Wig - Natural', price: 120 },
  { id: 2, name: 'Synthetic Wig - Curly', price: 60 },
  { id: 3, name: 'Braiding Hair Bundle (3pcs)', price: 25 }
]

export default function Shop(){
  return (
    <div>
      <h1 className="text-2xl font-semibold">Shop</h1>
      <p className="text-sm text-gray-600 mt-1">Wigs and braiding hair products. Use the cart to manage purchases.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
