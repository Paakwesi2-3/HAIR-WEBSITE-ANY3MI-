import React from 'react'

export const Button = React.forwardRef(function Button({ children, className = '', ...props }, ref){
  return (
    <button
      ref={ref}
      {...props}
      className={`inline-flex items-center justify-center rounded-md transition-transform transform will-change-transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus:shadow-md ${className}`}
    >
      {children}
    </button>
  )
})

export default Button
