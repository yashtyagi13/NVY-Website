// global.d.ts
// Allow imports from 'js-cookie'
declare module 'js-cookie'

// Allow the HubSpot forms global
interface Window {
  hbspt: any
}

export {};

declare global {
  var mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

