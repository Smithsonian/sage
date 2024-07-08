<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import FocusedLayout from '~/components/layouts/page/Focused.vue';
</script>

<template>
  <Head title="Account Registration" />
  <FocusedLayout>
    <h1 class="text-lg">Registration is disabled.</h1>
    <p class="my-2 text-neutral-800 dark:text-neutral-400">Contact an administrator for account setup.</p>
    <Link href="/" class="text-primary-500 dark:text-primary-400">Return to the home page</Link>
  </FocusedLayout>
</template>
