<template>
  <transition
    enter-active-class="animate-animated animate-faster animate-slideInRight"
    leave-active-class="animate-animated animate-slideOutRight"
    mode="out-in"
    appear
  >
    <div
      v-if="showCart"
      class="fixed right-0 top-20 h-[calc(100%-5rem)] w-full lg:(w-5/12 h-[calc(100%-7.5rem)] top-30) bg-light-100 border-r-2 border-b-2 border-l-2 border-dark-600"
    >
      <div class="flex flex-col space-y-4 w-full h-full pt-4 pb-6 lg:(py-6)">
        <div class="px-8">
          <div class="flex items-center justify-between">
            <p class="text-2xl font-semibold">{{ $t('cart.title') }}</p>

            <div class="w-max">
              <AppButton
                color="bg-transparent"
                size="py-0.3 px-2"
                @click.native="hide()"
              >
                X
              </AppButton>
            </div>
          </div>

          <p
            v-if="cartProducts.length === 0"
            class="text-center my-6"
          >
            {{ $t('cart.empty') }}
          </p>
        </div>

        <div
          v-if="cartProducts.length > 0"
          class="flex flex-col space-y-8 h-full overflow-y-auto px-8 pt-4"
        >
          <div
            v-for="product in products"
            :key="product.slug"
            class="relative flex flex-row after:(content-DEFAULT absolute -bottom-4 w-full h-0.3 bg-gray-200)"
          >
            <nuxt-img
              :src="product.image[0]"
              :alt="product.name"
              provider="cloudinary"
              class="lg:rounded"
              format="webp"
              width="96"
              height="96"
            />

            <div class="flex flex-col justify-between w-full ml-4 my-1">
              <p class="font-medium">{{ product.name }}</p>

              <AppNumber
                :id="product._id"
                :count="product.amount"
                :max-count="product.quantity"
                @inc="product.amount++"
                @dec="product.amount--"
              />
            </div>

            <div class="flex flex-col justify-between items-end w-full my-1">
              <p class="font-medium">₴ {{ product.price.toFixed(2) }}</p>

              <svg
                class="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="del(product.slug)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          v-if="products.length"
          class="px-8"
        >
          <div class="flex justify-between my-4">
            <span>{{ $t('cart.total') }}</span>
            <span class="text-lg font-medium">₴ {{ total.toFixed(2) }}</span>
          </div>

          <div class="w-full">
            <AppButton color="bg-rose-200">
              {{ $t('cart.pay') }}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheCart',

  data() {
    return {
      products: [],
    }
  },

  async fetch() {
    if (this.cartProducts.length) {
      const slugs = this.cartProducts.map((product) => `slugs=${product.slug}`).join('&')
      this.products = await this.$axios
        .$get(`api/products?${slugs}`)
        .then((res) => res.map((product) => ({ ...product, amount: 1 })))
    }
  },

  computed: {
    showCart() {
      return this.$store.state.cart.show
    },

    cartProducts() {
      return this.$store.state.cart.list
    },

    total() {
      return this.products.reduce((total, cv) => total + Number(cv.price) * Number(cv.amount), 0)
    },
  },

  watch: {
    showCart(show) {
      if (show) this.$fetch()
    },
  },

  methods: {
    hide() {
      this.$store.commit('cart/showCart')
    },

    del(productSlug) {
      const index = this.products.indexOf((product) => product.slug === productSlug)
      this.products.splice(index, 1)
      this.$store.commit('cart/removeFromCart', productSlug)
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #fcfcfc;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #52525b;
  border-radius: 10px;
}
</style>
