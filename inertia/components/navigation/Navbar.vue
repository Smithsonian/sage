<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ThemeSwitcher from '~/components/actions/ThemeSwitcher.vue'

</script>

<template>
  <header class="sticky top-0 z-20 w-full text-neutral-900 dark:text-neutral-100 bg-gradient-to-t from-primary-300 to-primary-200 dark:from-primary-800/25 dark:to-primary-900/25 shadow-md">
    <div class="flex justify-between items-center h-18 lg:h-20 px-1 md:px-4 lg:px-6">
      <div>
        <Link href="/dashboard" title="Dashboard home" :class="{ 'cursor-default': $page.url === '/dashboard' }">
          <div class="flex flex-col md:flex-row items-end justify-center space-x-2">
            <span><img src="/resources/images/logo.png" alt="" class="w-10 h-10 rounded-lg" /></span>
            <span class="text-xl tracking-tight">Sage</span>
          </div>
        </Link>
      </div>
      <div class="flex flex-row grow items-center justify-center space-x-6 mx-6">
        <Link href="/dashboard/organizations" class="text-lg" :class="{ 'px-3.5 py-2 bg-primary-100 dark:bg-neutral-950 cursor-default rounded-full': $page.url === '/dashboard/organizations' }">Organizations</Link>
        <Link href="/dashboard/resources" class="text-lg" :class="{ 'px-3.5 py-2 bg-primary-100 dark:bg-neutral-950 cursor-default rounded-full': $page.url === '/dashboard/resources' }">Resources</Link>
      </div>
      <div class="flex space-x-2 items-center justify-center">
        <ThemeSwitcher />
        <Link href="/logout" method="post" as="button" type="button" class="mx-6 inline-flex justify-center px-3 py-1.5 text-base text-neutral-700 dark:text-neutral-300">Logout</Link>
      </div>
    </div>
  </header>
</template>
