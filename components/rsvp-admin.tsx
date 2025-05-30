"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Users } from "lucide-react"
import type { RSVPResponse } from "../types/rsvp"
import BackgroundVideo from "./background-video"
import TypewriterText from "./typewriter-text"

interface RSVPAdminProps {
  responses: RSVPResponse[]
}

export default function RSVPAdmin({ responses }: RSVPAdminProps) {
  const [showTable, setShowTable] = useState(false)

  const stats = {
    total: responses.length,
    welcomeAccept: responses.filter((r) => r.welcomeEvent === "accept").length,
    weddingAccept: responses.filter((r) => r.wedding === "accept").length,
    farewellAccept: responses.filter((r) => r.farewellEvent === "accept").length,
    chicken: responses.filter((r) => r.entreeChoice === "chicken").length,
    fish: responses.filter((r) => r.entreeChoice === "fish").length,
    vegetable: responses.filter((r) => r.entreeChoice === "vegetable").length,
  }

  const exportToCSV = () => {
    const headers = [
      "Guest Name",
      "Email",
      "Welcome Event",
      "Wedding",
      "Farewell Event",
      "Entree Choice",
      "Note",
      "Timestamp",
    ]

    const csvData = responses.map((response) => [
      response.guestName,
      response.guestEmail,
      response.welcomeEvent,
      response.wedding,
      response.farewellEvent,
      response.entreeChoice || "",
      response.note || "",
      new Date(response.timestamp).toLocaleString(),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "wedding-rsvp-responses.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black p-4 overflow-hidden">
      <BackgroundVideo videoSrc="/videos/elegant-background.mp4" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <Card className="bg-black/80 backdrop-blur-md border border-gray-800 transform transition-all duration-500 hover:translate-y-[-4px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white font-light tracking-wide">
              <Users className="w-5 h-5" />
              <TypewriterText text="RSVP Dashboard" speed={80} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-900/10">
                <div className="text-2xl font-light text-white">{stats.total}</div>
                <div className="text-sm text-gray-400 font-light">Total Responses</div>
              </div>
              <div className="text-center p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-900/10">
                <div className="text-2xl font-light text-green-400">{stats.weddingAccept}</div>
                <div className="text-sm text-gray-400 font-light">Wedding Attendees</div>
              </div>
              <div className="text-center p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-900/10">
                <div className="text-2xl font-light text-blue-400">{stats.welcomeAccept}</div>
                <div className="text-sm text-gray-400 font-light">Welcome Event</div>
              </div>
              <div className="text-center p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-900/10">
                <div className="text-2xl font-light text-purple-400">{stats.farewellAccept}</div>
                <div className="text-sm text-gray-400 font-light">Farewell Event</div>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                onClick={() => setShowTable(!showTable)}
                className="bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20"
              >
                {showTable ? "Hide" : "Show"} Response Table
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white font-normal transform transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {showTable && (
              <div className="overflow-x-auto border border-gray-800 rounded-sm bg-black/50 backdrop-blur-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900/80 border-b border-gray-800">
                      <th className="p-4 text-left text-white font-light">Guest Name</th>
                      <th className="p-4 text-left text-white font-light">Email</th>
                      <th className="p-4 text-center text-white font-light">Welcome</th>
                      <th className="p-4 text-center text-white font-light">Wedding</th>
                      <th className="p-4 text-center text-white font-light">Farewell</th>
                      <th className="p-4 text-center text-white font-light">Entree</th>
                      <th className="p-4 text-left text-white font-light">Note</th>
                      <th className="p-4 text-left text-white font-light">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                        <td className="p-4 text-white font-light">{response.guestName}</td>
                        <td className="p-4 text-gray-400 font-light">{response.guestEmail}</td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={response.welcomeEvent === "accept" ? "default" : "secondary"}
                            className={
                              response.welcomeEvent === "accept"
                                ? "bg-green-600/80 text-white"
                                : "bg-gray-700/80 text-gray-300"
                            }
                          >
                            {response.welcomeEvent}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={response.wedding === "accept" ? "default" : "secondary"}
                            className={
                              response.wedding === "accept"
                                ? "bg-green-600/80 text-white"
                                : "bg-gray-700/80 text-gray-300"
                            }
                          >
                            {response.wedding}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={response.farewellEvent === "accept" ? "default" : "secondary"}
                            className={
                              response.farewellEvent === "accept"
                                ? "bg-green-600/80 text-white"
                                : "bg-gray-700/80 text-gray-300"
                            }
                          >
                            {response.farewellEvent}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          {response.entreeChoice && (
                            <Badge variant="outline" className="capitalize border-gray-600 text-gray-300">
                              {response.entreeChoice}
                            </Badge>
                          )}
                        </td>
                        <td className="p-4 max-w-xs truncate text-gray-400 font-light">{response.note}</td>
                        <td className="p-4 text-sm text-gray-500 font-light">
                          {new Date(response.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
