<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { CheckIcon } from '@heroicons/vue/24/outline'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import FormInputError from '~/components/feedback/FormInputError.vue'
import UserRoles from '#enums/user_roles'
import { ref } from 'vue'
import Divider from '~/components/elements/Divider.vue'

defineProps({
  organizations: [{
    id: Number,
    title: String,
  }],
})

const form = useForm({
  fullName: null,
  email: null,
  userRoleId: UserRoles.USER,
  password: null,
  role: null,
  organizations: [],
})

const isPasswordConfirmed = ref(false)
const confirmPassword = (event: Event) => {
  if (form.password.length > 0 && form.password === event.target.value){
    isPasswordConfirmed.value = true
  } else {
    isPasswordConfirmed.value = false
  }
}
</script>

<template>
    <div>
      <Head title="Create User" />
      <DefaultLayout :errors="$page.props.errorsBag">
        <template #main>
          <h1 class="text-2xl">Create a new Account</h1>
          <form @submit.prevent="form.post('/dashboard/users')" class="flex flex-col p-4 md:p-6 space-y-4 md:spayce-y-6">
            <div>
              <label for="full-name" class="block text-sm font-medium leading-6">Name</label>
              <input id="full-name" v-model="form.fullName" type="text" :class="form.errors.fullName ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
              <FormInputError :errors="form.errors.fullName" />
            </div>
            <div>
              <label for="user-role" class="block text-sm font-medium leading-6">User role</label>
              <select id="user-role" v-model="form.userRoleId" :class="form.errors.userRoleId ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                <option selected :value="UserRoles.USER">User</option>
                <option :value="UserRoles.ADMIN">Administrator</option>
              </select>
              <div v-if="form.userRoleId === UserRoles.USER" class="block text-sm font-medium leading-6 text-neutral-400">The default <em>user</em> role has the ability to create resources and moderate generated representations for all assigned organizations.</div>
              <div v-if="form.userRoleId === UserRoles.ADMIN" class="block text-sm font-medium leading-6 text-neutral-400">The <em>admin</em> role has the ability to manage users for all assigned organizations.</div>
              <FormInputError :errors="form.errors.userRoleId" />
            </div>
            <Divider />
            <fieldset class="flex flex-col space-y-4 md:spayce-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-6">Email</label>
                <input id="email" v-model="form.email" type="email" :class="form.errors.email ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                <FormInputError :errors="form.errors.email" />
              </div>
              <div>
                <label for="password" class="block text-sm font-medium leading-6">Password</label>
                <input id="password" v-model="form.password" type="password" :class="form.errors.password ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                <FormInputError :errors="form.errors.password" />
              </div>
              <div>
                <label for="confirmation-password" class="block text-sm font-medium leading-6">Confirm password</label>
                <input id="confirmation-password" @input="confirmPassword" type="password" :class="form.password && !isPasswordConfirmed ? 'ring-error-500' : 'focus:ring-accent-500'" class="block w-full rounded-md border-0 bg-neutral-100 dark:bg-neutral-600 py-1.5 text-neutral-900 dark:text-neutral-50 shadow-sm ring-1 dark:ring-0 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6">
                <FormInputError v-if="!isPasswordConfirmed" :errors="['Passwords do not match']" />
                <div v-if="isPasswordConfirmed" class="flex space-x-2">
                  <CheckIcon class="w-4 h-4 text-success-500" />
                  <div class="block text-sm font-medium leading-6 text-neutral-400">Passwords match</div>
                </div>
              </div>
              <div>
                <label for="organizations" class="block text-sm font-medium leading-6">Organizations</label>
                <div id="organizations" class="grid gap-4 p-2">
                  <div v-for="organization in organizations" :key="organization.id">
                    <input type="checkbox" :value="organization.id" v-model="form.organizations" class="h-4 w-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-600">
                    <span class="ml-2">{{ organization.title }}</span>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="flex justify-end">
              <button type="submit" :disabled="form.processing || !isPasswordConfirmed" class="w-32 rounded-full bg-accent-500 dark:bg-accent-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-accent-400 dark:hover:bg-accent-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 no-underline disabled:cursor-default disabled:bg-neutral-400/25">Create</button>
            </div>
          </form>
        </template>
      </DefaultLayout>
    </div>

</template>
