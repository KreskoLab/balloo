<template>
  <div class="relative min-h-64">
    <div class="relative flex w-full overflow-hidden">
      <slot />
    </div>

    <ul class="w-full text-center space-x-4">
      <li
        v-for="(item, index) in items"
        :key="item"
      >
        <button
          type="button"
          class="w-3 h-3 rounded-full border-2 border-dark-600"
          :class="{ 'bg-teal-300': index === selected }"
          @click="selected = index"
        />
      </li>
    </ul>

    <div
      class="hidden lg:(absolute flex justify-between transform -translate-y-1/2 -left-8 -right-6 top-1/2 text-dark-200)"
    >
      <button
        class="w-6 h-6 top-1/2 left-0"
        @click="prevSlide()"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        class="w-6 h-6 top-1/2 left-0"
        @click="nextSlide()"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import TouchEvent from '@/plugins/swipe'

export default {
  name: 'AppCarousel',

  data() {
    return {
      selected: 0,
      animation: '',
      items: [],
      touchEvent: null,
    }
  },

  computed: {
    indicators() {
      return this.items.length - 1
    },
  },

  watch: {
    selected(val, old) {
      val > old ? (this.animation = 'slide-left') : (this.animation = 'slide-right')
    },
  },

  mounted() {
    this.items = this.$children.map((item, index) => index)

    document.addEventListener('touchstart', (event) => {
      this.touchEvent = new TouchEvent(event)
    })

    document.addEventListener('touchend', this.handleSwipe)
  },

  methods: {
    nextSlide() {
      if (this.selected < this.indicators) {
        this.selected++
      }
    },

    prevSlide() {
      if (this.selected > 0) {
        this.selected--
      }
    },

    handleSwipe(event) {
      if (!this.touchEvent) {
        return
      }

      this.touchEvent.setEndEvent(event)

      if (this.touchEvent.isSwipeRight()) {
        this.nextSlide()
      } else if (this.touchEvent.isSwipeLeft()) {
        this.prevSlide()
      }

      // Reset event for next touch
      this.touchEvent = null
    },
  },
}
</script>
