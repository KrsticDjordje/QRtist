<script setup lang="ts">
defineProps<{
    modelValue: string
}>()

defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="space-y-4">
        <div class="space-y-2">
            <h3 class="text-lg font-semibold font-display">Caption</h3>
            <p class="text-sm text-gray-500">Add text below your QR code</p>
        </div>

        <input type="text" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            placeholder="Enter caption text" class="input-field" />
    </div>
</template>