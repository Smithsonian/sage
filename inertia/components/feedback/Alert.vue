<template>
  <Transition v-show="show" :duration="500" enter-active-class="opacity-100"
    leave-active-class="opacity-0 transition ease-out">
    <div
      class="absolute inset-x-0 top-2 md:top-6 lg:top-12 max-w-screen-sm mx-auto z-30 p-4 text-neutral-100 rounded-sm"
      :class="`bg-${notification.type} shadow-${notification.type}/15`">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckIcon class="h-6 w-6" v-if="['success', 'info'].includes(notification.type)" />
          <ExclamationTriangleIcon class="h-6 w-6" v-if="['warning', 'error'].includes(notification.type)" />
        </div>
        <div class="ml-3">
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

<style scoped>
/* Colors:
    bg-info shadow-info/15
    bg-warning shadow-warning/15
    bg-error shadow-error/15
    bg-success shadow-success/15
  */
</style>
