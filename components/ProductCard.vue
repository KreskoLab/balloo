<template>
  <article>
    <NuxtLink
      class="flex flex-col relative transform duration-300 hover:scale-102"
      :to="`/category/${category}/product/${slug}`"
    >
      <div
        class="absolute right-2 top-2 w-max p-1.5 rounded-full bg-blue-gray-100 bg-opacity-50"
        :class="isFavorite(slug) ? 'text-red-400' : ''"
        @click.prevent="addFavorite(slug)"
      >
        <FavoriteIcon :is-fill="isFavorite(slug)" />
      </div>

      <nuxt-img
        class="hover:(cursor-pointer) rounded"
        width="512"
        height="512"
        :src="$config.imagesURL + image"
        :alt="name"
        format="webp"
      />

      <div class="mt-2 text-center">
        <h1 class="text-base sm:text-lg text-gray-700">{{ name }}</h1>
        <span class="font-medium">{{ price.toFixed(2) }} ₴</span>
      </div>
    </NuxtLink>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    name: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      default: 0,
    },

    slug: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      default: '',
    },
  },

  computed: {
    favorites() {
      return this.$store.state.favorites.list.map((favorite) => favorite.product)
    },
  },

  methods: {
    addFavorite(productSlug) {
      this.$store.commit('favorites/setItem', {
        product: productSlug,
        category: this.category,
      })
    },

    isFavorite(productSlug) {
      return this.favorites.includes(productSlug)
    },
  },
}
</script>
