"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff } from "lucide-react"
import RSVPAdmin from "../components/rsvp-admin"
import CustomCursor from "../components/custom-cursor"
import type { RSVPResponse } from "../types/rsvp"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Admin password - in production, use environment variables
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wedding2026admin"

export default function AdminRSVPApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if already authenticated in this session
    const isAuth = sessionStorage.getItem("admin-authenticated")
    if (isAuth === "true") {
      setIsAuthenticated(true)
      loadResponses()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadResponses()
      // Set up periodic refresh of data
      const interval = setInterval(loadResponses, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const loadResponses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("rsvp_responses")
        .select(`
          *,
          guests (
            name,
            email
          )
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Transform data to match our RSVPResponse type
      const transformedResponses: RSVPResponse[] = data.map((item: any) => ({
        guestId: item.guest_id,
        guestName: item.guests?.name || "Unknown",
        guestEmail: item.guests?.email || "Unknown",
        welcomeEvent: item.welcome_event_response,
        wedding: item.wedding_response,
        farewellEvent: item.farewell_event_response,
        entreeChoice: item.entree_choice,
        note: item.note,
        timestamp: item.timestamp,
      }))

      setResponses(transformedResponses)
    } catch (error) {
      console.error("Error loading responses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin-authenticated", "true")
      setError("")
      loadResponses()
    } else {
      setError("Invalid password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin-authenticated")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <CustomCursor />

        <Card className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 border border-gray-700 rounded-sm flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-light text-white tracking-wide">Admin Access</CardTitle>
              <p className="text-gray-400 text-sm font-light mt-2">Enter password to access RSVP dashboard</p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin Password"
                  className="h-12 bg-black/50 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 pr-12"
                  data-cursor-text="Enter admin password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  data-cursor-text={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              {error && (
                <Alert className="bg-red-950/80 backdrop-blur-sm border-red-800">
                  <AlertDescription className="text-red-300 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600/90 hover:bg-blue-700 text-white font-normal tracking-wide"
                data-cursor-text="Access admin dashboard"
              >
                Access Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">This area is restricted to authorized personnel only.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
      <CustomCursor />

      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
          data-cursor-text="Logout from admin"
        >
          Logout
        </Button>
      </div>

      {/* Admin Dashboard */}
      <RSVPAdmin responses={responses} />
    </div>
  )
}
