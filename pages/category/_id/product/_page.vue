<template>
  <div>
    <transition
        enter-active-class="animate-animated animate-faster animate-slideInRight"
        leave-active-class="animate-animated animate-faster animate-slideOutRight"
        @after-leave="leave"
        mode="out-in"
        appear
    >
      <ProductPage @hide="show = false" v-if="show" />
    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    leave() {
      this.$router.push(`/category/${this.$route.params.id}`)
    }
  }
}
</script>
