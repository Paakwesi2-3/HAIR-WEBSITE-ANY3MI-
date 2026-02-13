import React, { createContext, useContext, useState } from 'react'

const DialogContext = createContext(null)

export function Dialog({ children }){
  const [open, setOpen] = useState(false)
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ children, asChild }){
  const ctx = useContext(DialogContext)
  if(!ctx) return null
  const child = React.Children.only(children)
  return React.cloneElement(child, { onClick: () => ctx.setOpen(true) })
}

export function DialogContent({ children, className = '' }){
  const ctx = useContext(DialogContext)
  if(!ctx) return null
  if(!ctx.open) return null
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => ctx.setOpen(false)} />
      <div className={`relative bg-white rounded-lg overflow-auto max-h-[90vh] w-full ${className}`}>
        <div className="p-4">
          {children}
          <div className="text-right mt-4">
            <button onClick={() => ctx.setOpen(false)} className="px-4 py-2 rounded border">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
