<template>
    <div class="flex flex-col">

        <div class="w-full rounded-sm bg-blue-gray-100 transition duration-200 hover:(bg-orange-100) pt-4 sm:(pt-0)">

          <div
              class="hidden sm:block relative w-max rounded-full transition duration-300 hover:(bg-blue-gray-300 bg-opacity-50) p-5 ml-auto right-2 top-2"
              :class="isFavorite(slug) ? 'text-red-400' : ''"
              @click="addFavorite(slug)"
          >
            <svg :fill="isFavorite(slug) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>

          <NuxtLink :to="`/category/${$route.params.id}/product/${slug}`">
            <nuxt-img
                class="pb-6 px-2 mx-auto hover:(cursor-pointer) select-none"
                width="320"
                height="320"
                :src="$config.imagesURL + image"
                :alt="name"
                format="webp"
            />
          </NuxtLink>
        </div>

        <NuxtLink :to="`/category/${$route.params.id}/product/${slug}`">
          <div class="py-2">
            <div class="flex flex-row justify-between items-center text-base sm:text-lg font-medium">
              <h1>{{name}}</h1>
              <span>{{price}} ₴</span>
            </div>
          </div>
        </NuxtLink>

    </div>
</template>

<script>
export default {
  name: "product",
  props: {
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    }
  },
  computed: {
    favorites() {
      return this.$store.state.favorites.list
    }
  },
  methods: {
    addFavorite(product) {
      this.$store.commit("favorites/setItem", product)
    },
    isFavorite(product) {
      return this.favorites.includes(product)
    }
  }
}
</script>

<style scoped>
  svg {
    @apply
    absolute
    h-6 w-6
    top-2 right-0
    mr-2
    hover:(cursor-pointer)
  }
</style>