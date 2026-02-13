import React from 'react'

export function Sheet({ children, open, onOpenChange }){
  return <div>{children}</div>
}

export function SheetTrigger({ children, asChild }){ return <>{children}</> }

export function SheetContent({ children, side = 'right', className = '' }){ 
  return (
    <div className={`fixed top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full bg-white shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default Sheet
