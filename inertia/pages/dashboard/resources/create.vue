<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import FormInputError from '~/components/feedback/FormInputError.vue'

defineProps({ organizations: [{
  id: Number,
  title: String,
}] })

const form = useForm({
  title: null,
  sourceUri: null,
  canonicalId: null,
  organizationId: null,
  type: 'IMAGE',
})

</script>

<template>
  <div>
    <Head title="Create Resource" />
    <DefaultLayout>
      <template #main>
        <h1 class="text-2xl">Create a new Resource</h1>
        <form @submit.prevent="form.post('/dashboard/resources')" class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6">
          <div>
            <label for="title" class="block text-sm font-medium leading-6">Title</label>
            <input id="title" v-model="form.title" type="text" :class="form.errors.title ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
            <FormInputError :errors="form.errors.title" />
          </div>
          <div>
            <label for="source-uri" class="block text-sm font-medium leading-6">Source URI</label>
            <input id="source-uri" v-model="form.sourceUri" type="text" :class="form.errors.sourceUri ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
            <div class="block text-sm font-medium leading-6 text-neutral-400">The URL of the resource (Required)</div>
            <FormInputError :errors="form.errors.sourceUri" />
          </div>
          <div>
            <label for="canonical-id" class="block text-sm font-medium leading-6">Canonical ID</label>
            <input id="canonical-id" v-model="form.canonicalId" type="text" :class="form.errors.canonicalId ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
            <div class="block text-sm font-medium leading-6 text-neutral-400">The unique identifier used in the remote resource source. (Required)</div>
            <FormInputError :errors="form.errors.canonicalId" />
          </div>
          <div>
            <label for="organization-id" class="block text-sm font-medium leading-6">Organization</label>
            <select id="organization-id" v-model="form.organizationId" :class="form.errors.organizationId ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
              <option disabled selected>Select an organization</option>
              <option v-for="organization in organizations" :value="organization.id" :key="organization.id">{{ organization.title }}</option>
            </select>
            <FormInputError :errors="form.errors.organizationId" />
          </div>
          <div>
            <label for="resource-type" class="block text-sm font-medium leading-6">Resource Type</label>
            <select id="resource-type" v-model="form.type" :class="form.errors.type ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
              <option selected value="IMAGE">Image</option>
              <option disabled value="VIDEO">Video</option>
              <option disabled value="AUDIO">Audio</option>
            </select>
            <div class="block text-sm font-medium leading-6 text-neutral-400">Currently, only images are supported.</div>
            <FormInputError :errors="form.errors.type" />
          </div>
          <div class="flex justify-end">
            <button type="submit" :disabled="form.processing" class="w-32 rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline">Create</button>
          </div>
        </form>
      </template>
    </DefaultLayout>
  </div>
</template>
