import React from 'react'

export function Alert({ children, className = '' }){
  return <div className={`p-4 rounded-md ${className}`}>{children}</div>
}

export function AlertDescription({ children, className = '' }){
  return <div className={className}>{children}</div>
}

export default Alert
