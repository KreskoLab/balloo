<template>
    <aside class="h-full px-2">
        
      <div :class="subcategories_class">
        <Subcategories />
      </div>

      <div
        class="py-2"
        v-if="$route.name === 'category-id-subcategory' || $route.name === 'category-id-subcategory-product-page'"
      >
        <Filters />
      </div>

    </aside>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    subcategories_class() {
      if (this.$route.name === 'category-id-subcategory' || this.$route.name === 'category-id-subcategory-product-page') {
        return 'border-b-1 border-gray-500 w-11/12'
      }
      else return ''
    }
  }
}
</script>