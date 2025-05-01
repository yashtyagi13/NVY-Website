'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const team = [
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team1.jpg' },
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team2.jpg' },
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team3.jpg' },
]

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  let autoScrollInterval: number

  useEffect(() => {
    const scrollNext = () => {
      const el = containerRef.current!
      const cardWidth = el.clientWidth / 4
      if (el.scrollLeft + cardWidth * 1.5 >= el.scrollWidth - el.clientWidth) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }

    // use window.setInterval so the return type is number
    autoScrollInterval = window.setInterval(scrollNext, 3000)
    return () => window.clearInterval(autoScrollInterval)
  }, [])

  const handlePrev = () => {
    const el = containerRef.current!
    const cardWidth = el.clientWidth / 4
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }

  const handleNext = () => {
    const el = containerRef.current!
    const cardWidth = el.clientWidth / 4
    el.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="bg-gray-50 py-16 px-6 text-center">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-extrabold">
        <span className="text-black">Our </span>
        <span className="text-purple-600">Team Members</span>
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
      <div className="mt-2 w-24 h-0.5 bg-black mx-auto" />

   {/* Slider */}
<div className="relative mt-8">
  <div
    ref={containerRef}
    className="
      flex
      overflow-x-auto
      scroll-smooth
      snap-x snap-mandatory
      px-4 sm:px-8 lg:px-20     /* container padding */
    "
    style={{
      scrollPadding: '1rem',   /* matches px-4 = 1rem */
      // For larger breakpoints, you could calculate dynamically or
      // use JS/CSS variables, but 1rem will cover the minimum.
    }}
  >
    {team.map(({ name, role, photo }, idx) => (
      <div
        key={idx}
        className="
          shrink-0
          w-64 sm:w-72 md:w-80 lg:w-1/4
          snap-start
          mx-2
          bg-white
          rounded-lg
          overflow-hidden
          shadow-lg
        "
      >
        <div className="relative h-64">
          <Image src={photo} alt={name} fill className="object-cover" />
        </div>
        <div className="bg-orange-500 px-4 py-2 text-white">
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{role}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Arrows (unchanged) */}
  <button
    aria-label="Previous"
    onClick={handlePrev}
    className="
      absolute top-1/2 -translate-y-1/2 left-0
      p-2 bg-white rounded-full shadow
      hover:bg-gray-100 transition
    "
  >
    ◀
  </button>
  <button
    aria-label="Next"
    onClick={handleNext}
    className="
      absolute top-1/2 -translate-y-1/2 right-0
      p-2 bg-white rounded-full shadow
      hover:bg-gray-100 transition
    "
  >
    ▶
  </button>
</div>


      {/* Footer Text */}
      <p className="mt-12 max-w-3xl mx-auto text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    </section>
  )
}
