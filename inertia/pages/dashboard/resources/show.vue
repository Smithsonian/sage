<script setup lang="ts">
import { Head, Link, usePage, useForm } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import Spinner from '~/components/feedback/Spinner.vue'
import { PhotoIcon, TrashIcon, ArrowUpRightIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

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
  prompt: 'Create descriptive alt text for this image to improve accessibility for people with impaired vision. The alt text should describe the content and mood of the image, use text recognition, and be less than 125 characters in length.',
  uri: page.props.resource.sourceUri,
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
          <div>
            <h1 class="text-2xl">{{ title }}</h1>
            <div class="">
              <a :href="`/api/v1/resources/${resource.id}`" target="_blank" class="flex items-center justify-start space-x-1 mt-1 text-base text-primary-500 dark:text-primary-300">
                <span>View JSON</span>
                <ArrowUpRightIcon class="w-3 h-3" />
              </a>
            </div>
          </div>
          <Link :href="`/dashboard/resources/${resource.id}`" method="delete" as="button" type="button" class="bg-error rounded-full px-3.5 py-2 text-sm font-semibold text-center text-nowrap no-underline">
            <span class="flex flex-row space-x-2">
              <TrashIcon class="w-5 h-5" />
              <span>Delete</span>
            </span>
          </Link>
        </div>
        <div class="my-6 border-t border-neutral-300 dark:border-neutral-600">
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
          <ul class="flex flex-col space-y-4">
            <li v-for="representation in resource.representations" :key="representation.id" class="flex flex-col py-4 px-6 border border-accent-300 dark:border-accent-800 bg-accent-100 dark:bg-accent-900 rounded-xl shadow-md">
              <dl class="flex flex-col space-y-2 p-2">
                <div class="flex flex-row items-center space-x-2 text-sm">
                  <dt class="font-medium leading-6">ID</dt>
                  <dd>{{ representation.id }}</dd>
                </div>
                <div class="flex flex-col space-y-3 text-sm">
                  <dt class="font-medium">Prompt</dt>
                  <dd>
                    <blockquote class="pl-2 border-l-4 border-accent-500 dark:border-accent-700 text-sm">
                      {{ representation.contents.prompt }}
                    </blockquote>
                  </dd>
                </div>
                <div class="flex flex-col space-y-3 text-sm">
                  <dt class="font-medium">{{ representation.type.toLowerCase() }}</dt>
                  <dd class="text-lg">
                    {{ representation.contents.message.content }}
                  </dd>
                </div>
              </dl>
              <Link :href="`/dashboard/representations/${representation.id}`" preserve-scroll method="delete" as="button" type="button" class="w-max bg-error rounded-full p-1.5 mt-4 text-sm font-semibold text-center text-nowrap no-underline">
                <span>
                  <TrashIcon class="w-4 h-4" />
                  <span class="sr-only">Delete</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <h3 class="text-lg my-4 text-primary-700 dark:text-primary-400">Generate a new representation</h3>
          <div class="mt-2 border-t border-neutral-300 dark:border-neutral-600">
            <form
              @submit.prevent="form.post('/dashboard/representations',{
                preserveScroll: true,
                onSuccess: () => form.reset('contents'),
              })"
              class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6"
            >
              <div>
                <label for="representation-type" class="block text-sm font-medium leading-6">Representation Type</label>
                <select id="representation-type" v-model="form.type" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-accent-500 focus:outline-none sm:text-sm sm:leading-6">
                  <option selected value="ALTTEXT">Alt text</option>
                  <option disabled value="TEXT">Long description</option>
                  <option disabled value="EMBEDDING">Embedding</option>
                </select>
                <div class="block text-sm font-medium leading-6 text-neutral-400">Currently, only alt text is supported.</div>
              </div>
              <div>
                <label for="prompt" class="block text-sm font-medium leading-6">Prompt</label>
                <textarea id="prompt" v-model="form.prompt" rows="3" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:ring-accent-500 focus:outline-none sm:text-sm sm:leading-6" />
                <div class="block text-sm font-medium leading-6 text-neutral-400">Customize the default prompt text.</div>
                <div v-if="form.errors.description" class="block text-sm font-medium leading-6 text-error">{{ form.errors.description }}</div>
              </div>
              <div class="flex justify-end">
                <button type="submit" :disabled="form.processing" class="w-32 rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:shadow-md hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline">
                  <span v-if="form.processing"><Spinner classes="w-5 h-5" /></span>
                  <span v-else class="flex flex-row items-center justify-center space-x-2">
                    <span>Generate</span>
                    <PaperAirplaneIcon class="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>
          </div>
      </template>
    </DefaultLayout>
  </div>
</template>
