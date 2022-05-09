<template>
  <div>
    <div
      v-if="!$fetchState.pending"
      class="page lg:(ml-[320px])"
    >
      <div class="flex flex-row justify-between items-center">
        <h2 class="text-lg sm:text-2xl font-medium">{{ subcategory.name }}</h2>

        <div class="flex space-x-4">
          <div class="font-medium">дешевші</div>

          <svg
            class="transform rotate-90 h-6 w-6 md:(hidden)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            @click="showFiltersSheet()"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
      </div>

      <transition-group
        class="grid grid-cols-2 gap-x-4 gap-y-4 my-8 sm:(grid-cols-3 gap-x-8 gap-y-4)"
        name="fade"
        tag="div"
      >
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :name="product.name"
          :image="product.image"
          :price="product.price"
          :slug="product.slug"
          :category="`${$route.params.id}/${$route.params.subcategory}`"
        />
      </transition-group>
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
    this.$store.commit('categories/setSubcategory', this.$route.params.subcategory)

    await this.$axios.$get(`api/products?subcategories=${this.subcategory._id}`).then((res) => {
      this.products = res.map(({ subcategory, properties, name, ...rest }) => ({
        ...rest,
        name: name.value,
      }))
    })
  },

  computed: {
    query() {
      return this.$store.state.filters.query
    },

    subcategory() {
      return this.$store.getters['categories/getSubcategory']
    },
  },

  watch: {
    async query(newQuery) {
      if (newQuery.length > 0) {
        this.products = await this.$axios.$get(`api/products/${this.subcategory._id}?${newQuery}`)
        this.$store.commit('filters/setAvailableFilters', this.products.map((product) => product.properties).flat())
      } else {
        this.$fetch()
        await this.$store.dispatch('filters/getFilters', this.subcategory._id)
      }
    },

    '$i18n.locale': async function () {
      await this.$store.dispatch('categories/getCategories')
      this.$fetch()
    },

    $route(to, from) {
      if (
        to.name === 'category-id-subcategory' &&
        from.name !== 'category-id-subcategory-product-page' &&
        Object.keys(to.query).length === 0
      ) {
        this.$fetch()
      }
    },
  },

  methods: {
    showFiltersSheet() {
      this.$store.commit('setFiltersSheet', true)
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
