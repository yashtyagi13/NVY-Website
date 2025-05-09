// src/app/api/submit-contact/route.ts
import { NextResponse } from 'next/server'

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID!
const HUBSPOT_FORM_ID   = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID!

export async function POST(req: Request) {
  try {
    // 1) pull your form data
    const { firstname, lastname, email, phone, services } = await req.json()

    // 2) build the HubSpot payload, mapping your `services` → HS internal name `address`
    const hubspotBody = {
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname',  value: lastname  },
        { name: 'email',     value: email     },
        { name: 'phone',     value: phone     },
        { name: 'address',   value: services  }, // ← use your HS internal name here!
      ],
      context: {
        pageUri:  req.headers.get('referer') || '',
        pageName: 'Custom Contact Form'
      }
    }

    // 3) POST into HubSpot’s Forms API
    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(hubspotBody),
      }
    )

    // 4) surface any HubSpot‐side error
    if (!hsRes.ok) {
      const detail = await hsRes.text()
      return NextResponse.json(
        { error: 'HubSpot API error', detail },
        { status: 502 }
      )
    }

    // 5) all good!
    return NextResponse.json({ success: true })
  } catch (err) {
    // catch any parsing / network errors
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: 'Internal server error', detail: message },
      { status: 500 }
    )
  }
}
