<script setup lang="ts">
defineProps<{
    isFullscreen: boolean
}>()

defineEmits<{
    (e: 'toggle'): void
}>()
</script>

<template>
    <button
        class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        @click="$emit('toggle')" title="Toggle fullscreen">
        <span class="sr-only">{{ isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen' }}</span>
        <svg v-if="!isFullscreen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5m-7 11h4m-4 0v4m0-4l5 5m11-5h-4m4 0v4m0-4l-5 5" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</template>