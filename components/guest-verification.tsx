"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, AlertCircle } from "lucide-react"
import type { Guest } from "../types/rsvp"
import BackgroundVideo from "./background-video"
import TypewriterText from "./typewriter-text"
import ThreeDCard from "./3d-card"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface GuestVerificationProps {
  onGuestVerified: (guest: Guest) => void
}

export default function GuestVerification({ onGuestVerified }: GuestVerificationProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Search for guest in Supabase
      const { data: guests, error } = await supabase
        .from("guests")
        .select("*")
        .or(`name.ilike.%${name}%,email.ilike.%${email}%`)

      if (error) throw error

      // Find exact match
      const foundGuest = guests?.find(
        (guest) =>
          guest.name.toLowerCase().trim() === name.toLowerCase().trim() ||
          guest.email.toLowerCase().trim() === email.toLowerCase().trim(),
      )

      if (foundGuest) {
        onGuestVerified({
          id: foundGuest.id,
          name: foundGuest.name,
          email: foundGuest.email,
          plusOne: foundGuest.plus_one_name,
        })
      } else {
        setError(
          "We could not find your name or email in our guest list. Please check the spelling and try again, or contact us if you believe this is an error.",
        )
      }
    } catch (error) {
      console.error("Error verifying guest:", error)
      setError("An error occurred while verifying your information. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <BackgroundVideo videoSrc="/videos/elegant-background.mp4" />

      <ThreeDCard className="w-full max-w-md">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-8 pb-8">
            {/* Logo/Brand Mark */}
            <div className="flex justify-center">
              <div
                className="w-12 h-12 border border-gray-700 rounded-sm flex items-center justify-center transform transition-transform hover:rotate-45 duration-500 cursor-hover"
                data-cursor-text="Wedding Logo"
              >
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <TypewriterText text="Guest Area" className="text-2xl font-light text-white tracking-wide" speed={80} />
              <TypewriterText
                text="Please enter your name and email below."
                className="text-gray-400 text-sm font-light leading-relaxed"
                speed={30}
                delay={1500}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 transform transition-all duration-500 hover:translate-y-[-2px]">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="h-12 bg-black/50 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  data-cursor-text="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2 transform transition-all duration-500 hover:translate-y-[-2px]">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="h-12 bg-black/50 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  data-cursor-text="Enter your email address"
                  required
                />
              </div>

              {error && (
                <Alert className="bg-red-950/80 backdrop-blur-sm border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
                data-cursor-text={isLoading ? "Verifying..." : "Access RSVP"}
              >
                {isLoading ? "Verifying..." : "Go"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </ThreeDCard>
    </div>
  )
}
