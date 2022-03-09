<template>
  <div class="page">

    <div class="flex flex-row justify-between items-center">
      <h2 class="text-2xl font-medium">{{subcategory.name}}</h2>

      <div class="font-medium">
        дешевші
      </div>
    </div>


      <div v-if="!$fetchState.pending">
        <transition-group class="grid grid-cols-2 gap-x-4 gap-y-4 my-8 sm:(grid-cols-3 gap-x-8 gap-y-4)" name="fade" tag="div">
          <div
            v-for="product in products"
            :key="product._id"
          >
            <NuxtLink :to="`/category/${$route.params.id}/${$route.params.subcategory}/product/${product.slug}`">
              <Product
                :name="product.name"
                :image="product.image"
                :price="product.price"
                :slug="product.slug"
              />
            </NuxtLink>

          </div>
        </transition-group>
      </div>

    <nuxt-child />

  </div>
</template>

<script>
export default {
  async fetch() {
    this.$store.commit('categories/setSubcategory', this.$route.params.subcategory)

    await this.$axios.$get(`api/products?subcategories=${this.subcategory._id}`)
    .then((res) => {
      this.products = res.map(({subcategory, properties, name, ...rest}) => ({
        ...rest,
        name: name.value
      }))
    })
  },
  computed: {
    query() {
      return this.$store.state.filters.query
    },
    subcategory() {
      return this.$store.getters['categories/getSubcategory']
    }
  },
  watch: {
    async query(newQuery) {
      if (newQuery.length > 0) {
        this.products = await this.$axios.$get(`api/products/${this.subcategory._id}?${newQuery}`)
        this.$store.commit("filters/setAvailableFilters", this.products.map(product => product.properties).flat())
      }
      else {
        this.$fetch()
        await this.$store.dispatch("filters/getFilters", this.subcategory._id)
      }
    },
    async $route(to, from) {
      if (to.name === "category-id-subcategory" && Object.keys(to.query).length === 0) {
        await this.$fetch()
      }
    }
  },
  data() {
    return {
      products: []
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>