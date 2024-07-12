<template>
  <Transition v-show="show" :duration="500" enter-active-class="opacity-100"
    leave-active-class="opacity-0 transition ease-out">
    <!-- bg-success-600 shadow-success-500/15 border-success-300 bg-info-600 shadow-info-500/15 border-info-300 -->
    <div
      class="absolute inset-x-0 bottom-2 md:bottom-6 lg:bottom-12 max-w-screen-sm mx-auto z-30 p-4 text-neutral-50 border rounded-lg"
      :class="`bg-${notification.type}-600 shadow-${notification.type}-500/15 border-${notification.type}-300`">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckIcon class="h-6 w-6" v-if="['success', 'info'].includes(notification.type)" />
        </div>
        <div class="ml-3 text-lg">
          <div v-html="notification.message"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  setup() {
    const show = ref(true)
    return {
      show
    }
  },

  mounted() {
    // Hide the alert after 2 seconds.
    setTimeout(() => { this.show = false }, 2000);
  }
}
</script>
