<template>
  <div ref="mapContainer" class="h-full w-full rounded-lg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Academia } from '@/types/academia'

const props = defineProps<{
  academias: Academia[]
  center?: [number, number]
  centerCoords?: [number, number] | null
  selectedAcademia?: Academia | null
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markers: L.Marker[] = []
const markerMap = new Map<string, L.Marker>()
let markerGroup: L.LayerGroup | null = null

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    zoomControl: true,
    attributionControl: false,
  }).setView([-23.5505, -46.6333], 15)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  }).addTo(map)

  updateMarkers()

  setTimeout(() => map?.invalidateSize(), 300)
})

watch(
  () => props.academias,
  () => {
    if (props.centerCoords && map) {
      map.setView(props.centerCoords, 15)
    } else if (props.center && map) {
      map.setView(props.center, 15)
    }
    updateMarkers()
  },
  { deep: true }
)

watch(
  () => props.center,
  (newCenter) => {
    if (newCenter && map && !props.centerCoords) {
      map.setView(newCenter, 15)
    }
  }
)

watch(
  () => props.centerCoords,
  (newCoords) => {
    if (newCoords && map) {
      map.setView(newCoords, 15)
    }
  }
)

watch(
  () => props.selectedAcademia,
  (acad) => {
    if (!acad || !map) return
    const marker = markerMap.get(acad.id)
    if (marker) {
      marker.openPopup()
      map.setView([acad.latitude, acad.longitude], 16)
    }
  },
  { deep: true }
)

const redIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
          width="32" height="32" fill="#dc2626">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
          7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 
          0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 
          2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const grayIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
          width="28" height="28" fill="#5c403c">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
          7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 
          0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 
          2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

function updateMarkers() {
  if (!map) return

  if (markerGroup) {
    markerGroup.clearLayers()
  } else {
    markerGroup = L.layerGroup().addTo(map)
  }

  markers = []
  markerMap.clear()

  if (props.academias.length === 0) return

  for (const acad of props.academias) {
    if (!acad.latitude || !acad.longitude) continue

    const icon = (acad as any).isPrimary ? redIcon : grayIcon
    const marker = L.marker([acad.latitude, acad.longitude], { icon })
    marker.bindPopup(`
      <div style="min-width:200px">
        <div style="font-size:16px;margin-bottom:8px;font-weight:700">${acad.name}</div>
        <div style="font-size:14px;margin-bottom:16px">${acad.address}${acad.city ? ', ' + acad.city : ''}</div>
        <button
          onclick="window.location.href='/academia/${acad.slug}'"
          style="font-size:14px;padding:6px 16px;background:#dc2626;color:white;border:none;border-radius:4px;cursor:pointer"
        >
          Ver detalhes
        </button>
      </div>
    `)
    markerGroup?.addLayer(marker)
    markers.push(marker)
    markerMap.set(acad.id, marker)
  }
}

defineExpose({ map })
</script>
