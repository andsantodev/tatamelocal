<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="mod in MODALIDADES"
      :key="mod"
      :class="[
        'rounded-full border px-3 py-1 text-label-sm transition-colors',
        modelValue.includes(mod)
          ? 'border-primary bg-primary text-on-primary'
          : 'border-outline-variant bg-surface-container-high text-on-surface hover:border-primary'
      ]"
      @click="toggle(mod)"
    >
      {{ mod }}
    </button>
  </div>
</template>

<script setup lang="ts">
const MODALIDADES = ['Jiu-Jitsu', 'Muay Thai', 'MMA', 'Boxe', 'Judô', 'Capoeira', 'Karatê'] as const

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

function toggle(mod: string) {
  const current = [...(props.modelValue || [])]
  const idx = current.indexOf(mod)
  if (idx >= 0) {
    current.splice(idx, 1)
  } else {
    current.push(mod)
  }
  emit('update:modelValue', current)
}
</script>
