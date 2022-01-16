<template>
    <div>
        
      <div class="flex flex-row justify-between">
          <h2 class="text-2xl font-medium">{{category.name}}</h2>

          <div class="font-medium">
              дешевші
          </div>
      </div>

      <Card
        :name="products[0].name"
      />
        

    </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get(`api/products?${this.subcategories_query}`)
    .then((res) => {
      this.products = res.map(product => ({ ...product, name: product.name.find(item => item.lang === 'ua').value}))
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