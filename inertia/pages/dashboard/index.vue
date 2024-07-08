<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
defineProps({ user: {
  id: Number,
  fullName: String,
  email: String,
} })

</script>

<template>
  <Head title="Dashboard" />
  <DefaultLayout>
    <template #main>
      <h1 class="text-2xl">Welcome to the admin dashboard, {{  user.fullName }}</h1>
    </template>
    <!-- <template #footer>
      <p>footer</p>
    </template> -->
  </DefaultLayout>
</template>
