// components/Portfolio/page.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface Slide {
  image: string
  caption: string
}

const slides: Slide[] = [
  { image: '/home-bg.jpg', caption: 'Rajnath Singh – Digital Campaign' },
  { image: '/home-bg.jpg', caption: 'Amit Shah – Social Outreach' },
  { image: '/home-bg.jpg', caption: 'Narendra Modi – National Rally' },
]

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  // auto-advance every 4s
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (current + 1) % slides.length
      setCurrent(next)
      scrollTo(next)
    }, 4000)
    return () => window.clearInterval(id)
  }, [current])

  const scrollTo = (i: number) => {
    const el = containerRef.current!
    el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }

  const prev = () => {
    const idx = (current - 1 + slides.length) % slides.length
    setCurrent(idx)
    scrollTo(idx)
  }
  const next = () => {
    const idx = (current + 1) % slides.length
    setCurrent(idx)
    scrollTo(idx)
  }

  return (
    <section className="relative bg-gradient-to-b from-purple-600 to-purple-300 py-16 px-6 overflow-hidden">
      {/* subtle background image */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />

      {/* Title & description */}
      <div className="relative z-10 text-center mb-12">
      <h1 className="text-6xl sm:text-7xl font-bold text-white">Portfolio</h1>
        <div className="
     mt-6
  mx-auto max-w-3xl
  bg-gradient-to-r from-purple-800 to-purple-400
  bg-opacity-80
  backdrop-blur-md
  rounded-lg
  p-6
  ">
  <p className="text-white text-lg">
 tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
  </p>
</div>

      </div>

      {/* Slider */}
      <div className="relative max-w-4xl mx-auto">
        <div ref={containerRef} className="flex overflow-hidden snap-x snap-mandatory scroll-smooth">
          {slides.map((s, i) => (
            <div key={i} className="shrink-0 w-full snap-center px-2">
              <div className="relative h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden">
                <Image src={s.image} alt={s.caption} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Prev/Next */}
        <button
          onClick={prev}
          className="absolute top-1/2 -translate-y-1/2 left-0 p-3 bg-white/80 rounded-full hover:bg-white z-20"
          aria-label="Previous slide"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-white/80 rounded-full hover:bg-white z-20"
          aria-label="Next slide"
        >
          ▶
        </button>

        {/* Caption */}
        <div className="mt-4 text-center relative z-10">
          <span className="inline-block bg-purple-700 text-white px-4 py-2 rounded">
            {slides[current].caption}
          </span>
        </div>
      </div>
    </section>
  )
}
