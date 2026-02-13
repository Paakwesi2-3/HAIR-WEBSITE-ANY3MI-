import React, { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

export function Tabs({ children, defaultValue = '', className = '' }){
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '' }){
  return <div className={className}>{children}</div>
}

export function TabsTrigger({ value, children, className = '' }){
  const ctx = useContext(TabsContext)
  if(!ctx) return null
  const active = ctx.value === value
  return (
    <button onClick={() => ctx.setValue(value)} className={`${className} ${active ? 'font-semibold' : ''}`}>
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '' }){
  const ctx = useContext(TabsContext)
  if(!ctx) return null
  return ctx.value === value ? <div className={className}>{children}</div> : null
}

export default Tabs
