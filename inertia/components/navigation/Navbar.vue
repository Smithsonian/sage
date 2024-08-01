<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ThemeSwitcher from '~/components/actions/ThemeSwitcher.vue'
import Divider from '~/components/elements/Divider.vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isUserMenuOpen = ref(false)
const userMenu = ref(null)
onClickOutside(userMenu, () => isUserMenuOpen.value = false)

const props = defineProps({ user: {
  id: Number,
  fullName: String,
  email: String,
} })
</script>

<template>
  <header class="sticky top-0 z-20 w-full text-neutral-900 dark:text-neutral-100 bg-gradient-to-t from-primary-300/50 to-primary-200/50 dark:from-primary-800/50 dark:to-primary-900/50 shadow-md">
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
        <Link href="/dashboard/organizations" class="text-lg" :class="{ 'px-3.5 py-2 bg-primary-100 dark:bg-neutral-950 cursor-default rounded-full': $page.url.startsWith('/dashboard/organizations') }">Organizations</Link>
        <Link href="/dashboard/resources" class="text-lg" :class="{ 'px-3.5 py-2 bg-primary-100 dark:bg-neutral-950 cursor-default rounded-full': $page.url.startsWith('/dashboard/resources') }">Resources</Link>
        <Link href="/dashboard/users" class="text-lg" :class="{ 'px-3.5 py-2 bg-primary-100 dark:bg-neutral-950 cursor-default rounded-full': $page.url.startsWith('/dashboard/users') }">Users</Link>
      </div>
      <div class="flex space-x-2 items-center justify-center">
        <ThemeSwitcher />
        <div v-if="props.user" class="relative text-sm">
          <button @click="isUserMenuOpen = !isUserMenuOpen" class="flex items-center justify-center py-2 px-2.5 text-base font-semibold bg-neutral-200 dark:bg-neutral-950 bg-opacity-50 shadow-lg rounded-full">
            <UserIcon class="w-5 h-5"></UserIcon>
          </button>
          <div v-if="isUserMenuOpen" ref="userMenu" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-100 dark:bg-neutral-700 py-1 shadow-lg ring-1 ring-primary-500 ring-opacity-5 focus:outline-none" role="menu">
            <p class="p-4 text-neutral-600 dark:text-neutral-400">{{ user.email }}</p>
            <Divider />
            <div class="flex flex-col items-start justify-center space-y-2 p-4">
              <Link :href="`/dashboard/users/${user.id}`" as="button" type="button" role="menuitem" tabindex="-1" class="text-neutral-700 dark:text-neutral-300">Profile</Link>
              <Link href="/logout" method="post" as="button" type="button" role="menuitem" tabindex="-1" class="text-neutral-700 dark:text-neutral-300">Sign out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
