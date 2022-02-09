<template>
  <div>

    <div class="flex flex-row justify-between items-center">
      <h2 class="text-2xl font-medium">{{subcategoryName}}</h2>

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
            <Product
              :name="product.name"
              :image="product.image"
              :price="product.price"
              :slug="product.slug"
            />
          </div>
        </transition-group>
      </div>

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`api/products?subcategories=${this.subcategoryID}`)
    .then((res) => {
      this.products = res.map(({subcategory, name, ...rest}) => ({
        ...rest,
        name: name.value
      }))
    })
  },
  created() {
    this.$store.commit('categories/setSubcategory', this.$route.params.subcategory)
    let subcategory= this.$store.getters['categories/getSubcategory']

    this.subcategoryID = subcategory._id
    this.subcategoryName = subcategory.name
  },
  computed: {
    query() {
      return this.$store.state.filters.query
    }
  },
  watch: {
    async query(newQuery) {
      if (newQuery.length > 0) {
        this.products = await this.$axios.$get(`api/products/${this.subcategoryID}?${newQuery}`)
        this.$store.commit("filters/setAvailableFilters", this.products.map(product => product.properties).flat())
      }
      else {
        this.$fetch()
        await this.$store.dispatch("filters/getFilters", this.subcategoryID)
      }
    }
  },
  data() {
    return {
      subcategoryID: '',
      subcategoryName: '',
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