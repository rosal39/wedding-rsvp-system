"use client"

import GuestRSVPApp from "./guest-rsvp-app"

// This is the main component for the guest-facing RSVP page
// This will be deployed separately and embedded in Wix
export default function WixGuestPage() {
  return (
    <div className="w-full min-h-screen">
      <GuestRSVPApp />
    </div>
  )
}
