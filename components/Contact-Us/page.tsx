// app/about-us/page.tsx
import Image from 'next/image'
import Link  from 'next/link'

export default function AboutUsPage() {
  const directors = [
    {
      name: `Nupur Ma'am`,
      role: 'Director',
      photo: '/director.jpg',
    },
    {
      name: 'Vinay Sir',
      role: 'Founder & CEO',
      photo: '/director.jpg',
    },
  ]

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

      {/* OUR DIRECTORS */}
      <section className="px-6 sm:px-12 lg:px-20 pb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Directors</h2>

        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {directors.map(({ name, role, photo }) => (
            <div key={name} className="max-w-xs mx-auto space-y-4">
              <div className="relative rounded-lg border-4 border-purple-600 overflow-hidden">
                <Image
                  src={photo}
                  alt={name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-700 to-transparent p-3">
                  <p className="text-lg font-semibold text-orange-400">
                    {name}
                  </p>
                  <p className="text-sm text-white">{role}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra.
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/about-us"
          className="mt-8 inline-block px-6 py-2 border-2 border-orange-400 text-orange-400 font-semibold rounded-full hover:bg-orange-400 hover:text-white transition-colors text-sm sm:text-base"
        >
          Read More
        </Link>
      </section>
    </main>
  )
}
