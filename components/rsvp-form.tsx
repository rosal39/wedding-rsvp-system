"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Calendar, Utensils } from "lucide-react"
import type { Guest, RSVPFormData, RSVPResponse } from "../types/rsvp"
import BackgroundVideo from "./background-video"
import TypewriterText from "./typewriter-text"
import ThreeDCard from "./3d-card"

interface RSVPFormProps {
  guest: Guest
  onSubmit: (response: RSVPResponse) => void
  onBack: () => void
}

export default function RSVPForm({ guest, onSubmit, onBack }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    welcomeEvent: "",
    wedding: "",
    farewellEvent: "",
    entreeChoice: "",
    note: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response: RSVPResponse = {
      guestId: guest.id,
      guestName: guest.name,
      guestEmail: guest.email,
      welcomeEvent: formData.welcomeEvent as "accept" | "decline",
      wedding: formData.wedding as "accept" | "decline",
      farewellEvent: formData.farewellEvent as "accept" | "decline",
      entreeChoice: formData.entreeChoice || undefined,
      note: formData.note || undefined,
      timestamp: new Date().toISOString(),
    }

    onSubmit(response)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Calendar
                className="w-8 h-8 text-white mx-auto animate-float cursor-hover"
                data-cursor-text="Welcome Event"
              />
              <TypewriterText text="Welcome Event" className="text-xl font-light text-white tracking-wide" speed={80} />
              <TypewriterText
                text="Will you be able to join us at our Welcome Event on May 15, 2026?"
                className="text-gray-400 text-sm font-light"
                speed={30}
                delay={1000}
              />
            </div>

            <RadioGroup
              value={formData.welcomeEvent}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, welcomeEvent: value as "accept" | "decline" }))
              }
              className="space-y-4"
            >
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Accept invitation"
              >
                <RadioGroupItem value="accept" id="welcome-accept" className="border-gray-600 text-blue-500" />
                <Label htmlFor="welcome-accept" className="flex-1 text-white font-light">
                  Joyfully Accept
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Decline invitation"
              >
                <RadioGroupItem value="decline" id="welcome-decline" className="border-gray-600 text-blue-500" />
                <Label htmlFor="welcome-decline" className="flex-1 text-white font-light">
                  Regretfully Decline
                </Label>
              </div>
            </RadioGroup>

            <Button
              onClick={handleNext}
              disabled={!formData.welcomeEvent}
              className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
              data-cursor-text="Continue to next step"
            >
              Continue
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Heart
                className="w-8 h-8 text-white mx-auto animate-pulse cursor-hover"
                data-cursor-text="Wedding Ceremony"
              />
              <TypewriterText
                text="Wedding Ceremony"
                className="text-xl font-light text-white tracking-wide"
                speed={80}
              />
              <TypewriterText
                text="Will you be able to join us at our wedding on May 16, 2026?"
                className="text-gray-400 text-sm font-light"
                speed={30}
                delay={1000}
              />
              <p className="text-xs text-gray-500 font-light">Kindly reply by September 1, 2025</p>
            </div>

            <RadioGroup
              value={formData.wedding}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, wedding: value as "accept" | "decline" }))}
              className="space-y-4"
            >
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Accept wedding invitation"
              >
                <RadioGroupItem value="accept" id="wedding-accept" className="border-gray-600 text-blue-500" />
                <Label htmlFor="wedding-accept" className="flex-1 text-white font-light">
                  Joyfully Accept
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Decline wedding invitation"
              >
                <RadioGroupItem value="decline" id="wedding-decline" className="border-gray-600 text-blue-500" />
                <Label htmlFor="wedding-decline" className="flex-1 text-white font-light">
                  Regretfully Decline
                </Label>
              </div>
            </RadioGroup>

            <Button
              onClick={handleNext}
              disabled={!formData.wedding}
              className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
              data-cursor-text="Continue to next step"
            >
              Continue
            </Button>
          </div>
        )

      case 3:
        if (formData.wedding === "decline") {
          return (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <TypewriterText
                  text="We'll miss you!"
                  className="text-xl font-light text-white tracking-wide"
                  speed={80}
                />
                <TypewriterText
                  text="Would you like to include a note to the couple?"
                  className="text-gray-400 text-sm font-light"
                  speed={30}
                  delay={1000}
                />
              </div>

              <Textarea
                value={formData.note}
                onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                placeholder="Your message to the couple (optional)"
                className="min-h-[120px] bg-black/50 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 hover:border-gray-600"
                data-cursor-text="Write a personal message"
              />

              <Button
                onClick={handleNext}
                className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
                data-cursor-text="Continue to final step"
              >
                Continue
              </Button>
            </div>
          )
        } else {
          return (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <Utensils
                  className="w-8 h-8 text-white mx-auto animate-float cursor-hover"
                  data-cursor-text="Dinner Selection"
                />
                <TypewriterText
                  text="Dinner Selection"
                  className="text-xl font-light text-white tracking-wide"
                  speed={80}
                />
                <TypewriterText
                  text="What entree would you prefer at our wedding?"
                  className="text-gray-400 text-sm font-light"
                  speed={30}
                  delay={1000}
                />
              </div>

              <RadioGroup
                value={formData.entreeChoice}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, entreeChoice: value as "chicken" | "fish" | "vegetable" }))
                }
                className="space-y-4"
              >
                <div
                  className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                  data-cursor-text="Select chicken entree"
                >
                  <RadioGroupItem value="chicken" id="chicken" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="chicken" className="flex-1 text-white font-light">
                    Chicken
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                  data-cursor-text="Select fish entree"
                >
                  <RadioGroupItem value="fish" id="fish" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="fish" className="flex-1 text-white font-light">
                    Fish
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                  data-cursor-text="Select vegetable entree"
                >
                  <RadioGroupItem value="vegetable" id="vegetable" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="vegetable" className="flex-1 text-white font-light">
                    Vegetable
                  </Label>
                </div>
              </RadioGroup>

              <Button
                onClick={handleNext}
                disabled={!formData.entreeChoice}
                className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
                data-cursor-text="Continue to final step"
              >
                Continue
              </Button>
            </div>
          )
        }

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Calendar
                className="w-8 h-8 text-white mx-auto animate-float cursor-hover"
                data-cursor-text="Farewell Event"
              />
              <TypewriterText
                text="Farewell Event"
                className="text-xl font-light text-white tracking-wide"
                speed={80}
              />
              <TypewriterText
                text="Will you be able to join us at our Farewell Event on May 17, 2026?"
                className="text-gray-400 text-sm font-light"
                speed={30}
                delay={1000}
              />
            </div>

            <RadioGroup
              value={formData.farewellEvent}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, farewellEvent: value as "accept" | "decline" }))
              }
              className="space-y-4"
            >
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Accept farewell invitation"
              >
                <RadioGroupItem value="accept" id="farewell-accept" className="border-gray-600 text-blue-500" />
                <Label htmlFor="farewell-accept" className="flex-1 text-white font-light">
                  Joyfully Accept
                </Label>
              </div>
              <div
                className="flex items-center space-x-3 p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-900/10 cursor-hover"
                data-cursor-text="Decline farewell invitation"
              >
                <RadioGroupItem value="decline" id="farewell-decline" className="border-gray-600 text-blue-500" />
                <Label htmlFor="farewell-decline" className="flex-1 text-white font-light">
                  Regretfully Decline
                </Label>
              </div>
            </RadioGroup>

            <Button
              onClick={handleSubmit}
              disabled={!formData.farewellEvent || isSubmitting}
              className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
              data-cursor-text={isSubmitting ? "Submitting..." : "Submit RSVP"}
            >
              {isSubmitting ? "Submitting RSVP..." : "Submit RSVP"}
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <BackgroundVideo videoSrc="/videos/elegant-background.mp4" />

      <ThreeDCard className="w-full max-w-md">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-xl font-light text-white tracking-wide">
              <TypewriterText text={`Welcome, ${guest.name}`} speed={80} />
            </CardTitle>
            <p className="text-sm text-gray-500 font-light">Step {currentStep} of 4</p>
            <div className="w-full bg-gray-800 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {renderStep()}

            {currentStep > 1 && !isSubmitting && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="w-full mt-6 h-12 border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white font-normal transform transition-all duration-300 hover:translate-y-[-2px]"
                data-cursor-text="Go back to previous step"
              >
                Back
              </Button>
            )}
          </CardContent>
        </Card>
      </ThreeDCard>
    </div>
  )
}
