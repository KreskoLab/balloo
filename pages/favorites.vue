<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold">{{title}}</h1>
    <h2 class="text-dark-200 font-medium mt-4">{{subtitle}}</h2>

    <div v-if="!$fetchState.pending">
      <div class="flex flex-row gap-x-12 my-6" v-if="products.length > 0">
        <Product
            v-for="product in products"
            :key="product._id"
            :name="product.name"
            :slug="product.slug"
            :price="product.price"
            :image="product.image"
        />
      </div>

      <div class="flex justify-center items-center my-16" v-else>
        <nuxt-link to="/">
          <button class="btn_shop">
            Продовжити покупки
          </button>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "favorites",
  async fetch() {
    if (this.favorites.length > 0) {
      let query = ''
      this.favorites.forEach(item => query += `slugs=${item}&`)

      await this.$axios.$get(`api/products?${query}`)
      .then((res) => {
        this.products = res.map(({ name, subcategories, ... rest }) => ({ name: name.value, ...rest }))
      })
    }
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    lang() {
      return this.$store.state.language.lang
    },
    title() {
      if (this.favorites.length > 0) {
        return this.lang === 'uk' ? 'Обрані товари' : 'Избранные товары'
      }
      else {
        return this.lang === 'uk' ? 'Ваш список улюблених товарів пустий' : 'Ваш список любимых товаров пустой'
      }
    },
    subtitle() {
      return this.lang === 'uk' ? 'Збережи товари на потім, щоб не забути про них': 'Сохрани товары на потом, чтобы не забыть о них'
    },
    favorites() {
      return this.$store.state.favorites.list
    }
  },
  watch: {
    favorites() {
      this.products = this.products.filter(item => this.favorites.includes(item.slug))
    }
  }
}
</script>

<style scoped>
  .btn_shop {
    @apply
    appearance-none
    relative
    bg-green-200 border-dark-600 border-2
    px-6 py-2
    font-medium text-lg
    transition-all transform duration-0
    hover:(cursor-pointer translate-y-3px)
    after:(content-DEFAULT absolute bottom-0 -right-2px -left-2px border-transparent border-6 transform translate-y-12px)
  }

  .btn_shop:after {
    border-top-color: #1c1c1e;
  }

  .btn_shop:hover:after {
    @apply translate-y-8px border-4 right-0 left-0
  }
</style>