'use client'

import { useState } from 'react'
import Image       from 'next/image'
import Link        from 'next/link'

/* small helper to build hrefs from labels */
const path = (label: string) =>
  '/' + label.replace(/\s+/g, '-').toLowerCase()

/* nav labels */
const NAV_ITEMS = [
  'About Us',
  'Our Services',
  'Portfolio',
  'Blog',
  'Contact Us',
]

/* reusable circular progress SVG */
// function Ring({ pct }: { pct: number }) {
//   const r = 70
//   const c = 2 * Math.PI * r
//   const offset = c - (pct / 100) * c

//   return (
//     <svg viewBox="0 0 160 160" className="w-32 h-32 sm:w-36 sm:h-36">
//       <circle
//         cx="80"
//         cy="80"
//         r={r}
//         stroke="#ffffff55"
//         strokeWidth="14"
//         fill="none"
//       />
//       <circle
//         cx="80"
//         cy="80"
//         r={r}
//         stroke="#fff"
//         strokeWidth="14"
//         fill="none"
//         strokeDasharray={c}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         transform="rotate(-90 80 80)"
//       />
//       <text
//         x="80"
//         y="90"
//         fontSize="28"
//         textAnchor="middle"
//         fontWeight={600}
//         fill="#fff"
//       >
//         {pct}%
//       </text>
//     </svg>
//   )
// }

export default function HomePage() {
  const [open, setOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* ==== BACKGROUND IMAGE ==== */}
      <Image
        src="/home-bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* diagonal accent */}
      <div className="absolute -top-20 left-1/4 w-px h-[140vh] bg-white/80 rotate-45 -z-10" />

      {/* ==== NAVBAR ==================================================== */}
      <nav className="absolute top-0 inset-x-0 flex items-center justify-between px-6 sm:px-10 py-6 z-20">
        {/* logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="NVY Media" width={130} height={56} />
        </Link>

        {/* desktop links */}
        <ul className="hidden md:flex space-x-8 lg:space-x-10 text-lg font-medium uppercase">
          {NAV_ITEMS.map(label => (
            <li key={label}>
              <Link
                href={path(label)}
                className="hover:text-black transition-colors text-2xl"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* hamburger for mobile */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col space-y-1"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {/* mobile menu overlay */}
      {open && (
  /* 1) The overlay container listens for clicks and closes the menu */
  <div
    onClick={() => setOpen(false)}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center"
  >
    {/* 2) The UL stops click events from bubbling back up to the overlay */}
    <ul
      onClick={e => e.stopPropagation()}
      className="flex flex-col items-center space-y-8 text-2xl font-semibold uppercase"
    >
      {NAV_ITEMS.map(label => (
        <li key={label}>
          <Link
            href={path(label)}
            onClick={() => setOpen(false)}
            className="hover:text-gray-300"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}


      {/* ==== HERO TEXT ================================================= */}
      <section className="container mx-auto px-6 pt-36 sm:pt-44 md:pt-56 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Unlock Possibilities,
          <br />
          Elevate Your Game.
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl max-w-xl">
          We blend powerful PR with smart digital marketing to elevate your
          brand’s voice and visibility. Let’s turn attention into action!
        </p>

        <Link
          href="/contact-us"
          className="inline-block mt-10 bg-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 text-sm sm:text-base"
        >
          Connect With Us
        </Link>
      </section>


    </main>
  )
}
