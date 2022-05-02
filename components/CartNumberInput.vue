<template>
  <div class="flex space-x-4 w-16 select-none">
    <button @click="dec()">-</button>

    <span class="w-4">{{ count }}</span>

    <button @click="inc()">+</button>
  </div>
</template>

<script>
export default {
  name: 'CartNumberInput',
  props: {
    id: {
      type: String,
      default: '',
    },

    count: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    inc() {
      this.$store.commit('cart/incAmount', this.id)
    },

    dec() {
      if (this.count !== 1) {
        this.$store.commit('cart/decAmount', this.id)
      }
    },
  },
}
</script>
