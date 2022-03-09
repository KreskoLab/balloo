<template>
  <transition
    enter-active-class="animate-animated animate-faster animate-slideInRight"
    leave-active-class="animate-animated animate-slideOutRight"
    mode="out-in"
    appear
  >
    <div
        class="absolute right-0 top-0 h-full w-full sm:(w-5/12) bg-light-100 border-r-2 border-b-2 border-l-2 border-dark-600"
        v-if="showCart"
    >

      <div class="flex flex-col space-y-4 w-full h-full py-9 sm:(py-6)">

        <div class="px-8">
          <div class="flex justify-between">
            <p class="text-2xl font-semibold">Кошик</p>

            <button class="btn_close" @click="hide()">
              X
            </button>
          </div>

          <p class="text-center my-6" v-if="cartProducts.length === 0">Ваш кошик порожній</p>
        </div>

        <div
          class="flex flex-col space-y-8 h-full overflow-y-auto px-8"
          v-if="cartProducts.length > 0"
        >

          <div
            class="relative flex flex-row after:(content-DEFAULT absolute -bottom-4 w-full h-0.3 bg-gray-200)"
            v-for="product in cartProducts"
            :key="product.slug"
          >

            <div class="w-48 rounded-sm bg-blue-gray-100 p-2">
              <img class="w-full h-full" :src="$config.imagesURL + product.image" :alt="product.name"/>
            </div>

            <div class="flex flex-col justify-between w-full ml-4 my-1">
              <p class="font-medium">{{product.name}}</p>

              <NumberInput :count="product.amount" :id="product._id" />
            </div>

            <div class="flex flex-col justify-between items-end w-full my-1">
              <p class="font-medium">₴ {{product.price}}</p>

              <svg
                  class="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  @click="del(product._id)"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

          </div>

        </div>

        <div class="px-8" v-if="cartProducts.length > 0">
          <div class="flex justify-between my-4">
            <span>Усього</span>
            <span class="text-lg font-medium">₴ {{total}}</span>
          </div>

          <button class="btn_buy w-full font-medium">Оплатити</button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Cart",
  computed: {
    showCart() {
      return this.$store.state.cart.show
    },
    cartProducts() {
      return this.$store.state.cart.list
    },
    total() {
      return this.$store.getters["cart/summary"]
    }
  },
  methods: {
    hide() {
      this.$store.commit("cart/showCart")
    },
    del(id) {
      this.$store.commit("cart/removeFromCart", id)
    }
  }
}
</script>

<style scoped>
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