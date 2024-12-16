<script setup lang="ts">
defineProps<{
  id: string
  name: string
  icon: string
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <button
    :class="[
      'p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]',
      isSelected ? 'border-primary bg-blue-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
    ]"
    @click="$emit('select')"
  >
    <div class="text-2xl mb-2">{{ icon }}</div>
    <div class="text-sm font-medium">{{ name }}</div>
  </button>
</template>