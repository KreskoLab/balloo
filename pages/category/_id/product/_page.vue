<template>
  <div class="lg:(ml-[320px])">
    <transition
      enter-active-class="animate-animated animate-faster animate-slideInRight"
      leave-active-class="animate-animated animate-faster animate-slideOutRight"
      mode="out-in"
      appear
      @after-leave="leave"
    >
      <TheProductPage
        v-if="show"
        @hide="show = false"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },

  methods: {
    leave() {
      this.$router.push(`/category/${this.$route.params.id}`)
    },
  },
}
</script>
