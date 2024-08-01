<script setup lang="ts">
import Navbar from '~/components/navigation/Navbar.vue'
import Alert from '~/components/feedback/Alert.vue'
defineProps<{ notification?: Object | undefined, errors?: Array<string> | undefined }>();
</script>

<template>
  <div class="min-h-screen max-w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
    <Navbar :user="$page.props.user" />
    <main class="relative flex h-full mx-auto max-w-screen-lg flex-col px-4 pt-14 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
      <slot name="main" v-cloak></slot>
    </main>
    <footer>
      <slot name="footer" v-cloak></slot>
    </footer>
    <div class="absolute inset-x-0 bottom-2 md:bottom-6 lg:bottom-12 flex space-x-4 lg:space-x-6 items-center justify-center">
      <Alert v-if="notification" :notification="notification" :key="notification.id" :auto-close="true" />
      <Alert v-for="error in errors" :notification="{ type: 'error', message: error }" :key="error" :auto-close="true" />
    </div>
  </div>
</template>
