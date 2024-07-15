<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'
import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
const props = defineProps<{
  notification?: {
    type: string,
    message: string,
  } | undefined,
  autoClose?: boolean
 }>();
const visible = ref(true)
defineExpose({ visible })

// Automatically hide the alert after 3 seconds.
if (props.autoClose) {
  setTimeout(() => { visible.value = false }, 3000);
}
</script>

<template>
  <Transition v-show="visible" :duration="500" enter-active-class="opacity-100"
    leave-active-class="opacity-0 transition ease-out">
    <!-- bg-success-600 shadow-success-500/15 border-success-300 bg-info-600 shadow-info-500/15 border-info-300 bg-error-600 shadow-error-500/15 border-error-300 -->
    <div
      class="max-w-screen-sm mx-auto z-40 p-4 text-neutral-50 border rounded-lg"
      :class="`bg-${notification.type}-600 shadow-${notification.type}-500/15 border-${notification.type}-300`">
      <div class="flex items-center justify-center">
        <div class="flex-shrink-0">
          <CheckIcon class="h-6 w-6" v-if="['success', 'info'].includes(notification.type)" />
          <ExclamationTriangleIcon class="h-6 w-6" v-if="notification.type === 'error'" />
        </div>
        <div class="mx-3 text-lg">
          <div v-html="notification.message"></div>
        </div>
        <button type="button" v-if="!autoClose" @click="visible = false" class="ml-4">
          <XMarkIcon class="h-6 w-6" />
          <span class="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  </Transition>
</template>
