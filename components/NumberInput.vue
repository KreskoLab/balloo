<template>
  <div class="flex space-x-4 select-none">
    <button @click="dec()">
      -
    </button>

    <span>{{count}}</span>

    <button @click="inc()">
      +
    </button>
  </div>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    id: String,
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    inc() {
      this.$store.commit("cart/incAmount", this.id)
    },
    dec() {
      if (this.count !== 1) {
        this.$store.commit("cart/decAmount", this.id)
      }
    }
  }
}
</script>
