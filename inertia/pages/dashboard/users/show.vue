<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import Badge from '~/components/elements/Badge.vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({ user: {
  id: Number,
  fullName: String,
  organizations: Array,
  role: Object,
  createdAt: String,
  updatedAt: String,
} })

const page = usePage()
const title = page.props.user.fullName
</script>

<template>
  <div>
    <Head :title="title" />
    <DefaultLayout>
      <template #main>
        <div class="flex space-x-between items-center justify-between">
          <h1 class="text-2xl">{{ title }}</h1>
          <div class="flex space-x-3">
            <Link :href="`/dashboard/users/${user.id}/edit`" class="rounded-full bg-primary-500 dark:bg-primary-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-primary-400 dark:hover:bg-primary-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 text-nowrap no-underline">
              <span class="flex flex-row space-x-2">
                <PencilIcon class="w-4 h-4" />
                <span>Edit</span>
              </span>
            </Link>
            <Link :href="`/dashboard/users/${user.id}`" method="delete" as="button" type="button" class="bg-error rounded-full px-3.5 py-2 text-sm font-semibold text-center text-nowrap no-underline">
              <span class="flex flex-row space-x-2">
                <TrashIcon class="w-5 h-5" />
                <span>Delete</span>
              </span>
            </Link>
          </div>
        </div>
        <div class="my-6 border-t border-neutral-300 dark:border-neutral-600">
          <dl class="divide-y divide-neutral-300 dark:divide-neutral-600">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">ID</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ user.id }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Role</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ user.role.name }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Organizations</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">
                <ul v-if="user.organizations.length > 0">
                  <li v-for="organization in user.organizations" :key="organization.id">
                    <Link :href="`/dashboard/organizations/${organization.id}`" class="text-primary-500 dark:text-primary-300">{{ organization.title }}</Link>
                  </li>
                </ul>
                <p v-else>
                  <em>This user is not assigned to an organization.</em> Contact a site administrator to be added to an organization.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </template>
    </DefaultLayout>
  </div>

</template>
