<template>
  <div class="w-full h-full bg-pink-50 pt-20">
    <div class="flex flex-col py-6 px-5 h-10/12">
      <div class="flex justify-between items-center text-dark-300">
        <div class="flex items-center space-x-2">
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a
            href="tel:+380300300300"
            class="font-medium text-sm tracking-widest"
          >
            +380 300 300 300
          </a>
        </div>

        <div class="tracking-widest cursor-pointer text-sm inline-flex select-none">
          <div
            class="lang"
            :class="{ 'font-medium text-dark-600': $i18n.locale === 'uk' }"
            @click="$i18n.setLocale('uk')"
          >
            мова
          </div>
          <div class="mx-2 w-2">/</div>
          <div
            class="lang"
            :class="{ 'font-medium text-dark-600': $i18n.locale === 'ru' }"
            @click="$i18n.setLocale('ru')"
          >
            язык
          </div>
        </div>
      </div>

      <div class="max-h-3/5 overflow-y-auto mt-4">
        <h2 class="font-medium text-xl">Категории</h2>
        <ul class="text-lg text-dark-300 cursor-pointer py-1">
          <li
            v-for="category in categories"
            :key="category.slug"
          >
            <NuxtLink :to="`/category/${category.slug}`"> {{ category.name }} </NuxtLink>
          </li>
        </ul>
      </div>

      <ul class="font-medium text-xl cursor-pointer mt-2 space-y-2">
        <li v-if="loggedIn">Мои заказы</li>
        <li v-if="loggedIn">Настройки</li>
      </ul>

      <div class="mt-auto font-medium text-xl">
        <div v-if="loggedIn">
          <span class="cursor-pointer">Выйти</span>
        </div>

        <div
          v-else
          class="flex space-x-2 cursor-pointer"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>{{ $t('login') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHamburgerMenu',
  computed: {
    categories() {
      return this.$store.state.categories.list
    },

    loggedIn() {
      return this.$store.state.user.loggedIn
    },

    showCart() {
      return this.$store.state.cart.show
    },

    showHamburger() {
      return this.$store.state.showHamburgerMenu
    },
  },

  watch: {
    $route(to, from) {
      if (this.showHamburger) {
        this.hideBurgerMenu()
      }
    },

    showCart(show) {
      if (show && this.showHamburger) this.hideBurgerMenu()
    },
  },

  methods: {
    hideBurgerMenu() {
      this.$store.commit('setHamburgerMenu')
    },
  },
}
</script>
