<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import FormInputError from '~/components/feedback/FormInputError.vue'

const form = useForm({
  title: null,
  description: null,
})

</script>

<template>
  <div>
    <Head title="Create Organization" />
    <DefaultLayout :notification="$page.props.notification" :errors="$page.props.errors">
      <template #main>
        <h1 class="text-2xl">Create a new Organization</h1>
        <form @submit.prevent="form.post('/dashboard/organizations')" class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6">
          <div>
            <label for="title" class="block text-sm font-medium leading-6">Title</label>
            <input id="title" v-model="form.title" type="text" :class="form.errors.title ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
            <FormInputError :errors="form.errors.title" />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium leading-6">Description</label>
            <textarea id="description" v-model="form.description" rows="3" :class="form.errors.description ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6" />
            <FormInputError :errors="form.errors.description" />
          </div>
          <div class="flex justify-end">
            <button type="submit" :disabled="form.processing" class="w-32 rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:shadow-md hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline">Create</button>
          </div>
        </form>
      </template>
    </DefaultLayout>
  </div>
</template>
