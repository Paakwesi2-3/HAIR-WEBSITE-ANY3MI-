import React from 'react'

export function Calendar({ mode, selected, onSelect, disabled }) {
  // Simple date input that calls onSelect with a Date object
  return (
    <div className="p-2">
      <input
        type="date"
        value={selected ? new Date(selected).toISOString().slice(0,10) : ''}
        onChange={(e) => onSelect && onSelect(new Date(e.target.value))}
        className="rounded-md border px-2 py-1"
      />
    </div>
  )
}

export default Calendar
