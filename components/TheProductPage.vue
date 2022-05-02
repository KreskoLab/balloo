<template>
  <div
    class="fixed overflow-y-auto top-10 pb-4 h-[calc(100%-2.5rem)] lg:(top-30 h-[calc(100%-7.5rem)] pb-0 border-r-2 border-b-2 border-l-2 border-dark-600) w-full bg-light-50"
  >
    <div
      v-if="!$fetchState.pending"
      class="flex flex-col lg:(flex-row py-8 px-6)"
    >
      <UiButton
        color="bg-transparent"
        size="px-3 py-1"
        class="w-max top-14 left-4 lg:(h-max flex-grow-0 top-0 left-0 mr-4) xl:(h-max flex-grow-0 top-0 left-0 mr-16)"
        @click.native="hide()"
      >
        X
      </UiButton>

      <nuxt-img
        :src="$config.imagesURL + product.image"
        class="lg:rounded"
        format="webp"
        width="800"
        height="800"
        sizes="sm:100vw md:100vw lg:120px xl:120px xxl:160px"
      />

      <div class="w-full px-4 mt-3 lg:ml-2 xl:(ml-24 w-full px-0 pt-0)">
        <h1 class="text-2xl text-center font-medium lg:(text-left text-3xl)">
          {{ product.name }}
        </h1>

        <div class="flex items-center justify-center space-x-12 mt-4 lg:(justify-start space-x-24)">
          <div
            class="relative px-6 w-max before:(absolute content-DEFAULT inset-x-1 bg-teal-300 bg-opacity-80 w-full h-full transform -skew-y-3)"
          >
            <span class="relative text-xl font-medium"> ₴ {{ product.price.toFixed(2) }} </span>
          </div>

          <FavoriteIcon
            :is-fill="isFavorite(product.slug)"
            size="w-10 h-10"
            @click.native="addFavorite(product.slug)"
          />
        </div>

        <div class="mt-6 w-10/12 mx-auto lg:(w-72 mx-0)">
          <UiButton @click.native="addToCart()">
            <template #icon>
              <svg
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </template>
            В корзину
          </UiButton>
        </div>

        <div class="mt-5">
          <p>{{ product.description }}</p>

          <ul class="mt-3">
            <li
              v-for="property in product.properties"
              :key="property.slug"
              class="font-medium my-1"
            >
              {{ property.name }}:
              <span class="font-normal ml-1">{{ property.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProductPage',
  data() {
    return {
      product: {},
    }
  },

  async fetch() {
    await this.$axios.$get(`api/product/${this.$route.params.page}`).then((res) => Object.assign(this.product, res[0]))
  },

  computed: {
    favorites() {
      return this.$store.state.favorites.list.map((favorite) => favorite.product)
    },
  },

  methods: {
    addFavorite(product) {
      this.$store.commit('favorites/setItem', {
        product,
        category: this.$route.params.id,
      })
    },

    isFavorite(productSlug) {
      return this.favorites.includes(productSlug)
    },

    addToCart() {
      this.$store.commit('cart/addToCart', this.product)
    },

    hide() {
      this.$emit('hide')
    },
  },
}
</script>
