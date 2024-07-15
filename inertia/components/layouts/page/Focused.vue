<script setup lang="ts">
import ThemeSwitcher from '~/components/actions/ThemeSwitcher.vue'
import Alert from '~/components/feedback/Alert.vue'
defineProps<{ notification?: Object | undefined, errors?: Array<string> | undefined }>();
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
    <div class="absolute inset-x-0 bottom-2 md:bottom-6 lg:bottom-12 flex space-x-4 lg:space-x-6 items-center justify-center">
      <Alert v-if="notification" :notification="notification" :key="notification.id" :auto-close="true" />
      <div v-if="errors" class="flex flex-col items-center justify-center space-y-4">
        <Alert v-for="error in errors" :notification="{ type: 'error', message: error }" :key="error" :auto-close="false" />
      </div>
    </div>
  </div>
</template>
