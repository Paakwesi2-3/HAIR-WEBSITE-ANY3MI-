import React from 'react'

export function Input(props) {
  const { className = '', ...rest } = props
  return (
    <input
      {...rest}
      className={`w-full rounded-md border px-3 py-2 text-sm ${className}`}
    />
  )
}

export default Input
