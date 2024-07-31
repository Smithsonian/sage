<template>
  <div class="flex items-center">
    <span class="px-3 py-1 bg-secondary-300 dark:bg-secondary-700 rounded-full text-xs">
      <span v-if="label" class="font-medium mr-1">{{ label }}:</span>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
})
</script>
