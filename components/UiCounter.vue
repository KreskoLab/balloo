<template>
  <div
    v-if="count > 0"
    class="absolute rounded-1/2 h-3 w-3 lg:(h-4 w-4 -right-5px -top-2px) -top-1px -right-3px flex justify-center items-center"
    :class="color"
  >
    <p class="text-light-50 text-xs ml-1px">{{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'UiCounter',
  props: {
    count: {
      type: Number,
      default: 0,
    },

    color: {
      type: String,
      default: 'text-red-400',
    },
  },
}
</script>
