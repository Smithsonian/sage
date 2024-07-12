<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3'
import FocusedLayout from '~/components/layouts/page/Focused.vue';
import FormInputError from '~/components/feedback/FormInputError.vue'

const form = useForm({
  email: null,
  password: null,
  remember: false,
})
</script>

<template>
  <div>
    <Head title="Log in" />
    <FocusedLayout>
      <h1 class="flex flex-col md:flex-row items-end justify-center space-x-4 lg:space-x-6 text-2xl md:text-4xl lg:text-6xl">
        <span class="flex items-end font-medium tracking-tight">Login</span>
      </h1>

      <form @submit.prevent="form.post('/login')" class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6">

        <div>
          <label for="email" class="block text-sm font-medium leading-6">Email address</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" :class="form.errors.email ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
          <FormInputError :errors="form.errors.email" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6">Password</label>
          <input id="password" v-model="form.password" type="password" :class="form.errors.password ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
          <FormInputError :errors="form.errors.password" />
        </div>

        <div class="flex items-center text-neutral-700 dark:text-neutral-300">
          <input id="remember-me" v-model="form.remember" type="checkbox" class="h-4 w-4 rounded border-neutral-300 focus:ring-accent-600" />
          <label for="remember-me" class="ml-3 block text-sm leading-6">Remember me</label>
        </div>

        <button type="submit" :disabled="form.processing" class="w-full mx-auto rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:shadow-md hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline">Login</button>
      </form>
    </FocusedLayout>
  </div>
</template>
