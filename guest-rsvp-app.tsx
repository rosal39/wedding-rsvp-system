"use client"

import { useState } from "react"
import GuestVerification from "./components/guest-verification"
import RSVPForm from "./components/rsvp-form"
import RSVPSuccess from "./components/rsvp-success"
import CustomCursor from "./components/custom-cursor"
import type { Guest, RSVPResponse } from "./types/rsvp"

// Sample guest list - replace with your actual guest list
const SAMPLE_GUEST_LIST: Guest[] = [
  { id: "1", name: "John Smith", email: "john.smith@email.com" },
  { id: "2", name: "Jane Doe", email: "jane.doe@email.com" },
  { id: "3", name: "Michael Johnson", email: "michael.j@email.com" },
  { id: "4", name: "Sarah Wilson", email: "sarah.wilson@email.com" },
  { id: "5", name: "David Brown", email: "david.brown@email.com" },
]

type RSVPStep = "verification" | "form" | "success"

export default function GuestRSVPApp() {
  const [currentStep, setCurrentStep] = useState<RSVPStep>("verification")
  const [verifiedGuest, setVerifiedGuest] = useState<Guest | null>(null)
  const [lastResponse, setLastResponse] = useState<RSVPResponse | null>(null)

  const handleGuestVerified = (guest: Guest) => {
    setVerifiedGuest(guest)
    setCurrentStep("form")
  }

  const handleRSVPSubmit = async (response: RSVPResponse) => {
    // Here you would typically send the data to your backend/database
    // For now, we'll simulate saving to localStorage for demo purposes
    try {
      const existingResponses = JSON.parse(localStorage.getItem("rsvp-responses") || "[]")
      const updatedResponses = [...existingResponses, response]
      localStorage.setItem("rsvp-responses", JSON.stringify(updatedResponses))

      setLastResponse(response)
      setCurrentStep("success")
    } catch (error) {
      console.error("Error saving RSVP:", error)
    }
  }

  const handleStartOver = () => {
    setCurrentStep("verification")
    setVerifiedGuest(null)
    setLastResponse(null)
  }

  const renderCurrentStep = () => {
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
    <div className="relative w-full">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main RSVP Content */}
      {renderCurrentStep()}
    </div>
  )
}
