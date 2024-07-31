<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-neutral-400"></div>
    </div>
    <div v-if="label" class="relative flex justify-center">
      <span class="bg-neutral-50 dark:bg-neutral-900 px-2 text-sm">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
})
</script>
