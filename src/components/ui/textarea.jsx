import React from 'react'

export function Textarea(props) {
  const { className = '', ...rest } = props
  return (
    <textarea {...rest} className={`w-full rounded-md border px-3 py-2 text-sm ${className}`} />
  )
}

export default Textarea
