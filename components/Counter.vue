<template>
  <div
      class="absolute rounded-1/2 h-4 w-4 -top-2px -right-5px flex justify-center items-center"
      :class="color"
      v-if="count > 0"
  >
    <p class="text-light-50 text-xs ml-1px">{{count}}</p>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    count: {
      type: Number,
      default: 0
    },
    color: String
  }
}
</script>