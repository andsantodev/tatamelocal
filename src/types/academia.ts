export interface Academia {
  id: string
  name: string
  slug: string
  address: string
  neighborhood: string
  city: string
  state: string
  latitude: number
  longitude: number
  main_martial_art: string
  secondary_martial_arts: string[]
  phone?: string
  whatsapp?: string
  website?: string
  image_url?: string
  rating: number
  opening_hours: Record<string, string>
  place_id?: string
  distance_km?: number
}
