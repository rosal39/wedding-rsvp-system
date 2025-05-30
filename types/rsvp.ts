export interface Guest {
  id: string
  name: string
  email: string
  plusOne?: string
}

export interface RSVPResponse {
  guestId: string
  guestName: string
  guestEmail: string
  welcomeEvent: "accept" | "decline"
  wedding: "accept" | "decline"
  farewellEvent: "accept" | "decline"
  entreeChoice?: "chicken" | "fish" | "vegetable"
  note?: string
  timestamp: string
}

export interface RSVPFormData {
  welcomeEvent: "accept" | "decline" | ""
  wedding: "accept" | "decline" | ""
  farewellEvent: "accept" | "decline" | ""
  entreeChoice: "chicken" | "fish" | "vegetable" | ""
  note: string
}
