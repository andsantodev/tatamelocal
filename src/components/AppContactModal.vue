<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-gutter"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="fixed inset-0 bg-black/50" />
        <div class="relative bg-surface border border-outline-variant rounded-xl p-lg max-w-md w-full shadow-2xl">
          <button
            class="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <span class="material-symbols-outlined">close</span>
          </button>

          <div class="flex items-center gap-md mb-md">
            <span class="material-symbols-outlined text-primary text-2xl">mail</span>
            <h2 class="text-headline-md font-headline-md text-on-surface">Fale Conosco</h2>
          </div>

          <p class="text-body-md font-body-md text-on-surface-variant mb-lg leading-relaxed">
            Os dados da sua academia estão desatualizados ou sua academia não está cadastrada aqui? Entre em contato conosco para atualizar ou cadastrar sua academia.
          </p>

          <a
            :href="`mailto:${email}`"
            class="w-full bg-primary-container text-on-primary-container rounded-lg px-lg py-md font-label-sm text-label-sm flex items-center justify-center gap-sm hover:bg-inverse-primary transition-colors duration-200"
            @click="$emit('update:modelValue', false)"
          >
            <span class="material-symbols-outlined">send</span>
            Enviar email
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  email: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
