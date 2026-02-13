import React, { useState } from 'react'

export default function Contact(){
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    setSent(true)
  }

  if(sent){
    return <div className="p-6 border rounded">Thanks — your inquiry has been received. We will reply shortly.</div>
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-sm text-gray-600 mt-1">Email, phone, or use the form below for inquiries.</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm">Message</label>
          <textarea required value={msg} onChange={e=>setMsg(e.target.value)} className="mt-1 block w-full border rounded p-2" rows={4} />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 rounded text-white" style={{background:'#EC4899'}}>Send inquiry</button>
        </div>
      </form>
    </div>
  )
}
