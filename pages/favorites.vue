<template>
  <div class="page">
    <h1 class="text-2xl font-semibold">
      <template v-if="favorites.length">
        {{ $t('favorites.title') }}
      </template>

      <template v-else>
        {{ $t('favorites.titleEmpty') }}
      </template>
    </h1>
    <h2 class="text-dark-200 font-medium mt-4">
      {{ $t('favorites.subtitle') }}
    </h2>

    <div v-if="!$fetchState.pending">
      <div
        v-if="products.length > 0"
        class="grid grid-cols-2 gap-x-4 gap-y-4 my-8 sm:(grid-cols-4 gap-x-8 gap-y-4)"
      >
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :name="product.name"
          :slug="product.slug"
          :price="product.price"
          :image="product.image"
          :category="product.category"
        />
      </div>

      <div
        v-else
        class="flex justify-center items-center my-16"
      >
        <nuxt-link to="/">
          <UiButton color="bg-red-200"> {{ $t('favorites.shop') }}</UiButton>
        </nuxt-link>
      </div>
    </div>
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
    if (this.favorites.length > 0) {
      let query = ''
      this.favorites.forEach((item) => (query += `slugs=${item.product}&`))
      await this.$axios.$get(`api/products?${query}`).then((res) => {
        this.products = res.map(({ name, subcategories, ...rest }, index) => ({
          name: name.value,
          category: this.favorites[index].category,
          ...rest,
        }))
      })
    }
  },

  computed: {
    favorites() {
      return this.$store.state.favorites.list
    },
  },

  watch: {
    favorites() {
      this.products = this.products.filter((item) => this.favorites.some((favorite) => item.slug === favorite.product))
    },
  },
}
</script>
