<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import { TrashIcon } from '@heroicons/vue/24/outline';

defineProps({ organization: {
  id: Number,
  title: String,
  createdAt: String,
  updatedAt: String,
  users: Array,
} })

</script>

<template>
  <div>
    <Head :title="organization.title" />
    <DefaultLayout :notification="$page.props.notification">
      <template #main>
        <div class="flex space-x-between items-center justify-between">
          <h1 class="text-2xl">{{ organization.title }}</h1>
          <Link :href="`/dashboard/organizations/${organization.id}`" method="delete" as="button" type="button" class="bg-error rounded-full px-3.5 py-2 text-sm font-semibold text-center text-nowrap no-underline">
            <span class="flex flex-row space-x-2">
              <TrashIcon class="w-5 h-5" />
              <span>Delete</span>
            </span>
          </Link>
        </div>
        <div class="mt-6 border-t border-neutral-300 dark:border-neutral-600">
          <dl class="divide-y divide-neutral-300 dark:divide-neutral-600">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">ID</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ organization.id }}</dd>
            </div>
          </dl>
          <div v-if="organization.users.length > 0" class="flex flex-col space-y-4 mt-6">
            <h2 class="text-xl">Members</h2>
            <Link :href="`/dashboard/users/${user.id}`" v-for="user in organization.users" :key="user.id">
              {{ user.fullName }}
            </Link>
          </div>
        </div>
      </template>
    </DefaultLayout>
  </div>
</template>
