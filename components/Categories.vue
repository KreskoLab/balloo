<template>
    <ul class="flex flex-row items-center space-x-8 h-full">
        <li 
            v-for="category in categoriesList"
            :key="category.slug"
            :class="category.slug === $route.params.id ? 'selected' : ''"
        >
            <NuxtLink :to="`/category/${category.slug}`">
                {{ category.name }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'categories',
  async created() {
    await this.$store.dispatch('categories/getCategories')
  },
  computed: {
    categoriesList() {
        return this.$store.state.categories.list
    }
  }
}
</script>

<style scoped>
  li {
    @apply
    font-medium
    px-2 py-1
    hover:(bg-teal-500 bg-opacity-10 rounded transition duration-300)
  }

  .selected {
    @apply
      bottom-0
      border-b-2 border-dark-600
  }
</style>