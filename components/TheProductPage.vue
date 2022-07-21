<template>
  <article
    class="fixed top-20 w-full h-[calc(100%-5rem)] bg-light-50 lg:(top-30 h-[calc(100%-7.5rem)] w-[calc(100%-320px)] max-w-screen-2xl right-0 border-r-2 border-b-2 border-l-2 border-dark-600)"
  >
    <div
      v-if="!$fetchState.pending"
      class="flex flex-col w-full h-full lg:(flex-row h-full w-full)"
    >
      <ul
        class="border-r-2 border-dark-800 flex w-full snap snap-mandatory snap-x overflow-scroll lg:(snap-none relative overflow-y-scroll grid grid-cols-2 w-[720px])"
      >
        <li
          v-for="(image, i) in product.image"
          :key="image"
          :index="i"
          class="snap-start flex-shrink-0 h-full w-full"
        >
          <nuxt-img
            class="border-b-2 border-r-2 border-dark-800 w-full h-full"
            provider="cloudinary"
            width="1024"
            height="1024"
            :src="image"
            format="webp"
          />
        </li>
      </ul>

      <section class="flex flex-col border-l-2 border-dark-800 lg:flex-grow">
        <div class="flex flex-col space-y-3 border-b-2 border-dark-800 px-3 py-4">
          <h1 class="text-2xl tracking-wide text-left font-semibold lg:(text-3xl)">
            {{ product.name }}
          </h1>

          <div class="flex items-center justify-between">
            <span class="font-medium text-lg text-dark-200">{{ product.price.toFixed(2) }} ₴</span>
            <span class="text-sm font-medium">Код: DFWETWE</span>
          </div>
        </div>

        <div class="flex justify-between border-b-2 border-dark-800">
          <div class="flex justify-center border-r-2 border-dark-800 w-42 py-5">
            <FavoriteIcon
              :is-fill="isFavorite(product.slug)"
              size="w-8 h-8"
              @click.native="addFavorite(product.slug)"
            />
          </div>

          <button
            class="flex items-center justify-center space-x-2 bg-emerald-400 h-full w-full font-medium"
            @click="addToCart()"
          >
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
            <span>В корзину</span>
          </button>
        </div>

        <div class="py-4 px-3">
          <p class="font-medium">{{ product.description }}</p>

          <ul class="mt-3">
            <li
              v-for="property in product.properties"
              :key="property.slug"
              class="font-medium"
            >
              {{ property.name }}:
              <span class="font-normal ml-1">{{ property.value }}.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div class="absolute top-5 left-5 w-max h-max lg:(flex-grow-0)">
      <AppButton
        color="bg-white lg:bg-transparent"
        size="px-2 py-0.5"
        @click="hide()"
      >
        X
      </AppButton>
    </div>
  </article>
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

  mounted() {
    const element = document.getElementsByTagName('main')[0]
    element.classList.remove('maxcontainer')
  },

  beforeDestroy() {
    const element = document.getElementsByTagName('main')[0]
    element.classList.add('maxcontainer')
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
