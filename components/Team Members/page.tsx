'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const team = [
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team1.jpg' },
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team2.jpg' },
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team3.jpg' },
  { name: 'Swadha Mishra', role: 'Manager', photo: '/images/team4.jpg' },
]

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [scrollPad, setScrollPad] = useState('1rem')

  useEffect(() => {
    setIsMounted(true)

    // Remove injected Grammarly attributes:
    document.body.removeAttribute('data-new-gr-c-s-check-loaded')
    document.body.removeAttribute('data-gr-ext-installed')

    // Responsive scroll-padding
    const updatePad = () => {
      const w = window.innerWidth
      if (w >= 1024) setScrollPad('5rem')
      else if (w >= 640) setScrollPad('2rem')
      else setScrollPad('1rem')
    }
    updatePad()
    window.addEventListener('resize', updatePad)

    // Auto-scroll every 3s
    const scrollNext = () => {
      const el = containerRef.current!
      const cardWidth = el.clientWidth / 4
      if (el.scrollLeft + cardWidth * 1.5 >= el.scrollWidth - el.clientWidth) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }
    const id = window.setInterval(scrollNext, 3000)

    return () => {
      window.clearInterval(id)
      window.removeEventListener('resize', updatePad)
    }
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
      <h2 className="text-3xl sm:text-4xl font-extrabold">
        <span className="text-black">Our </span>
        <span className="text-purple-600">Team Members</span>
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
      <div className="mt-2 w-24 h-0.5 bg-black mx-auto" />

      {isMounted && (
        <div className="relative mt-8">
          <div
            ref={containerRef}
            className="
              flex overflow-x-auto scroll-smooth snap-x snap-mandatory
              px-4 sm:px-8 lg:px-20
            "
            style={{ scrollPadding: scrollPad }}
          >
            {team.map(({ name, role, photo }, idx) => (
              <div
                key={idx}
                className="
                  shrink-0 w-64 sm:w-72 md:w-80 lg:w-1/4
                  snap-start mx-2 bg-white rounded-lg overflow-hidden shadow-lg
                "
              >
                <div className="relative h-64">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-orange-500 px-4 py-2 text-white">
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm">{role}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            ◀
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            ▶
          </button>
        </div>
      )}

      <p className="mt-12 max-w-3xl mx-auto text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    </section>
  )
}
