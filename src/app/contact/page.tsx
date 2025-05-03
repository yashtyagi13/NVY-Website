// src/app/contact/page.tsx
import CustomContactForm from '../../../components/CustomContactForm'

export default function ContactPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
      {/* 
        We constrain the width so the form never stretches too wide,
        and center it both vertically & horizontally 
      */}
      <div className="w-full max-w-3xl">
        {/* Optional: heading above the form */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center uppercase">
          CONNECT WITH US
        </h2>
        <CustomContactForm />
      </div>
    </section>
  )
}
