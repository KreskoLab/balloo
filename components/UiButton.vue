<template>
  <button
    class="flex items-center justify-center space-x-3 text-lg font-medium w-full"
    :class="[color, size]"
    @click="$emit('click')"
  >
    <slot name="icon" />

    <span class="select-none">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    color: {
      type: String,
      default: 'bg-emerald-200',
    },

    size: {
      type: String,
      default: 'py-2 px-3',
    },
  },
}
</script>

<style scoped>
button {
  @apply appearance-none
  relative
 border-dark-600 border-2
  transform
  hover:(cursor-pointer translate-y-3px)
  after:(content-DEFAULT absolute bottom-0 -right-2px -left-2px border-transparent border-6 transform translate-y-12px);
}

button:after {
  border-top-color: #1c1c1e;
}

button:hover:after {
  @apply translate-y-8px border-4 right-0 left-0;
}
</style>
