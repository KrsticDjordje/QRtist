<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      emit('update:modelValue', e.target?.result as string)
    }
    reader.readAsDataURL(input.files[0])
  }
}

const removeLogo = () => {
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold font-display">Logo</h3>
      <p class="text-sm text-gray-500">Add a custom logo to your QR code</p>
    </div>

    <div class="space-y-4">
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />

      <div v-if="modelValue" class="space-y-4">
        <img :src="modelValue" alt="Logo preview" class="w-20 h-20 object-contain mx-auto border rounded-lg p-2" />
        <button class="btn btn-outline w-full text-red-500 hover:bg-red-50" @click="removeLogo">
          Remove Logo
        </button>
      </div>

      <button v-else class="btn btn-outline w-full" @click="fileInput?.click()">
        Upload Logo
      </button>
    </div>
  </div>
</template>