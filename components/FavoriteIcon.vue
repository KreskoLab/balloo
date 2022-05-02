<template>
  <svg
    class="transition duration-300 hover:(text-red-400 cursor-pointer)"
    :class="size"
    :fill="isFill ? '#F87171' : 'transparent'"
    :stroke="isFill ? '#F87171' : '#1C1C1E'"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
</template>

<script>
export default {
  name: 'FavoriteIcon',
  props: {
    isFill: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: 'w-6 h-6',
    },
  },

  computed: {
    svgColor() {
      return this.isFill ? 'fill-red-400 storke-red-400' : 'fill-transparent stroke-dark-600'
    },
  },
}
</script>
