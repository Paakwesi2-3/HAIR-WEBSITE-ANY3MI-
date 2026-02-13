import React from 'react'
import BookingForm from '../components/BookingForm'

export default function Booking(){
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Booking</h1>
      <p className="text-sm text-gray-600 mt-1">Choose a service, pay the deposit, and reserve your appointment.</p>
      <div className="mt-6">
        <BookingForm />
      </div>
      <section className="mt-8 p-4 border rounded">
        <h2 className="font-semibold">Booking policy</h2>
        <p className="text-sm text-gray-600 mt-2">Deposits are non-refundable but transferable in certain circumstances. A deposit reserves your appointment; full payment is due on the day unless otherwise arranged.</p>
      </section>
    </div>
  )
}
