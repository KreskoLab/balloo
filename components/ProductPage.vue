<template>
    <div class="absolute overflow-y-auto -top-8 sm:(top-0 border-r-2 border-b-2 border-l-2 border-dark-600) h-full w-full bg-light-100">
        <div
          class="flex flex-col sm:(flex-row py-8 px-6)"
          v-if="!$fetchState.pending"
        >
          <button
            class="btn_close w-max top-12 left-4 sm:(h-max flex-grow-0 top-0 left-0 mr-16)"
            @click="hide()"
          >
            X
          </button>

          <div class="w-full py-14 sm:(w-3/5 p-12) rounded-sm bg-blue-gray-100">
            <div class="mx-auto w-max">
              <nuxt-picture :src="$config.imagesURL + product.image" format="webp"/>
            </div>
          </div>

          <div class="w-full px-4 pt-6 sm:(ml-24 w-3/5 px-0 pt-0)">
            <h1 class="text-3xl font-medium mb-2">{{ product.name }}</h1>

            <div class="relative w-max px-6 before:(absolute content-DEFAULT inset-x-1 bg-teal-300 bg-opacity-80 w-full h-full transform -skew-y-3)">
              <span class="relative text-xl font-medium">₴ {{ product.price }}</span>
            </div>

            <div class="flex items-center space-x-18 mt-6">
              <button @click="addToCart()" class="btn_buy flex items-center justify-center text-lg font-medium w-3/5">
                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span class="ml-4">В корзину</span>
              </button>

              <svg
                class="h-10 w-10 hover:(text-red-400 cursor-pointer)"
                :class="isFavorite(product.slug) ? 'text-red-400' : ''"
                :fill="isFavorite(product.slug) ? 'currentColor' : 'none'"
                @click="addFavorite(product.slug)"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>

            <div class="mt-8">
              <p class="my-2">Согревает не любовь, а ткань.</p>

              <p class="mt-1" v-for="property in product.properties" :key="property.slug">
                <span class="font-medium">{{ property.name }}:</span>
                <span class="ml-1">{{ property.value }}</span>
              </p>
            </div>

          </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "ProductPage",
  async fetch() {
    await this.$axios.$get(`api/product/${this.$route.params.page}`)
    .then((res) => Object.assign(this.product, res[0]))
  },
  data() {
    return {
      product: {}
    }
  },
  computed: {
    favorites() {
      return this.$store.state.favorites.list
    }
  },
  methods: {
    addFavorite(product) {
      this.$store.commit("favorites/setItem", product)
    },
    isFavorite(product) {
      return this.favorites.includes(product)
    },
    addToCart() {
      this.$store.commit("cart/addToCart", this.product)
    },
    hide() {
      this.$emit('hide')
    }
  }
}
</script>

<style scoped>
.btn_close {
  @apply
  appearance-none
  relative
  border-dark-600 border-2
  px-2
  font-medium text-lg
  transform
  hover:(cursor-pointer translate-y-3px)
  after:(content-DEFAULT absolute bottom-0 -left-0.5 -right-0.5 border-transparent border-4 transform translate-y-2)
}

.btn_close:after {
  border-top-color: #1c1c1e;
}

.btn_close:hover:after {
  @apply translate-y-1.5 border-2 right-0 left-0
}

.btn_buy {
  @apply
  appearance-none
  relative
  bg-emerald-200 border-dark-600 border-2
  py-2
  transform
  hover:(cursor-pointer translate-y-3px)
  after:(content-DEFAULT absolute bottom-0 -right-2px -left-2px border-transparent border-6 transform translate-y-12px)
}

.btn_buy:after {
  border-top-color: #1c1c1e;
}

.btn_buy:hover:after {
  @apply translate-y-8px border-4 right-0 left-0
}
</style>