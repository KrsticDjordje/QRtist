<script setup lang="ts">
import type { DestinationField } from '@/types/qr'

const props = defineProps<{
  fields: DestinationField[]
  modelValue: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void
}>()

const updateField = (fieldId: string, value: string) => {
  const updatedFields = {
    ...props.modelValue,
    [fieldId]: value
  }
  emit('update:modelValue', updatedFields)
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="field in fields" :key="field.id" class="space-y-2">
      <label :for="field.id" class="block text-sm font-medium text-gray-700">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
      </label>
      <input :id="field.id" :type="field.type" :placeholder="field.placeholder" :required="field.required"
        :value="modelValue[field.id]" @input="updateField(field.id, ($event.target as HTMLInputElement).value)"
        class="input-field" />
    </div>
  </div>
</template>