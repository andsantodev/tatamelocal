import { supabase } from './supabase'
import type { Academia } from '@/types/academia'

const ACADEMIA_SELECT = 'id, name, slug, address, neighborhood, city, state, latitude, longitude, main_martial_art, secondary_martial_arts, phone, whatsapp, website, image_url, rating, opening_hours, place_id'

export async function searchByText(query: string, modalidades?: string[]): Promise<Academia[]> {
  let request = supabase
    .from('academias')
    .select(ACADEMIA_SELECT)
    .eq('is_active', true)
    .or(`city.ilike.%${query}%,neighborhood.ilike.%${query}%`)

  if (modalidades && modalidades.length > 0) {
    request = request.eq('main_martial_art', modalidades[0])
  }

  const { data, error } = await request

  if (error) {
    throw new Error(`Erro ao buscar academias: ${error.message}`)
  }

  return data as Academia[]
}

export async function searchByLocation(
  userLat: number,
  userLng: number,
  radiusKm: number = 50,
  modalidades?: string[],
  limit: number = 10,
): Promise<Academia[]> {
  const { data, error } = await supabase.rpc('search_by_location', {
    user_lat: userLat,
    user_lng: userLng,
    radius_km: radiusKm,
    martial_art: modalidades && modalidades.length > 0 ? modalidades : null,
  })

  if (error) {
    throw new Error(`Erro ao buscar academias por localização: ${error.message}`)
  }

  if (!data || data.length === 0) return []

  const ids = data.map((item: any) => item.id).filter(Boolean)
  if (ids.length === 0) return data as Academia[]

  const { data: full, error: fetchError } = await supabase
    .from('academias')
    .select(ACADEMIA_SELECT)
    .in('id', ids)
    .eq('is_active', true)
    .limit(limit)

  if (fetchError) {
    throw new Error(`Erro ao buscar academias: ${fetchError.message}`)
  }

  const fullList = (full || []) as Academia[]
  return fullList.map(item => {
    const rpcItem = data.find((rpc: any) => rpc.id === item.id)
    return {
      ...item,
      distance_km: rpcItem?.distance_km ?? item.distance_km,
    }
  }) as Academia[]
}

export async function getAcademiaById(id: string): Promise<Academia | null> {
  const { data, error } = await supabase
    .from('academias')
    .select(ACADEMIA_SELECT)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Erro ao buscar academia: ${error.message}`)
  }

  return data as Academia
}

export async function getAcademiaBySlug(slug: string): Promise<Academia | null> {
  const { data, error } = await supabase
    .from('academias')
    .select(ACADEMIA_SELECT)
    .eq('slug', slug)
    .single()

  if (error) {
    throw new Error(`Erro ao buscar academia: ${error.message}`)
  }

  return data as Academia
}
