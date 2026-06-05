<template>
  <div class="bg-background text-on-background h-screen flex flex-col overflow-hidden font-body-md">
    <AppHeader />

    <main class="flex flex-1 overflow-hidden">
      <section class="w-full lg:w-[480px] flex flex-col bg-surface border-r border-outline-variant z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div class="flex flex-col border-b border-outline-variant shrink-0 bg-surface">
          <div class="p-gutter pb-sm">
            <div class="flex items-center bg-surface-container border border-outline-variant rounded-lg focus-within:border-primary-container transition-colors pl-md h-[48px]">
              <span class="material-symbols-outlined text-on-surface-variant mr-sm">search</span>
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                class="bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface w-full font-body-md text-body-md placeholder:text-on-surface-variant"
                placeholder="Buscar por academia, bairro ou cidade..."
                type="text"
              >
              <button
                @click="handleSearch"
                class="h-full bg-[#DC2626] text-white px-md flex items-center justify-center rounded-lg transition-colors hover:bg-red-700"
              >
                <span class="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
          <div class="overflow-x-auto no-scrollbar px-gutter p-md">
            <ModalityChips
              :model-value="selectedArt ? [selectedArt] : []"
              @update:model-value="onModalityUpdate"
            />
          </div>
          <div class="px-gutter py-sm bg-surface-container-lowest border-t border-outline-variant">
            <p class="font-label-sm text-label-sm text-on-surface-variant">
              {{ academias.length }} academias encontradas perto de você
            </p>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto no-scrollbar p-gutter flex flex-col gap-lg bg-background">
          <p
            v-if="error"
            class="text-label-sm text-on-surface-variant pt-gutter"
          >
            {{ error }}
          </p>
          <LoadingSpinner v-if="loading" />
          <EmptyState v-else-if="academias.length === 0 && !loading && !error" />
          <template v-else-if="academias.length > 0">
            <AcademyCard
              v-for="acad in academiasPrimariasFiltradas"
              :key="acad.id"
              :academia="acad"
              @select="handleCardSelect"
            />
            <div
              v-if="academiasProximasFiltradas.length > 0"
              class="flex items-center gap-md my-md"
            >
              <div class="flex-1 border-t border-outline-variant"></div>
              <span class="text-label-sm text-on-surface-variant px-md">
                Academias próximas
              </span>
              <div class="flex-1 border-t border-outline-variant"></div>
            </div>
            <AcademyCard
              v-for="acad in academiasProximasFiltradas"
              :key="acad.id"
              :academia="acad"
              @select="handleCardSelect"
            />
          </template>
        </div>
      </section>

      <section class="flex-1 relative hidden md:block">
        <MapView
          :academias="academiasComMapa"
          :center="mapCenter"
          :centerCoords="searchCenter ? [searchCenter.lat, searchCenter.lng] : null"
          :selectedAcademia="selectedAcademia"
        />
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AcademyCard from '@/components/AcademyCard.vue'
import ModalityChips from '@/components/ModalityChips.vue'
import MapView from '@/components/MapView.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useAcademias } from '@/composables/useAcademias'
import type { Academia } from '@/types/academia'

const router = useRouter()
const route = useRoute()
const { academias, loading, error, search, searchNearby, clear, searchCenter } = useAcademias()

const searchQuery = ref('')
const selectedArt = ref<string | null>(null)
const mapCenter = ref<[number, number] | undefined>(undefined)
const selectedAcademia = ref<Academia | null>(null)

const academiasPrimarias = computed(() =>
  academias.value.filter(a => a.distance_km != null && a.distance_km <= 2)
)

const academiasProximas = computed(() =>
  academias.value.filter(a => a.distance_km != null && a.distance_km > 2 && a.distance_km <= 5)
)

function filterByArt(list: Academia[]) {
  if (!selectedArt.value) return list
  return list.filter(a => a.main_martial_art === selectedArt.value)
}

const academiasPrimariasFiltradas = computed(() => filterByArt(academiasPrimarias.value))

const academiasProximasFiltradas = computed(() => filterByArt(academiasProximas.value))

const academiasComMapa = computed(() => [
  ...academiasPrimariasFiltradas.value.map(a => ({ ...a, isPrimary: true })),
  ...academiasProximasFiltradas.value.map(a => ({ ...a, isPrimary: false })),
])

onMounted(async () => {
  const q = route.query.q as string | undefined
  const lat = route.query.lat as string | undefined
  const lng = route.query.lng as string | undefined
  const mods = route.query.modalidades as string | undefined

  if (q) {
    searchQuery.value = q
    if (mods) {
      selectedArt.value = mods.split(',')[0] || null
    }
    await search(q)
    if (searchCenter.value) {
      mapCenter.value = [searchCenter.value.lat, searchCenter.value.lng]
    }
  } else if (lat && lng) {
    await searchNearby(parseFloat(lat), parseFloat(lng))
    mapCenter.value = [parseFloat(lat), parseFloat(lng)]
  }
})

function onModalityUpdate(mods: string[]) {
  const clicked = mods.length > 0 ? mods[mods.length - 1] : null
  if (selectedArt.value === clicked || !clicked) {
    selectedArt.value = null
  } else {
    selectedArt.value = clicked
  }
  reapplySearch()
}

async function reapplySearch() {
  if (searchQuery.value) {
    router.replace({ path: '/resultados', query: { q: searchQuery.value } })
    await search(searchQuery.value)
    if (searchCenter.value) {
      mapCenter.value = [searchCenter.value.lat, searchCenter.value.lng]
    }
  } else {
    const lat = route.query.lat as string | undefined
    const lng = route.query.lng as string | undefined
    if (lat && lng) {
      await searchNearby(parseFloat(lat), parseFloat(lng))
    }
  }
}

function clearResults() {
  clear()
  router.replace({ path: '/resultados' })
}

async function handleSearch() {
  if (!searchQuery.value.trim()) {
    clearResults()
    return
  }
  router.replace({ path: '/resultados', query: { q: searchQuery.value } })
  await search(searchQuery.value)
  if (searchCenter.value) {
    mapCenter.value = [searchCenter.value.lat, searchCenter.value.lng]
  }
}

function handleCardSelect(academia: Academia) {
  selectedAcademia.value = academia
}
</script>
