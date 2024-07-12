<template>
  <div>
    <ul v-for="message in errors" :key="message.index" class="block text-sm font-medium leading-6 text-error-600 dark:text-error-400">
      <li>{{ message }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({ errors: [] })
</script>
