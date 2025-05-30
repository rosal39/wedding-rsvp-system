"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"
import type { RSVPResponse } from "../types/rsvp"
import BackgroundVideo from "./background-video"
import TypewriterText from "./typewriter-text"
import ThreeDCard from "./3d-card"

interface RSVPSuccessProps {
  response: RSVPResponse
  onStartOver: () => void
}

export default function RSVPSuccess({ response, onStartOver }: RSVPSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <BackgroundVideo videoSrc="/videos/elegant-background.mp4" />

      <ThreeDCard className="w-full max-w-md">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 border border-green-600 rounded-sm flex items-center justify-center transform transition-transform hover:rotate-45 duration-500">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-light text-white tracking-wide">
              <TypewriterText text="Thank You" speed={80} />
            </CardTitle>
            <TypewriterText
              text="Your RSVP has been successfully submitted."
              className="text-gray-400 text-sm font-light"
              speed={30}
              delay={1000}
            />
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm p-6 space-y-4 transform transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-900/10">
              <h3 className="font-light text-white tracking-wide">Your Responses</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-light">Welcome Event (May 15):</span>
                  <span className={response.welcomeEvent === "accept" ? "text-green-400" : "text-gray-400"}>
                    {response.welcomeEvent === "accept" ? "Attending" : "Not Attending"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-light">Wedding (May 16):</span>
                  <span className={response.wedding === "accept" ? "text-green-400" : "text-gray-400"}>
                    {response.wedding === "accept" ? "Attending" : "Not Attending"}
                  </span>
                </div>

                {response.entreeChoice && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-light">Dinner Choice:</span>
                    <span className="capitalize text-white">{response.entreeChoice}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-light">Farewell Event (May 17):</span>
                  <span className={response.farewellEvent === "accept" ? "text-green-400" : "text-gray-400"}>
                    {response.farewellEvent === "accept" ? "Attending" : "Not Attending"}
                  </span>
                </div>
              </div>

              {response.note && (
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400 font-light">
                    <strong className="text-white">Your note:</strong> {response.note}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Heart className="w-6 h-6 text-white animate-pulse" />
              </div>
              <TypewriterText
                text="We can't wait to celebrate with you! If you need to make any changes, please contact us directly."
                className="text-sm text-gray-400 font-light leading-relaxed"
                speed={20}
                delay={2000}
              />
            </div>

            <Button
              onClick={onStartOver}
              variant="outline"
              className="w-full h-12 border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px]"
            >
              Submit Another RSVP
            </Button>
          </CardContent>
        </Card>
      </ThreeDCard>
    </div>
  )
}
