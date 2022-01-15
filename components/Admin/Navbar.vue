<template>
  <div class="flex flex-col w-full space-y-4">

    <NuxtLink to="/">
      <h1 class="font-semibold text-2xl text-center">Balloo</h1>
    </NuxtLink>

    <div 
      v-for="item in links" 
      :key="item.link"
    >
      <NuxtLink class="flex items-center space-x-2" :to="`/admin/${item.link}`">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
        </svg>
        <h2 class="font-medium text-lg">{{ item.name }}</h2>
      </NuxtLink>
    </div>

  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          name: 'Категории',
          link: 'categories',
          icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
        },

        {
          name: 'Подкатегории',
          link: 'subcategories',
          icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
        },

        {
          name: 'Фильтры',
          link: 'filters',
          icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
        },

        {
          name: 'Товары',
          link: 'products',
          icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
        }
      ]
    }
  }
}
</script>
