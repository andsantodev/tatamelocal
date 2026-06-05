<template>
  <div class="bg-background text-on-surface font-body-md h-screen w-full flex flex-col bg-mat-texture overflow-hidden">
    <header class="w-full flex justify-center pt-xl pb-md px-gutter absolute top-0 left-0 z-10">
      <!-- <div class="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">
        TatameLocal
      </div> -->
      <img src="@/assets/logo-tatame-local.png" alt="TatameLocal" class="h-16 w-auto mt-8" />
    </header>
    <main class="flex-grow flex flex-col items-center justify-center px-gutter w-full max-w-container-max mx-auto z-0 relative">
      <div class="max-w-3xl w-full text-center space-y-lg">
        <div class="space-y-sm">
          <h1 class="text-headline-lg md:text-display-xl font-display-xl text-on-surface">
            Encontre sua academia de luta
          </h1>
          <p class="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            Encontre o lugar ideal para treinar, perto de você.
          </p>
        </div>
        <div class="bg-surface border border-outline-variant rounded-xl p-md flex flex-col items-center shadow-lg w-full max-w-2xl mx-auto mt-xl gap-md">
          <div class="relative w-full flex-grow flex items-center bg-background border border-outline-variant rounded-lg focus-within:border-primary-container transition-colors duration-200">
            <span class="material-symbols-outlined text-on-surface-variant ml-md">search</span>
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch({ query: searchQuery, modalidades: selectedModalities })"
              class="w-full bg-transparent border-none text-on-surface placeholder:text-on-surface-variant focus:ring-0 focus:outline-none py-md px-sm text-body-md font-body-md"
              placeholder="Digite sua cidade ou bairro..."
              type="text"
            >
          </div>
          <div class="flex flex-col w-full gap-md">
            <button
              @click="handleSearch({ query: searchQuery, modalidades: selectedModalities })"
              class="bg-primary-container text-on-primary-container rounded-lg px-lg py-md font-label-sm text-label-md flex items-center justify-center hover:bg-inverse-primary transition-colors duration-200 w-full whitespace-nowrap"
            >
              Buscar academias
            </button>
            <button
              @click="handleGeolocation"
              class="bg-transparent border border-outline-variant text-on-surface rounded-lg px-md py-md font-label-sm text-label-sm flex items-center justify-center gap-xs hover:bg-surface-container-high transition-colors duration-200 w-full whitespace-nowrap"
            >
              <span class="material-symbols-outlined text-on-surface">my_location</span>
              Usar minha localização
            </button>
          </div>
        </div>
        <div class="pt-lg flex flex-wrap justify-center gap-sm">
          <span class="text-label-sm font-label-sm text-on-surface-variant mr-sm flex items-center">Populares:</span>
          <button
            v-for="mod in popularModalities"
            :key="mod"
            @click="toggleModality(mod)"
            class="bg-surface border border-outline-variant text-on-surface px-md py-xs rounded-full font-label-sm text-label-sm hover:border-primary-container transition-colors duration-200"
          >
            {{ mod }}
          </button>
        </div>
        <p v-if="error" class="mt-4 text-center text-error">{{ error }}</p>
      </div>
    </main>
    <footer class="hidden w-full text-center py-lg px-gutter absolute bottom-0 left-0 z-10">
      <p class="text-label-sm font-label-sm text-on-surface-variant">
        3.200+ academias em todo o Brasil
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAcademias } from '@/composables/useAcademias'
import { useGeolocation } from '@/composables/useGeolocation'

const router = useRouter()
const { error } = useAcademias()
const { requestLocation } = useGeolocation()

const searchQuery = ref('')
const popularModalities = ['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe', 'Capoeira']
const selectedModalities = ref<string[]>([])

function toggleModality(mod: string) {
  const idx = selectedModalities.value.indexOf(mod)
  if (idx >= 0) {
    selectedModalities.value.splice(idx, 1)
  } else {
    selectedModalities.value.push(mod)
  }
}

async function handleSearch(payload: { query: string; modalidades: string[] }) {
  router.push({
    name: 'results',
    query: {
      q: payload.query,
      modalidades: payload.modalidades.length > 0 ? payload.modalidades.join(',') : undefined,
    },
  })
}

async function handleGeolocation() {
  const location = await requestLocation()
  if (location) {
    router.push({
      name: 'results',
      query: {
        lat: location.latitude.toString(),
        lng: location.longitude.toString(),
      },
    })
  }
}
</script>
