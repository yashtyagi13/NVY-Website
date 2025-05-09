// src/app/api/submit-contact/route.ts
import { NextResponse } from 'next/server'

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID!
const HUBSPOT_FORM_ID   = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID!

export async function POST(req: Request) {
  const { firstname, lastname, email, phone, services } = await req.json()

  // Build the payload exactly matching your HubSpot form fields:
  const hubspotBody = {
    fields: [
      { name: 'firstname', value: firstname },
      { name: 'lastname',  value: lastname  },
      { name: 'email',     value: email     },
      { name: 'phone',     value: phone     },
      // map your “Which Services…” into the HubSpot property named `address`
      { name: 'address',   value: services  },
    ],
    context: {
      pageUri:  req.headers.get('referer') || '',
      pageName: 'Custom Contact Form',
    },
  }

  // POST to HubSpot
  const hsRes = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(hubspotBody),
    }
  )

  // If HubSpot rejects it, bubble up the error
  if (!hsRes.ok) {
    const text = await hsRes.text()
    console.error('HubSpot error:', hsRes.status, text)
    return NextResponse.json(
      { error: 'HubSpot rejected submission', detail: text },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}
