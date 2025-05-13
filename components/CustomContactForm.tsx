'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast' // optional for feedback

export default function CustomContactForm() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    services: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      toast.success('Thank you! We’ll be in touch.')
      setForm({ firstname: '', lastname: '', email: '', phone: '', services: '' })
    } catch (err) {
      console.error(err)
      toast.error('Submission failed—please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        grid grid-cols-1 sm:grid-cols-2 gap-4
        max-w-lg mx-auto
      "
    >
      {/* First Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          First Name
        </label>
        <input
          type="text"
          required
          value={form.firstname}
          onChange={e => setForm({ ...form, firstname: e.target.value })}
          className="
            w-full
            p-3
            bg-gray-100
            border border-gray-300
            rounded-lg
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-700
            transition
          "
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Last Name
        </label>
        <input
          type="text"
          required
          value={form.lastname}
          onChange={e => setForm({ ...form, lastname: e.target.value })}
          className="
            w-full
            p-3
            bg-gray-100
            border border-gray-300
            rounded-lg
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-700
            transition
          "
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="
            w-full
            p-3
            bg-gray-100
            border border-gray-300
            rounded-lg
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-700
            transition
          "
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Phone
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="
            w-full
            p-3
            bg-gray-100
            border border-gray-300
            rounded-lg
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-700
            transition
          "
        />
      </div>

      {/* SERVICES – now spans full width */}
      <div className="sm:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">
          Which Services Are You Willing To Take
        </label>
        <input
          type="text"
          value={form.services}
          onChange={e => setForm({ ...form, services: e.target.value })}
          className="
            w-full
            p-3
            bg-gray-100
            border border-gray-300
            rounded-lg
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-700
            transition
          "
        />
      </div>

      {/* SUBMIT – also spans both columns */}
      <button
        type="submit"
        disabled={loading}
        className="
          sm:col-span-2
          mt-4
          w-full
          bg-purple-700 hover:bg-purple-800
          text-white font-semibold
          py-4
          rounded-lg
          transition
          disabled:opacity-50
        "
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>
    </form>
  )
}
