<template>
  <div>

    <div
      class="page"
      v-if="$route.name !== 'category-id-subcategory' && $route.name !== 'category-id-subcategory-product-page' && !$fetchState.pending"
    >
      <div class="flex flex-row justify-between items-center">
        <h2 class="text-2xl font-medium">{{ category.name }}</h2>

        <div class="font-medium">
          дешевші
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-4 my-8 sm:(grid-cols-3 gap-x-8 gap-y-4)">
        <div
            v-for="product in products"
            :key="product._id"
        >
          <Product
            :name="product.name"
            :image="product.image"
            :slug="product.slug"
            :price="product.price"
          />
        </div>
      </div>
    </div>

    <div>
      <nuxt-child/>
    </div>

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`api/products?${this.subcategories_query}`)
        .then((res) => {
          this.products = res.map(product => ({ ...product, name: product.name.value}))
        })
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    category() {
      return this.$store.getters['categories/getCategoryBySlug'](this.$route.params.id)
    },
    subcategories_query() {
      let query = ''
      this.$store.getters['categories/getSubcategoriesBySlug'](this.$route.params.id).map(({_id}) => _id)
          .forEach(id => query += `subcategories=${id}&`)
      return query
    }
  }
}
</script>