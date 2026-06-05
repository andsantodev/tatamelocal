<template>
  <footer class="bg-surface-container-lowest border-t border-outline-variant w-full shrink-0 z-50">
    <div class="flex flex-row justify-between items-center px-gutter py-xs w-full mx-auto">
      <img src="@/assets/favicon.png" alt="TatameLocal" class="h-8 w-auto" />
      <button
        class="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-opacity duration-200"
        @click="showModal = true"
      >
        Contato
      </button>
    </div>

    <AppContactModal v-model="showModal" email="and.santos123@gmail.com" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppContactModal from './AppContactModal.vue'

const showModal = ref(false)
</script>
