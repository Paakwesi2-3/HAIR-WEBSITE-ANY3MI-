import React from 'react'
import services from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function Services(){
  return (
    <div>
      <h1 className="text-2xl font-semibold">Services & Pricing</h1>
      <p className="text-sm text-gray-300 mt-1">Deposit requirements are shown per service.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s=> (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  )
}
