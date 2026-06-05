<template>
  <div class="bg-background text-on-background font-body-md min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-grow w-full max-w-container-max mx-auto px-gutter py-xl">
      <LoadingSpinner v-if="loading" />

      <template v-else-if="academia">
        <div class="mb-lg">
          <button
            @click="goBack"
            class="inline-flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-sm font-label-sm"
          >
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            Voltar
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <!-- Left Column -->
          <div class="lg:col-span-8 flex flex-col gap-lg">
            <!-- Header Section -->
            <div class="bg-[#18181B] border border-[#27272A] rounded-lg p-lg">
              <div v-if="academia.image_url" class="mb-3 h-40 md:h-36 lg:h-80 w-full overflow-hidden rounded-lg">
                <img :src="academia.image_url" :alt="academia.name" class="h-full w-full object-cover" />
              </div>
              <div class="mb-md">
                <div v-if="academia.rating" class="flex justify-end mb-sm">
                  <div class="bg-surface-container border border-outline-variant px-sm py-xs rounded text-secondary font-label-sm text-label-sm flex items-center gap-xs">
                    <span class="material-symbols-outlined text-[14px]">star</span>
                    {{ academia.rating.toFixed(1) }}
                  </div>
                </div>
                <h1 class="text-headline-lg md:text-headline-2xl font-display-xl text-on-surface">{{ academia.name }}</h1>
              </div>
              <p class="text-body-lg font-body-lg text-on-surface-variant mb-lg max-w-3xl">
                {{ academia.address }}{{ academia.city ? ', ' + academia.city : '' }}{{ academia.state ? ' - ' + academia.state : '' }}
              </p>
              <div class="flex flex-wrap gap-sm mb-lg">
                <span
                  v-for="mod in allModalities"
                  :key="mod"
                  class="bg-[#1f2937] text-[#93c5fd] border border-[#1e3a8a] px-md py-xs rounded-full text-label-sm font-label-sm"
                >
                  {{ mod }}
                </span>
              </div>
            </div>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div class="bg-[#18181B] border border-[#27272A] rounded-lg p-lg hover:border-outline transition-colors duration-200">
                <div class="flex items-center gap-md mb-md">
                  <span class="material-symbols-outlined text-primary">sports_martial_arts</span>
                  <h2 class="text-headline-md font-headline-md text-on-surface">Modalidades</h2>
                </div>
                <ul class="text-body-md font-body-md text-on-surface-variant space-y-sm">
                  <li v-for="mod in allModalities" :key="mod" class="flex items-center gap-sm">
                    <span class="material-symbols-outlined text-[16px]">check</span>
                    {{ mod }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-4 flex flex-col gap-lg">
            <!-- Action Panel -->
            <div class="bg-[#18181B] border border-[#27272A] rounded-lg p-lg flex flex-col gap-md">
              <a
                :href="googleMapsUrl"
                target="_blank"
                class="w-full bg-primary-container text-on-primary-container text-body-md font-label-sm py-md rounded-DEFAULT font-bold flex items-center justify-center gap-sm hover:bg-inverse-primary transition-colors duration-200"
              >
                <span class="material-symbols-outlined">directions</span>
                Como chegar
              </a>
              <div class="grid grid-cols-2 gap-md">
                <a
                  v-if="academia.whatsapp"
                  :href="academia.whatsapp"
                  target="_blank"
                  class="w-full bg-transparent border border-[#27272A] text-on-surface text-body-md font-label-sm py-md rounded-DEFAULT flex items-center justify-center gap-sm hover:border-outline transition-colors duration-200"
                >
                  <span class="material-symbols-outlined text-[#25D366]">chat</span>
                  WhatsApp
                </a>
                <a
                  v-if="academia.phone"
                  :href="`tel:${academia.phone}`"
                  class="w-full bg-transparent border border-[#27272A] text-on-surface text-body-md font-label-sm py-md rounded-DEFAULT flex items-center justify-center gap-sm hover:border-outline transition-colors duration-200"
                >
                  <span class="material-symbols-outlined">call</span>
                  Ligar
                </a>
              </div>
              <a
                v-if="academia.website"
                :href="academia.website"
                target="_blank"
                class="w-full text-center text-primary text-label-sm font-label-sm mt-sm hover:underline flex items-center justify-center gap-xs"
              >
                <span class="material-symbols-outlined text-[16px]">language</span>
                Visitar Site
              </a>
            </div>

            <!-- Map & Info Section -->
            <div class="bg-surface-container-low border border-outline-variant rounded-lg p-lg flex flex-col gap-lg">
              <div v-if="formattedHours.length > 0">
                <div class="flex items-center gap-md mb-md">
                  <span class="material-symbols-outlined text-primary-container">schedule</span>
                  <h2 class="text-headline-md font-headline-md text-on-surface">Horários de Funcionamento</h2>
                </div>
                <ul class="text-body-md font-body-md text-on-surface-variant space-y-sm">
                  <li v-for="item in formattedHours" :key="item.day" class="flex justify-between">
                    <span>{{ item.day }}:</span>
                    <span class="text-right whitespace-pre-line">{{ item.hours }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </template>

      <EmptyState v-else-if="!loading && !academia" />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useAcademias } from '@/composables/useAcademias'
import type { Academia } from '@/types/academia'

const route = useRoute()
const router = useRouter()
const { getBySlug, loading } = useAcademias()

const academia = ref<Academia | null>(null)

const allModalities = computed(() => {
  if (!academia.value) return []
  const mods = [academia.value.main_martial_art]
  if (academia.value.secondary_martial_arts?.length) {
    mods.push(...academia.value.secondary_martial_arts)
  }
  return mods
})

onMounted(async () => {
  const slug = route.params.slug as string
  if (slug) {
    const result = await getBySlug(slug)
    if (result) {
      academia.value = result
    }
  }
})

const formattedHours = computed(() => {
  if (!academia.value?.opening_hours) return []
  const raw = academia.value.opening_hours
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return Object.entries(raw).map(([day, hours]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      hours: hours === 'Fechado' ? 'Fechado' : hours.replace(/\s*to\s*/gi, ' às ').replace(/, /g, '\n'),
    }))
  }
  if (Array.isArray(raw)) {
    return raw.map(item => ({
      day: item.day.charAt(0).toUpperCase() + item.day.slice(1),
      hours: item.hours === 'Fechado' ? 'Fechado' : item.hours.replace(/\s*to\s*/gi, ' às ').replace(/, /g, '\n'),
    }))
  }
  return []
})

const googleMapsUrl = computed(() => {
  if (!academia.value) return '#'
  return `https://www.google.com/maps/dir/?api=1&destination=${academia.value.latitude},${academia.value.longitude}`
})

function goBack() {
  router.back()
}
</script>
