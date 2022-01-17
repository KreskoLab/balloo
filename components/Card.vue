<template>
  <div class="flex flex-col space-y-2 transition-all ease-in-out duration-300 hover:(cursor-pointer p-2)">
    <img class="rounded-sm" :src="image" :alt="name" />
    <h1 class="font-medium text-xl text-dark-800">{{name}}</h1>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>