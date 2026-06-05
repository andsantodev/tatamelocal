<template>
  <div
    class="cursor-pointer rounded-lg border border-outline-variant bg-surface-container p-4 transition-colors hover:border-primary"
    @click="$emit('select', academia)"
  >
    <div v-if="academia.image_url" class="mb-3 h-40 w-full overflow-hidden rounded-lg">
      <img :src="academia.image_url" :alt="academia.name" class="h-full w-full object-cover" />
    </div>
    <h3 class="text-headline-md text-on-surface">{{ academia.name }}</h3>
    <p class="mt-1 text-body-md text-on-surface-variant">{{ academia.address }}{{ academia.city ? ', ' + academia.city : '' }}</p>
    <div v-if="academia.main_martial_art" class="mt-2 flex flex-wrap gap-1">
      <span
        class="rounded-full bg-primary-fixed px-2 py-0.5 text-label-sm text-on-primary-fixed"
      >
        {{ academia.main_martial_art }}
      </span>
    </div>
    <div v-if="academia.rating" class="mt-2 flex items-center gap-1">
      <span class="material-symbols-outlined text-primary">star</span>
      <span class="text-body-md text-on-surface">{{ academia.rating.toFixed(1) }}</span>
    </div>
    <div class="md:hidden mt-3 pt-3 border-t border-outline-variant">
      <button
        @click.stop="goToDetail"
        class="w-full text-on-surface rounded-lg px-md py-md font-label-sm text-label-sm flex items-center justify-center gap-sm hover:bg-surface-container-high transition-colors bg-[#DC2626] text-white"
      >
        Ver detalhes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Academia } from '@/types/academia'

const props = defineProps<{
  academia: Academia
}>()

const emit = defineEmits<{
  select: [academia: Academia]
}>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'academy-detail', params: { slug: props.academia.slug } })
}
</script>
