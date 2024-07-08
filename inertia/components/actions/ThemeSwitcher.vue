<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()" class="flex items-center justify-center min-w-6 min-h-6 p-1.5 bg-neutral-200 dark:bg-neutral-950 bg-opacity-50 shadow-lg rounded-full">
    <SunIcon v-if="isDark" class="w-6 h-6 text-neutral-100" />
    <MoonIcon v-if="!isDark" class="w-6 h-6 text-neutral-800" />
    <span class="sr-only">{{ isDark ? 'Dark Theme' : 'Light Theme' }}</span>
  </button>
</template>
