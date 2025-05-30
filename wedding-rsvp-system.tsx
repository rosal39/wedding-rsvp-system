"use client"

import { useState } from "react"
import GuestVerification from "./components/guest-verification"
import RSVPForm from "./components/rsvp-form"
import RSVPSuccess from "./components/rsvp-success"
import RSVPAdmin from "./components/rsvp-admin"
import CustomCursor from "./components/custom-cursor"
import { Button } from "@/components/ui/button"
import type { Guest, RSVPResponse } from "./types/rsvp"

// Sample guest list - replace with your actual guest list
const SAMPLE_GUEST_LIST: Guest[] = [
  { id: "1", name: "John Smith", email: "john.smith@email.com" },
  { id: "2", name: "Jane Doe", email: "jane.doe@email.com" },
  { id: "3", name: "Michael Johnson", email: "michael.j@email.com" },
  { id: "4", name: "Sarah Wilson", email: "sarah.wilson@email.com" },
  { id: "5", name: "David Brown", email: "david.brown@email.com" },
]

type ViewMode = "guest" | "admin"
type RSVPStep = "verification" | "form" | "success"

export default function Component() {
  const [viewMode, setViewMode] = useState<ViewMode>("guest")
  const [currentStep, setCurrentStep] = useState<RSVPStep>("verification")
  const [verifiedGuest, setVerifiedGuest] = useState<Guest | null>(null)
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [lastResponse, setLastResponse] = useState<RSVPResponse | null>(null)

  const handleGuestVerified = (guest: Guest) => {
    setVerifiedGuest(guest)
    setCurrentStep("form")
  }

  const handleRSVPSubmit = (response: RSVPResponse) => {
    setResponses((prev) => [...prev, response])
    setLastResponse(response)
    setCurrentStep("success")
  }

  const handleStartOver = () => {
    setCurrentStep("verification")
    setVerifiedGuest(null)
    setLastResponse(null)
  }

  const renderGuestView = () => {
    switch (currentStep) {
      case "verification":
        return <GuestVerification onGuestVerified={handleGuestVerified} guestList={SAMPLE_GUEST_LIST} />
      case "form":
        return verifiedGuest ? (
          <RSVPForm guest={verifiedGuest} onSubmit={handleRSVPSubmit} onBack={() => setCurrentStep("verification")} />
        ) : null
      case "success":
        return lastResponse ? <RSVPSuccess response={lastResponse} onStartOver={handleStartOver} /> : null
      default:
        return null
    }
  }

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* View Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-sm shadow-2xl p-2 flex gap-2 transform transition-all duration-300 hover:translate-y-[-2px]">
          <Button
            size="sm"
            variant={viewMode === "guest" ? "default" : "outline"}
            onClick={() => setViewMode("guest")}
            className={
              viewMode === "guest"
                ? "bg-blue-600/90 hover:bg-blue-700 text-white"
                : "border-gray-700 text-gray-300 hover:bg-gray-900"
            }
            data-cursor-text="Switch to guest view"
          >
            Guest View
          </Button>
          <Button
            size="sm"
            variant={viewMode === "admin" ? "default" : "outline"}
            onClick={() => setViewMode("admin")}
            className={
              viewMode === "admin"
                ? "bg-blue-600/90 hover:bg-blue-700 text-white"
                : "border-gray-700 text-gray-300 hover:bg-gray-900"
            }
            data-cursor-text="Switch to admin view"
          >
            Admin View
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "guest" ? renderGuestView() : <RSVPAdmin responses={responses} />}
    </div>
  )
}
