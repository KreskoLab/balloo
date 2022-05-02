<template>
  <div class="page pb-6">
    <div class="grid grid-cols-2 gap-x-6 gap-y-4 lg:(grid-cols-4 gap-x-12 gap-y-6)">
      <UiCategoryCard
        v-for="subcategory in subcategories"
        :key="subcategory.slug"
        :name="subcategory.name"
        :slug="subcategory.slug"
        :category="subcategory.category"
        :image="subcategory.image"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    subcategories() {
      return this.$store.getters['categories/getSubcategories']
    },
  },

  watch: {
    '$i18n.locale': async function () {
      await this.$store.dispatch('categories/getCategories')
    },
  },
}
</script>
