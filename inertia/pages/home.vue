<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import FocusedLayout from '~/components/layouts/page/Focused.vue';
</script>

<template>
  <Head title="Welcome" />
  <FocusedLayout>
    <h1 class="flex flex-col md:flex-row items-end justify-center space-x-4 lg:space-x-6 my-6 md:my-8 lg:my-12 text-2xl md:text-4xl lg:text-6xl">
      <span><img src="/resources/images/logo.png" alt="" class="w-16 h-16 rounded-lg" /></span>
      <span class="flex items-end font-medium tracking-tight">Sage</span>
    </h1>
    <p class="my-2 lg:my-6 px-3 md:px-6 text-center text-base md:text-lg">A experimental web app using AI tools to generate description text for images of artworks, moderate that generated content, and provide access via a RESTful API.</p>
    <p class="my-2 lg:my-6 px-3 md:px-6 text-center text-base md:text-lg">Summarizing artist biographies and/or storing vector embeddings for similarity search are also interesting ideas for future features.</p>
    <div class="flex items-center justify-center p-4 md:p-6">
      <Link class="w-32 rounded-full bg-primary-500 dark:bg-primary-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:shadow-md hover:bg-primary-400 dark:hover:bg-primary-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 no-underline" href="/login" title="Login">
        Login
      </Link>
    </div>
  </FocusedLayout>
</template>
