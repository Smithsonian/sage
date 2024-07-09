<script setup lang="ts">
import { Head, Link, usePage, useForm } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import { PhotoIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({ resource: {
  id: Number,
  title: String,
  sourceUri: String,
  type: String,
  canonicalId: String,
  createdAt: String,
  updatedAt: String,
} })

const page = usePage()

const form = useForm({
  resourceId: page.props.resource.id,
  type: null,
  contents: JSON.stringify({}),
})

let title = page.props.resource.title
if (!title && page.props.resource.type) {
  title = `Untitled ${page.props.resource.type.toLowerCase()}`
}
</script>

<template>
  <div>
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
          <div v-if="resource.type === 'IMAGE'" class="m-4 flex justify-center">
            <img :src="resource.sourceUri" alt="Resource Image" class="max-w-full h-auto z-0 shadow-md rounded-sm" />
          </div>
          <dl class="divide-y divide-neutral-300 dark:divide-neutral-600">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">ID</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ resource.id }}</dd>
            </div>
            <div v-if="resource.title" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Title</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ resource.title }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Organization</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">
                <Link :href="`/dashboard/organizations/${resource.organization.id}`" class="text-primary-500 dark:text-primary-300">{{ resource.organization.title }}</Link>
              </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Type</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ resource.type }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Source</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ resource.sourceUri }}</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-white">Canonical ID</dt>
              <dd class="mt-1 text-sm leading-6 text-neutral-400 sm:col-span-2 sm:mt-0">{{ resource.canonicalId }}</dd>
            </div>
          </dl>
        </div>
        <div v-if="resource.representations.length > 0" class="my-4">
          <h2 class="text-xl my-4">Representations</h2>
          <ul>
            <li v-for="representation in resource.representations" :key="representation.id" class="flex flex-col py-4 divide-y divide-neutral-300 dark:divide-neutral-600">
              <dl class="p-2">
                <div class="flex flex-row items-center space-x-2 text-sm">
                  <dt class="font-medium leading-6">ID</dt>
                  <dd>{{ representation.id }}</dd>
                </div>
                <div class="flex flex-col space-y-3 text-sm">
                  <dt class="font-medium">Contents</dt>
                  <dd>
                    <code class="flex p-4 w-full min-h-24 bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-400 font-light rounded-lg border border-neutral-600 shadow-inner text-sm">
                      {{ representation.contents }}
                    </code>
                  </dd>
                </div>
              </dl>
              <Link :href="`/dashboard/representations/${representation.id}`" preserve-scroll method="delete" as="button" type="button" class="w-max bg-error rounded-full px-2.5 py-2 text-sm font-semibold text-center text-nowrap no-underline">
                <span>
                  <TrashIcon class="w-5 h-5" />
                  <span class="sr-only">Delete</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <h3 class="text-lg my-4">Create a new representation</h3>
          <div class="mt-6 border-t border-neutral-300 dark:border-neutral-600">
            <form
              @submit.prevent="form.post('/dashboard/representations',{
                preserveScroll: true,
                onSuccess: () => form.reset('contents'),
              })"
              class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6"
            >
              <div>
                <label for="representation-type" class="block text-sm font-medium leading-6">Type</label>
                <select id="representation-type" v-model="form.type" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-accent-500 focus:outline-none sm:text-sm sm:leading-6">
                  <option selected value="ALTTEXT">Alt text</option>
                  <option disabled value="TEXT">Long description</option>
                  <option disabled value="EMBEDDING">Embedding</option>
                </select>
                <div class="block text-sm font-medium leading-6 text-neutral-400">Currently, only alt text is supported.</div>
              </div>
              <div>
                <label for="contents" class="block text-sm font-medium leading-6">Contents</label>
                <textarea id="contents" v-model="form.contents" rows="3" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-accent-500 focus:outline-none sm:text-sm sm:leading-6" />
                <div v-if="form.errors.description" class="block text-sm font-medium leading-6 text-error">{{ form.errors.description }}</div>
              </div>
              <div class="flex justify-end">
                <button type="submit" :disabled="form.processing" class="w-32 rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:shadow-md hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline">Create</button>
              </div>
            </form>
          </div>
      </template>
    </DefaultLayout>
  </div>
</template>
