<template>
  <div class="relative w-max">
    <button
      v-click-outside="close"
      @click="active = !active"
    >
      <slot name="header" />
    </button>

    <transition
      enter-active-class="animate-animated animate-faster animate-bounceIn"
      leave-active-class="animate-animated animate-faster animate-slideOutRight"
    >
      <ul
        v-if="active"
        class="absolute w-full mt-7 bg-light-50 border-dark-600"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'UiDropdown',
  directives: {
    ClickOutside,
  },

  data() {
    return {
      active: false,
    }
  },

  methods: {
    close() {
      this.active = false
    },
  },
}
</script>
