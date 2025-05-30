// API route for handling RSVP responses (for production use)
import type { NextApiRequest, NextApiResponse } from "next"
import type { RSVPResponse } from "../types/rsvp"

// In production, you would connect to a real database
const responses: RSVPResponse[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Get all responses (admin only)
    const { password } = req.query
    if (password !== "wedding2026admin") {
      return res.status(401).json({ error: "Unauthorized" })
    }
    return res.status(200).json(responses)
  }

  if (req.method === "POST") {
    // Add new response
    const response: RSVPResponse = req.body
    responses.push(response)
    return res.status(201).json({ success: true })
  }

  res.setHeader("Allow", ["GET", "POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
