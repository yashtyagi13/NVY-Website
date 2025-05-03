// global.d.ts
// Allow imports from 'js-cookie'
declare module 'js-cookie'

// Allow the HubSpot forms global
interface Window {
  hbspt: any
}
