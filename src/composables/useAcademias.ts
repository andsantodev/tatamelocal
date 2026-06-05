import { ref } from 'vue'
import { searchByLocation, getAcademiaById, getAcademiaBySlug } from '@/lib/api'
import type { Academia } from '@/types/academia'

const academias = ref<Academia[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchCenter = ref<{ lat: number; lng: number } | null>(null)

async function geocodeNominatim(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=br`
    )
    const data = await res.json()
    if (data?.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    }
    return null
  } catch {
    return null
  }
}

export function useAcademias() {
  async function search(query: string) {
    loading.value = true
    error.value = null
    academias.value = []
    searchCenter.value = null
    try {
      const coords = await geocodeNominatim(query)
      if (coords) {
        searchCenter.value = coords
        academias.value = await searchByLocation(coords.lat, coords.lng, 5)
      } else {
        error.value = 'Localidade não encontrada. Tente um nome diferente.'
      }
    } catch (e) {
      error.value = (e as Error).message
      academias.value = []
    } finally {
      loading.value = false
    }
  }

  async function searchNearby(lat: number, lng: number, limit: number = 10) {
    loading.value = true
    error.value = null
    try {
      academias.value = await searchByLocation(lat, lng, 50, undefined, limit)
    } catch (e) {
      error.value = (e as Error).message
      academias.value = []
    } finally {
      loading.value = false
    }
  }

  async function getById(id: string): Promise<Academia | null> {
    loading.value = true
    error.value = null
    try {
      const result = await getAcademiaById(id)
      return result
    } catch (e) {
      error.value = (e as Error).message
      return null
    } finally {
      loading.value = false
    }
  }

  async function getBySlug(slug: string): Promise<Academia | null> {
    loading.value = true
    error.value = null
    try {
      const result = await getAcademiaBySlug(slug)
      return result
    } catch (e) {
      error.value = (e as Error).message
      return null
    } finally {
      loading.value = false
    }
  }

  function clear() {
    academias.value = []
    error.value = null
    searchCenter.value = null
  }

  return {
    academias,
    loading,
    error,
    searchCenter,
    search,
    searchNearby,
    getById,
    getBySlug,
    clear,
  }
}
