import type React from "react"
import type { Metadata } from "next"
import "../app/globals.css"

export const metadata: Metadata = {
  title: "Wedding RSVP",
  description: "Please RSVP for our wedding celebration",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
