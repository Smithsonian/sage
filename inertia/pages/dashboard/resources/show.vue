<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import { PhotoIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({ resource: {
  id: Number,
  title: String,
  sourceUri: String,
  resourceType: String,
  canonicalId: String,
  createdAt: String,
  updatedAt: String,
} })

const page = usePage()

// const title = resource.title ?? `Untitled ${resource.resourceType}`
let title = page.props.resource.title
if (!title && page.props.resource.resourceType) {
  title = `Untitled ${page.props.resource.resourceType.toLowerCase()}`
}
</script>

<template>
  <Head :title="title" />
  <DefaultLayout>
    <template #main>
      <div class="flex space-x-between items-center justify-between">
        <h1 class="text-2xl">{{ title }}</h1>
        <Link :href="`/dashboard/resources/${resource.id}`" method="delete" as="button" type="button" class="bg-error rounded-full px-3.5 py-2 text-sm font-semibold text-center text-nowrap no-underline">
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
            <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{{ resource.id }}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Type</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{{ resource.resourceType }}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Source</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{{ resource.sourceUri }}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-white">Canonical ID</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">{{ resource.canonicalId }}</dd>
          </div>
        </dl>
      </div>
    </template>
  </DefaultLayout>
</template>
