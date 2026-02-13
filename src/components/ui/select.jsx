import React, { createContext, useContext, useState } from 'react'

const SelectCtx = createContext(null)

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false)
  return (
    <SelectCtx.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="inline-block relative">{children}</div>
    </SelectCtx.Provider>
  )
}

export function SelectTrigger({ children, className = '' }) {
  const ctx = useContext(SelectCtx)
  return (
    <button type="button" onClick={() => ctx.setOpen(!ctx.open)} className={`w-full text-left rounded-md border px-3 py-2 ${className}`}>
      {children}
    </button>
  )
}

export function SelectValue({ placeholder = 'Select...' }) {
  const ctx = useContext(SelectCtx)
  return <span>{ctx.value || placeholder}</span>
}

export function SelectContent({ children, className = '' }) {
  const ctx = useContext(SelectCtx)
  if (!ctx.open) return null
  return (
    <div className={`absolute z-50 mt-2 bg-white border rounded shadow ${className}`}>
      {children}
    </div>
  )
}

export function SelectItem({ value, children }) {
  const ctx = useContext(SelectCtx)
  return (
    <div
      role="option"
      onClick={() => {
        ctx.onValueChange?.(value)
        ctx.setOpen(false)
      }}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  )
}

export default Select
