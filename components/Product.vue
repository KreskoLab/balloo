<template>
    <div class="flex flex-col">

      <div class="w-full border-2 border-gray-600 bg-blue-gray-50 transition duration-200 hover:(bg-orange-50)">

        <div @click="addFavorite(slug)" class="hidden sm:block relative w-max rounded-full transition duration-300 hover:(bg-blue-gray-300 bg-opacity-50) p-5 ml-auto right-2 top-2">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <nuxt-img
          class="pb-6 mx-auto hover:(animate-animated animate-infinite animate-headShake cursor-pointer) select-none"
          width="320"
          height="320"
          :src="$config.imagesURL + image"
          :alt="name"
          format="webp"
        />
      </div>

      <div class="py-2">
        <div class="flex flex-row justify-between items-center text-base sm:text-lg font-medium">
          <h1>{{ name }}</h1>
          <span>{{ price }} ₴</span>
        </div>
      </div>

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
  methods: {
    addFavorite(item) {
      this.$store.commit()
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