import React from 'react'

export function Card({ children, className = '' }){
  return (
    <div className={`bg-neutral-800 rounded-lg transition-transform transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default Card
