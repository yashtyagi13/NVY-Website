// components/Navbar.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav
      className="
        w-full
        bg-[url('/images/navbar-bg.jpg')] bg-cover bg-center
        px-8 py-4
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="NVY Media"
              width={120}
              height={40}
            />
          </a>
        </Link>

        {/* Nav links */}
        <ul className="flex space-x-8 text-white text-lg font-medium uppercase">
          <li>
            <Link href="/about-us">
              <a className="hover:text-gray-200">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/our-services">
              <a className="hover:text-gray-200">Our Services</a>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <a className="hover:text-gray-200">Portfolio</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className="hover:text-gray-200">Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/contact-us">
              <a className="hover:text-gray-200">Contact Us</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
