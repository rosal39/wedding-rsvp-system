"use client"

import AdminRSVPApp from "./admin-rsvp-app"

// This is the main component for the admin dashboard
// This will be deployed separately with password protection
export default function AdminPage() {
  return (
    <div className="w-full min-h-screen">
      <AdminRSVPApp />
    </div>
  )
}
