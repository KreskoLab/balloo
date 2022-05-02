<template>
  <ul class="flex flex-row items-center space-x-8 h-full">
    <li
      v-for="category in categoriesList"
      :key="category.slug"
      :class="category.slug === $route.params.id ? 'selected after:(animate-border)' : ''"
    >
      <NuxtLink :to="`/category/${category.slug}`">
        {{ category.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavBarCategoriesList',
  computed: {
    categoriesList() {
      return this.$store.state.categories.list
    },
  },
}
</script>

<style scoped>
li {
  @apply h-full
      flex relative
      justify-center items-center
      font-medium;
}

a {
  @apply py-1 px-2
      transition duration-200
      hover:(bg-teal-500 bg-opacity-10 rounded);
}

.selected {
  @apply after:(absolute content-DEFAULT bottom-0 bg-green-400 bg-opacity-70 w-full h-1);
}
</style>
