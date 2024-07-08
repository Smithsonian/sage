<script setup lang="ts">
import ThemeSwitcher from '~/components/actions/ThemeSwitcher.vue'
</script>

<template>
  <div>
    <ThemeSwitcher class="absolute top-4 lg:top-8 right-4 lg:right-8"></ThemeSwitcher>
    <section
    class="flex items-stretch min-h-screen max-w-full p-4 bg-secondary-200 dark:bg-secondary-950 bg-gradient-to-t from-secondary-200 dark:from-secondary-700 via-secondary-400 dark:via-secondary-500 to-secondary-300 dark:to-secondary-800">
      <div
      class="flex flex-col justify-center items-center space-y-3 w-full max-w-screen-md m-auto p-4 lg:p-8 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 backdrop-blur-xl rounded-md shadow-xl shadow-secondary/75">
        <slot v-cloak></slot>
      </div>
    </section>
  </div>
</template>
