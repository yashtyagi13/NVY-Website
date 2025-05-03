// app/about-us/page.tsx
import Image from 'next/image'
import Link  from 'next/link'

export default function AboutUsPage() {
 
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HEADER */}
      <section className="py-12 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-600">
          About Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          ipsum suspendisse ultrices gravida.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="flex flex-col lg:flex-row items-center bg-purple-600 text-white rounded-xl overflow-hidden mx-4 sm:mx-12 lg:mx-20 mb-16">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <Image
            src="/mission-vision.jpg"
            alt="Mission & Vision"
            width={640}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">MISSION & VISION</h2>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
          <Link
            href="/about-us"
            className="inline-block text-orange-400 font-semibold uppercase text-sm sm:text-base"
          >
            Read More
          </Link>
        </div>
      </section>

     
    </main>
  )
}
