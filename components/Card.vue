<template>
  <div class="flex flex-col space-y-2 transition-all ease-in-out duration-300 hover:(cursor-pointer p-2)">
    <NuxtLink :to="`/category/${category}/${slug}`">
      <nuxt-img
          class="rounded-sm"
          width="320"
          height="320"
          format="webp"
          :src="$config.imagesURL + image"
          :alt="name"
      />
      <h1 class="font-medium text-xl text-dark-800 mt-2">{{ name }}</h1>
    </NuxtLink>
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
    slug: {
      type: String,
      default: ''
    },
    category: {
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