import React, { useState } from 'react'
import services from '../data/services'

export default function BookingForm(){
  const [selected, setSelected] = useState(services[0].id)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const service = services.find(s=>s.id===Number(selected))
  const balance = service ? service.price - service.deposit : 0

  function handleSubmit(e){
    e.preventDefault()
    setSubmitted({ name, email, date, service })
  }

  if(submitted){
    return (
      <div className="p-6 border rounded">
        <h3 className="text-xl font-semibold">Booking confirmation</h3>
        <p className="mt-2">Thank you, {submitted.name}. Your booking for <strong>{submitted.service.name}</strong> on <strong>{submitted.date}</strong> has been received.</p>
        <p className="mt-2">Deposit required: £{submitted.service.deposit} — Balance due: £{submitted.service.price - submitted.service.deposit}</p>
        <p className="mt-2 text-sm text-gray-600">Next steps: Please follow the payment instructions sent to {submitted.email}. We will reserve your appointment once deposit is received.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Service</label>
        <select value={selected} onChange={e=>setSelected(e.target.value)} className="mt-1 block w-full border rounded p-2">
          {services.map(s=> (
            <option key={s.id} value={s.id}>{s.name} — £{s.price} (Deposit £{s.deposit})</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Preferred date & time</label>
        <input required type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 block w-full border rounded p-2" />
      </div>
      <div className="p-4 bg-gray-50 rounded">
        <div>Selected service deposit: <span className="text-pink-500">£{service.deposit}</span></div>
        <div>Balance due at appointment: <span className="font-semibold">£{balance}</span></div>
      </div>
      <div>
        <button type="submit" className="px-4 py-2 rounded text-white" style={{background:'#EC4899'}}>Confirm booking</button>
      </div>
    </form>
  )
}
