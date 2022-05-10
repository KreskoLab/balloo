<template>
  <div class="relative flex justify-center items-center px-4 py-8 h-full w-full lg:(h-lg w-md)">
    <div class="flex w-full h-full">
      <nuxt-img
        class="rounded-md animate-animated animate-faster"
        :class="animation"
        provider="cloudinary"
        width="512"
        height="512"
        :src="images[selected]"
        format="webp"
      />
    </div>

    <div class="flex absolute bottom-0 justify-center space-x-3">
      <button
        v-for="(item, index) in images"
        :key="item"
        type="button"
        class="w-3 h-3 rounded-full border-2 border-dark-600"
        :class="{ 'bg-teal-300': index === selected }"
        @click="selected = index"
      />
    </div>

    <div
      class="hidden lg:(absolute flex justify-between transform -translate-y-1/2 -left-6 -right-4 top-1/2 text-dark-200)"
    >
      <button
        class="w-6 h-6 top-1/2 left-0"
        @click="prevSlide()"
      >
        <svg
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
          />
        </svg>
      </button>

      <button
        class="w-6 h-6 top-1/2 left-0"
        @click="nextSlide()"
      >
        <svg
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import TouchEvent from '@/plugins/swipe'

export default {
  name: 'UiSlider',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selected: 0,
      animation: '',
      touchEvent: null,
    }
  },

  computed: {
    indicators() {
      return this.images.length - 1
    },
  },

  watch: {
    selected(val, old) {
      val > old ? (this.animation = 'animate-slideInLeft') : (this.animation = 'animate-slideInRight')
    },
  },

  mounted() {
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
