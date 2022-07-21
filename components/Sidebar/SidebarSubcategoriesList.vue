<template>
  <div class="w-full">
    <h2 class="font-semibold text-xl">{{ $t('catalog') }}</h2>

    <ul class="list-inside space-y-3 py-3">
      <li
        v-for="subcategory in subcategories"
        :key="subcategory._id"
        class="before:(absolute block m-auto top-0 bottom-0 -left-4 content-DEFAULT border-2 border-gray-600 rounded-full h-2 w-2) transform transition duration-600 hover:(translate-x-2 cursor-pointer) relative ml-6"
        :class="
          subcategory.slug === $route.params.subcategory ? 'before:(border-dark-600 bg-dark-600) font-medium' : ''
        "
      >
        <NuxtLink
          class="block"
          :to="`/category/${$route.params.id}/${subcategory.slug}`"
        >
          <span class="relative subcategory">
            {{ subcategory.name }}
          </span>
          <span class="text-gray-600">({{ subcategory.products }})</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarSubcategoriesList',
  computed: {
    subcategories() {
      return this.$store.getters['categories/getSubcategoriesBySlug'](this.$route.params.id)
    },
  },
}
</script>

<style scoped>
li:hover .subcategory {
  @apply before:(scale-x-100);
}

.subcategory {
  @apply before:(scale-x-0 absolute bottom-0 content-DEFAULT bg-dark-600 h-px w-full)
    before:(transform origin-left transition ease-in-out duration-400);
}
</style>
