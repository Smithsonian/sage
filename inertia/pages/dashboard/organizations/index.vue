<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import { BuildingLibraryIcon } from '@heroicons/vue/24/outline';

defineProps({ organizations: [{
  id: Number,
  title: String,
  createdAt: String,
  updatedAt: String,
}] })
</script>

<template>
  <Head title="Organizations" />
  <DefaultLayout>
    <template #main>
      <div class="flex space-x-between items-center justify-between">
        <h1 class="text-2xl">Organizations</h1>
        <Link href="/dashboard/organizations/create" class="rounded-full bg-primary-500 dark:bg-primary-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-primary-400 dark:hover:bg-primary-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 text-nowrap no-underline">
          <span>Create Organization</span>
        </Link>
      </div>
      <p v-if="organizations.length === 0" class="my-6 text-base text-neutral-600 dark:text-neutral-400">
        No organizations have been created. Please <Link href="/dashboard/organizations/create" class="text-primary-500 dark:text-primary-300">create a new organization</Link> to get started.
      </p>
      <div v-else class="my-4 md:my-6 overflow-hidden rounded-md border border-neutral-300">
        <ul role="list" class="divide-y divide-neutral-300">
          <li v-for="organization in organizations" :key="organization.id" class="flex flex-col space-y-2 px-6 py-4">
            <Link :href="`/dashboard/organizations/${organization.id}`" class="items-center justify-start">
              <span class="flex flex-row space-x-2">
                <BuildingLibraryIcon class="w-5 h-5" />
                <p>{{ organization.title }}</p>
              </span>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ organization.description }}</p>
            </Link>
          </li>
        </ul>
    </div>
    </template>
  </DefaultLayout>
</template>
