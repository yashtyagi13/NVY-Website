'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface Member {
  name: string
  role: string
  photo: string
  description: string
}

const team: Member[] = [
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/home-bg.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Swadha Mishra',
    role: 'Manager',
    photo: '/mission-vision.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  // …others
]

export default function TeamMembersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const next = () => {
      const idx = (current + 1) % team.length
      setCurrent(idx)
      scrollTo(idx)
    }
    const id = window.setInterval(next, 4000)
    return () => window.clearInterval(id)
  }, [current])

  const itemsPerView = () =>
    window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1

  const scrollTo = (i: number) => {
    const el = containerRef.current!
    const cw = el.clientWidth / itemsPerView()
    el.scrollTo({ left: cw * i, behavior: 'smooth' })
  }
  const handlePrev = () => {
    const idx = (current - 1 + team.length) % team.length
    setCurrent(idx)
    scrollTo(idx)
  }
  const handleNext = () => {
    const idx = (current + 1) % team.length
    setCurrent(idx)
    scrollTo(idx)
  }

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Our <span className="text-purple-600">Team Members</span>
        </h2>
        <p className="text-gray-700 mt-2">
          Meet the talented individuals who drive our success.
        </p>
      </div>

      <div className="relative max-w-8xl mx-auto">
        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-snap-x snap-mandatory"
        >
          {team.map((m, i) => (
            <div
              key={i}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/4 scroll-snap-align-start p-4"
            >
            <div className="flex flex-col h-[500px] bg-white rounded-xl overflow-hidden border-4 border-yellow-400 shadow-lg">
  {/* Image: takes up 2/3 of height */}
  <div className="relative w-full flex-shrink-0 h-[66%]">
    <Image
      src={m.photo}
      alt={m.name}
      fill
      className="object-fit "
    />
  </div>

  {/* Text section */}
  <div className="p-4 h-[34%] flex flex-col justify-center">
    <h3 className="text-xl font-semibold">{m.name}</h3>
    <p className="text-orange-500">{m.role}</p>
  </div>
</div>

            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
        >
          ▶
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                scrollTo(i)
              }}
              className={`w-3 h-3 rounded-full ${
                current === i ? 'bg-yellow-400' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
