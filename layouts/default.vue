<template>
  <div class="w-full bg-light-100">
    <div class="w-full fixed top-0 z-50 bg-light-100">
      <TheFooter />
      <NavBar />
    </div>

    <div class="relative flex w-full h-screen overflow-y-auto overflow-x-hidden pt-20 lg:(pt-30)">
      <SideBar v-if="$route.name !== 'index' && $route.name !== 'favorites'" />

      <main class="w-full">
        <Nuxt />
      </main>

      <TheCart />

      <SideBarBottomSheet />
    </div>

    <transition
      enter-active-class="animate-animated animate-faster animate-slideInLeft"
      leave-active-class="animate-animated animate-faster animate-slideOutLeft"
      mode="out-in"
      appear
    >
      <div
        v-if="showHamburgerMenu"
        class="absolute top-0 w-full h-full lg:(hidden)"
      >
        <TheHamburgerMenu />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    showHamburgerMenu() {
      return this.$store.state.showHamburgerMenu
    },
  },
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
