import React, { createContext, useContext, useState, useRef, useEffect } from 'react'

const SelectCtx = createContext(null)

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false)
  const items = useRef([])
  const [activeIndex, setActiveIndex] = useState(-1)

  const registerItem = (ref) => {
    items.current.push(ref)
  }
  const unregisterItem = (ref) => {
    items.current = items.current.filter((r) => r !== ref)
  }

  return (
    <SelectCtx.Provider value={{ value, onValueChange, open, setOpen, items, registerItem, unregisterItem, activeIndex, setActiveIndex }}>
      <div className="inline-block relative">{children}</div>
    </SelectCtx.Provider>
  )
}

export function SelectTrigger({ children, className = '' }) {
  const ctx = useContext(SelectCtx)
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={ctx.open}
      onClick={() => {
        ctx.setOpen(!ctx.open)
        if (!ctx.open) ctx.setActiveIndex(0)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          ctx.setOpen(true)
          ctx.setActiveIndex(0)
        }
      }}
      className={`w-full text-left rounded-md border px-3 py-2 ${className}`}
    >
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
  const itemsRef = ctx.items.current

  useEffect(() => {
    if (ctx.open && ctx.activeIndex >= 0 && itemsRef[ctx.activeIndex]) {
      itemsRef[ctx.activeIndex].current?.focus()
    }
  }, [ctx.open, ctx.activeIndex])

  const onKeyDown = (e) => {
    const len = itemsRef.length
    if (!len) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      ctx.setActiveIndex((i) => (i + 1) % len)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      ctx.setActiveIndex((i) => (i - 1 + len) % len)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const ref = itemsRef[ctx.activeIndex]
      ref?.current?.click()
    } else if (e.key === 'Escape') {
      ctx.setOpen(false)
    }
  }

  return (
    <div
      role="listbox"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`absolute z-50 mt-2 bg-white border border-gray-200 rounded shadow ${className} text-gray-900`}
    >
      {children}
    </div>
  )
}

export function SelectItem({ value, children }) {
  const ctx = useContext(SelectCtx)
  const ref = useRef(null)

  useEffect(() => {
    ctx.registerItem?.(ref)
    return () => ctx.unregisterItem?.(ref)
  }, [])

  return (
    <div
      ref={ref}
      role="option"
      tabIndex={-1}
      onClick={() => {
        ctx.onValueChange?.(value)
        ctx.setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          ctx.onValueChange?.(value)
          ctx.setOpen(false)
        }
      }}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
    >
      {children}
    </div>
  )
}

export default Select
