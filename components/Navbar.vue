<template>
  <nav class="flex items-center mx-auto px-4 lg:(px-6) h-20 border-b-2 border-dark-600 animate-slow animate-fadeInLeft">
    <div
      class="block cursor-pointer lg:(hidden)"
      @click="showHamburgerMenu()"
    >
      <svg
        v-if="!showHamburger"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>

      <svg
        v-else
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <div class="flex flex-1 justify-center ml-9 lg:(order-first flex-grow-0 ml-0)">
      <NuxtLink to="/">
        <h1 class="text-2xl font-semibold text-dark-500 select-none">Balloo</h1>
      </NuxtLink>
    </div>

    <div class="hidden lg:(block mx-12 h-full)">
      <NavBarCategoriesList />
    </div>

    <div class="flex items-center space-x-4 lg:(ml-auto space-x-6) text-dark-500 font-medium">
      <nuxt-link
        class="relative hover:(text-red-400)"
        to="/favorites"
      >
        <svg
          class="h-6 w-6 lg:(h-7 w-7)"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        <UiCounter
          :count="favorites"
          color="bg-red-400"
        />
      </nuxt-link>

      <div
        class="relative hover:(text-teal-400 cursor-pointer)"
        @click="showCart()"
      >
        <svg
          class="h-6 w-6 lg:(h-7 w-7)"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <UiCounter
          :count="cartProducts"
          color="bg-teal-400"
        />
      </div>

      <a
        v-if="!loggedIn"
        class="flex items-center space-x-2"
        href="http://localhost:8000/login"
      >
        <svg
          class="hidden lg:block h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </a>

      <div
        v-else
        class="cursor-pointer"
        @click="$store.dispatch('user/logout')"
      >
        <span class="hidden lg:(block)">{{ user.name }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    user() {
      return this.$store.state.user.user
    },

    loggedIn() {
      return this.$store.state.user.loggedIn
    },

    favorites() {
      return this.$store.state.favorites.list.length
    },

    cartProducts() {
      return this.$store.state.cart.list.length
    },

    showHamburger() {
      return this.$store.state.showHamburgerMenu
    },
  },

  methods: {
    showCart() {
      this.$store.commit('cart/showCart', true)
      this.$store.commit('setFiltersSheet', false)
    },

    showHamburgerMenu() {
      this.$store.commit('setHamburgerMenu')
    },
  },
}
</script>
