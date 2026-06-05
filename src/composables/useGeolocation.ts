import { ref } from 'vue'

const userLocation = ref<{ latitude: number; longitude: number } | null>(null)
const geoError = ref<string | null>(null)
const geoLoading = ref(false)

export function useGeolocation() {
  function requestLocation(): Promise<{ latitude: number; longitude: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        geoError.value = 'Geolocalização não suportada neste navegador.'
        resolve(null)
        return
      }

      geoLoading.value = true
      geoError.value = null

      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          geoLoading.value = false
          resolve(userLocation.value)
        },
        () => {
          geoError.value = 'Não foi possível obter sua localização. Por favor, insira manualmente.'
          geoLoading.value = false
          resolve(null)
        },
        { enableHighAccuracy: true, timeout: 10000 }
      )
    })
  }

  return {
    userLocation,
    geoError,
    geoLoading,
    requestLocation,
  }
}
