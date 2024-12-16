<script setup lang="ts">
defineProps<{
  href: string
  text: string
  class?: string
}>()
</script>

<template>
  <a :href="href" class="nav-link text-gray-600 hover:text-gray-900 transition-colors duration-200"
    :class="$props.class">
    {{ text }}
  </a>
</template>