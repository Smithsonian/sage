<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import { PhotoIcon } from '@heroicons/vue/24/outline'
import ResourceType from '#enums/resource_types'

defineProps({ resources: [{
  id: Number,
  title: String,
  sourceUri: String,
  type: Object,
  canonicalId: String,
  createdAt: String,
  updatedAt: String,
}] })
</script>

<template>
  <div>
    <Head title="Resources" />
    <DefaultLayout>
      <template #main>
        <div class="flex space-x-between items-center justify-between">
          <h1 class="text-2xl">Resources</h1>
          <Link href="/dashboard/resources/create" class="rounded-full bg-primary-500 dark:bg-primary-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-primary-400 dark:hover:bg-primary-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 text-nowrap no-underline">
            <span>Create Resource</span>
          </Link>
        </div>
        <p v-if="resources.length === 0" class="my-6 text-base text-neutral-600 dark:text-neutral-400">
          No resources have been created. Please <Link href="/dashboard/resources/create" class="text-primary-500 dark:text-primary-300">create a new resource</Link> to get started.
        </p>
        <div v-else class="my-4 md:my-6 overflow-hidden rounded-md border border-neutral-300">
          <ul role="list" class="divide-y divide-neutral-300">
            <li v-for="resource in resources" :key="resource.id" class="flex flex-col space-y-2 px-6 py-4">
              <Link :href="`/dashboard/resources/${resource.id}`" class="flex flex-row space-x-2 items-center justify-start">
                <PhotoIcon v-if="resource.type.id === ResourceType.IMAGE" class="w-5 h-5" />
                <p>{{ resource.title ?? `Untitled ${resource.type.toLowerCase()}` }}</p>
              </Link>
            </li>
          </ul>
      </div>
      </template>
    </DefaultLayout>
  </div>
</template>
