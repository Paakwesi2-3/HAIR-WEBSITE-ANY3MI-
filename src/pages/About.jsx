import React from 'react'

export default function About(){
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="text-sm text-gray-700 mt-4">Excella Braids is a professional UK-based hair braiding and wig business focused on quality, care and customer experience. We offer a range of styles, transparent pricing, and secure booking with deposit protection.</p>
      <section className="mt-6">
        <h2 className="font-semibold">Values</h2>
        <ul className="list-disc pl-5 text-sm mt-2 text-gray-600">
          <li>Professional and hygienic service</li>
          <li>Transparent pricing and deposit policy</li>
          <li>Supportive, welcoming environment</li>
        </ul>
      </section>
    </div>
  )
}
