<template>
  <div>
    <div
      v-if="show"
      class="lg:(ml-[320px])"
    >
      <div class="flex flex-row justify-between items-center">
        <h2 class="text-base font-medium sm:(text-2xl)">{{ category.name }}</h2>
        <div class="font-medium">дешевші</div>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-4 my-8 sm:(grid-cols-3 gap-x-8 gap-y-4)">
        <div
          v-for="product in products"
          :key="product._id"
        >
          <ProductCard
            :name="product.name"
            :image="product.image[0]"
            :slug="product.slug"
            :price="product.price"
            :category="$route.params.id"
          />
        </div>
      </div>
    </div>

    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    this.products = await this.$axios.$get(`api/products?${this.subcategories_query}`).then((res) => {
      return res.map((product) => ({
        ...product,
        name: product.name,
      }))
    })
  },

  computed: {
    category() {
      return this.$store.getters['categories/getCategoryBySlug'](this.$route.params.id)
    },

    show() {
      if (
        this.$route.name !== 'category-id-subcategory' &&
        this.$route.name !== 'category-id-subcategory-product-page' &&
        !this.$fetchState.pending
      ) {
        return true
      } else return false
    },

    subcategories_query() {
      let query = ''

      this.$store.getters['categories/getSubcategoriesBySlug'](this.$route.params.id)
        .map(({ _id }) => _id)
        .forEach((id) => (query += `subcategories=${id}&`))

      return query
    },
  },

  watch: {
    '$i18n.locale': async function () {
      await this.$store.dispatch('categories/getCategories')
      this.$fetch()
    },
  },
}
</script>
