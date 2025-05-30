"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import GuestVerification from "../components/guest-verification"
import RSVPForm from "../components/rsvp-form"
import RSVPSuccess from "../components/rsvp-success"
import CustomCursor from "../components/custom-cursor"
import type { Guest, RSVPResponse } from "../types/rsvp"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type RSVPStep = "verification" | "form" | "success"

export default function GuestRSVPApp() {
  const [currentStep, setCurrentStep] = useState<RSVPStep>("verification")
  const [verifiedGuest, setVerifiedGuest] = useState<Guest | null>(null)
  const [lastResponse, setLastResponse] = useState<RSVPResponse | null>(null)
  const [guestList, setGuestList] = useState<Guest[]>([])

  const handleGuestVerified = (guest: Guest) => {
    setVerifiedGuest(guest)
    setCurrentStep("form")
  }

  const handleRSVPSubmit = async (response: RSVPResponse) => {
    try {
      // Save to Supabase
      const { error } = await supabase.from("rsvp_responses").insert([
        {
          guest_id: response.guestId,
          welcome_event_response: response.welcomeEvent,
          wedding_response: response.wedding,
          farewell_event_response: response.farewellEvent,
          entree_choice: response.entreeChoice,
          note: response.note,
          timestamp: response.timestamp,
        },
      ])

      if (error) {
        console.error("Error saving RSVP:", error)
        throw error
      }

      setLastResponse(response)
      setCurrentStep("success")
    } catch (error) {
      console.error("Error saving RSVP:", error)
      // You could show an error message to the user here
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
        return <GuestVerification onGuestVerified={handleGuestVerified} />
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
      <CustomCursor />
      {renderCurrentStep()}
    </div>
  )
}
