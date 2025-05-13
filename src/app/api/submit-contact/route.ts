// src/app/api/submit-contact/route.ts
import { NextResponse } from 'next/server'

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID!
const FORM_ID   = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID!

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, phone, services } = await req.json()

    const hubspotBody = {
      submittedAt: Date.now(),
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname',  value: lastname  },
        { name: 'email',     value: email     },
        { name: 'phone',     value: phone     },
        // your HubSpot property is called "address" internally:
        { name: 'address',   value: services  },
      ],
      context: {
        pageUri:  req.headers.get('referer') || '',
        pageName: 'Custom Contact Form',
      },
      /* If your form has GDPR enabled, uncomment & configure:
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow NVY to store and process my data.",
          communications: [
            { 
              value: true, 
              subscriptionTypeId: 999, // replace with your HubSpot subscriptionTypeId 
              text: "Yes, I’d like to receive marketing emails." 
            }
          ]
        }
      }
      */
    }

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotBody),
      }
    )

    const text = await hsRes.text()
    if (!hsRes.ok) {
      console.error('❌ HubSpot API Error:', text)
      return NextResponse.json({ error: text }, { status: hsRes.status })
    }

    console.log('✅ HubSpot API Success:', text)
    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('⚠️ submit-contact route caught exception:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
