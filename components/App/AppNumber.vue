<template>
  <div class="flex space-x-4 w-16 select-none">
    <button @click="dec()">-</button>

    <span class="w-4">{{ count }}</span>

    <button @click="inc()">+</button>
  </div>
</template>

<script>
export default {
  name: 'AppNumber',
  props: {
    id: {
      type: String,
      default: '',
    },

    count: {
      type: Number,
      default: 1,
    },

    maxCount: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    inc() {
      if (this.count < this.maxCount) {
        this.$emit('inc')
      }
    },

    dec() {
      if (this.count !== 1) {
        this.$emit('dec')
      }
    },
  },
}
</script>
