<template>
    <div class="w-full bg-light-100">

      <div class="w-full fixed top-0 z-50 bg-light-100">
        <Header/>
        <Navbar/>
      </div>

      <div class="flex container mx-auto !max-w-screen-2xl h-screen pt-20 lg:(pt-30)">
        <div class="hidden sm:(block w-1/4 pt-6 px-6)" v-if="$route.name !== 'index' && $route.name !== 'favorites'">
          <Sidebar />
        </div>

        <div class="relative w-full h-full max-w-full max-h-full overflow-hidden">
          <Nuxt />
          <Cart />
        </div>
      </div>

      <transition
          enter-active-class="animate-animated animate-faster animate-slideInLeft"
          leave-active-class="animate-animated animate-faster animate-slideOutLeft"
          mode="out-in"
          appear
      >
        <div class="absolute top-0 w-full h-full sm:(hidden)" v-if="showHamburgerMenu">
          <HamburgerMenu />
        </div>
      </transition>

    </div>
</template>

<script>
export default {
  computed: {
    showCart() {
      return this.$store.state.cart.show
    },
    showHamburgerMenu() {
      return this.$store.state.showHamburgerMenu
    }
  }
}
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.3s;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }
</style>