import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [items, setItems] = useState([])

  function addItem(item){
    setItems(prev => [...prev, item])
  }
  function removeItem(idx){
    setItems(prev => prev.filter((_,i)=>i!==idx))
  }
  function clear(){ setItems([]) }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}
