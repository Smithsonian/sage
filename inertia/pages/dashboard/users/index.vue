<script setup lang="ts">
import { Head, Link, usePage, useForm } from '@inertiajs/vue3'
import DefaultLayout from '~/components/layouts/page/Default.vue'
import Spinner from '~/components/feedback/Spinner.vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import FormInputError from '~/components/feedback/FormInputError.vue'
import Badge from '~/components/elements/Badge.vue'

defineProps({ users: [{
  id: Number,
  fullName: String,
  role: Object,
  organizations: Array,
  createdAt: String,
  updatedAt: String,
}] })

// const page = usePage()
// console.log(page.props.users)

// const form = useForm({
//   resourceId: page.props.resource.id,
//   representationTypeId: RepresentationTypes.ALTTEXT,
//   moderationStatusId: ModerationStatuses.WAITING_APPROVAL,
//   prompt: 'Create descriptive alt text for this image to improve accessibility for people with impaired vision. The alt text should describe the content and mood of the image, use text recognition, and be less than 125 characters in length.',
//   uri: page.props.resource.sourceUri,
// })

</script>

<template>
  <div>
    <Head title="Users" />
    <DefaultLayout>
      <template #main>
        <div class="flex space-x-between items-center justify-between">
          <h1 class="text-2xl">Users</h1>
          <Link href="/dashboard/users/create" class="rounded-full bg-primary-500 dark:bg-primary-800 px-3.5 py-2 text-sm font-semibold text-center text-neutral-50 hover:bg-primary-400 dark:hover:bg-primary-600 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 text-nowrap no-underline">
            <span>Create User</span>
          </Link>
        </div>
        <div class="my-4 md:my-6 overflow-hidden rounded-md border border-neutral-300">
          <ul role="list" class="divide-y divide-neutral-300">
            <li v-for="user in users" :key="user.id" class="flex flex-col space-y-2 px-6 py-4">
              <Link :href="`/dashboard/users/${user.id}`" class="flex flex-col items-start justify-center space-y-2">
                <span class="flex flex-row space-x-2">
                  <UserIcon class="w-5 h-5" />
                  <p>{{ user.fullName }}</p>
                  <Badge label="Role">{{ user.role.name }}</Badge>
                </span>
                <div v-if="user.organizations.length > 0" class="text-sm text-neutral-600 dark:text-neutral-400">
                  <p v-for="organization in user.organizations" :key="organization.id">{{ organization.title }}</p>
                </div>
                <p v-else class="text-sm text-error-500 dark:text-error-500">This user is not assigned to an organization.</p>
              </Link>
            </li>
          </ul>
      </div>
      </template>
    </DefaultLayout>
  </div>
</template>
