<template>
  <div
    class="fixed flex overflow-y-auto top-20 w-full h-[calc(100%-5rem)] lg:(top-30 h-[calc(100%-7.5rem)] w-[calc(100%-320px)] border-r-2 border-b-2 border-l-2 border-dark-600) bg-light-50"
  >
    <UiButton
      color="bg-transparent"
      size="px-3 py-1"
      class="hidden lg:(absolute block w-max h-max flex-grow-0 top-5 left-5)"
      @click.native="hide()"
    >
      X
    </UiButton>

    <div
      v-if="!$fetchState.pending"
      class="flex flex-col w-full h-full pt-4 lg:(px-16)"
    >
      <h1 class="text-2xl tracking-widest self-center font-medium lg:(text-3xl)">
        {{ product.name }}
      </h1>

      <div class="flex flex-col lg:(flex-row space-x-24 px-12)">
        <div class="mx-auto lg:mx-0">
          <UiSlider :images="product.image" />
        </div>

        <div class="flex flex-col py-6 space-y-4 items-center lg:(py-8 space-y-6 items-start)">
          <div class="rounded-full bg-blue-200 w-max px-6 py-2">
            <span class="font-semibold text-lg text-dark-200">{{ product.price.toFixed(2) }} ₴</span>
          </div>

          <div>
            <p class="font-medium text-center lg:(text-left)">{{ product.description }}</p>

            <ul class="flex flex-row space-x-2 mt-3">
              <li
                v-for="property in product.properties"
                :key="property.slug"
              >
                {{ property.name }}:
                <span class="font-normal ml-1">{{ property.value }}.</span>
              </li>
            </ul>
          </div>

          <div class="flex space-x-6 w-10/12 lg:(w-max)">
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

            <FavoriteIcon
              :is-fill="isFavorite(product.slug)"
              size="w-10 h-10"
              @click.native="addFavorite(product.slug)"
            />
          </div>
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

  watch: {
    '$i18n.locale': function () {
      this.$fetch()
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
      this.$store.commit('cart/addToCart', this.product.slug)
    },

    hide() {
      this.$emit('hide')
    },
  },
}
</script>
