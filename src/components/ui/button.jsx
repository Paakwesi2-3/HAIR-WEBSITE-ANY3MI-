import React from 'react'

export function Button({ children, className = '', ...props }){
  return (
    <button {...props} className={`inline-flex items-center justify-center rounded-md ${className}`}>
      {children}
    </button>
  )
}

export default Button
