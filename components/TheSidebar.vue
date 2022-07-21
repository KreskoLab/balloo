<template>
  <aside
    class="hidden lg:(block fixed z-50 h-[calc(100%-7.5rem)] top-30 py-6 w-[320px] flex-none pl-6 overflow-y-auto overflow-x-hidden border-r-2 border-dark-600)"
  >
    <div :class="{ 'border-b-1 border-gray-500 w-11/12': categoryPage }">
      <SidebarSubcategoriesList />
    </div>

    <div
      v-if="$route.name === 'category-id-subcategory' || $route.name === 'category-id-subcategory-product-page'"
      class="h-full py-2"
    >
      <SidebarFiltersList />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'TheSidebar',
  computed: {
    categoryPage() {
      if (
        this.$route.name === 'category-id-subcategory' ||
        this.$route.name === 'category-id-subcategory-product-page'
      ) {
        return true
      } else return false
    },
  },
}
</script>
