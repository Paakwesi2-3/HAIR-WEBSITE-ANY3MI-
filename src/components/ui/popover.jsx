import React, { useState, createContext, useContext } from 'react'

const PopCtx = createContext(null)

export function Popover({ children }) {
  const [open, setOpen] = useState(false)
  return <PopCtx.Provider value={{ open, setOpen }}>{children}</PopCtx.Provider>
}

export function PopoverTrigger({ asChild, children }) {
  const ctx = useContext(PopCtx)
  if (asChild) {
    return React.cloneElement(children, { onClick: () => ctx.setOpen(!ctx.open) })
  }
  return <button onClick={() => ctx.setOpen(!ctx.open)}>{children}</button>
}

export function PopoverContent({ children, className = '' }) {
  const ctx = useContext(PopCtx)
  if (!ctx.open) return null
  return <div className={`absolute z-50 bg-white border rounded p-2 ${className}`}>{children}</div>
}

export default Popover
