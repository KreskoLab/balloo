<template>
    <div class="w-full h-screen bg-light-100 overflow-auto">

        <div class="hidden sm:block">
          <Header />
        </div>

        <div>
          <Navbar />
        </div>

        <div class="flex flex-row my-3 sm:(space-x-12 my-6 px-2)">

          <div class="hidden sm:(block w-full w-1/4) pl-4" v-if="$route.name !== 'index'">
            <Sidebar />
          </div>

          <div class="w-full px-4">
            <Nuxt />
          </div>

        </div>

    </div>
</template>

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