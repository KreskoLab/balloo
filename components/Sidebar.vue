<template>
    <aside class="h-max px-2">
        
        <div :class="subcategories_class">
            <Subcategories />
        </div>

        <div
            class="py-2"
            v-if="$route.name !== 'category-id'"
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
      return this.$route.name !== 'category-id' ? 'border-b-1 border-gray-500' : ''
    }
  }
}
</script>