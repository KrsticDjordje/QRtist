<script setup lang="ts">
defineProps<{
  colors: string[]
  selectedColor: string
}>()

defineEmits<{
  (e: 'select', color: string): void
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold font-display">Color</h3>
      <p class="text-sm text-gray-500">Choose a color for your QR code</p>
    </div>
    <div class="grid grid-cols-6 gap-4">
      <button
        v-for="color in colors"
        :key="color"
        :class="[
          'w-10 h-10 rounded-xl border-2 transition-all duration-200 hover:scale-110',
          selectedColor === color ? 'border-primary shadow-lg' : 'border-transparent'
        ]"
        :style="{ backgroundColor: color }"
        @click="$emit('select', color)"
      ></button>
    </div>
  </div>
</template>