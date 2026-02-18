import React from 'react'

export function Badge({ children, className = '', variant }){
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium'
  const v = variant === 'secondary' ? 'bg-neutral-700 text-gray-200' : ''
  return <span className={`${base} ${v} ${className}`}>{children}</span>
}

export default Badge
