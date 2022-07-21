<template>
  <li
    class="px-2 py-2 border-l-2 border-r-2 border-b-2 border-dark-600 transition duration-150 hover:(bg-teal-500 bg-opacity-10 cursor-pointer)"
    @click="$emit('click')"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'AppDropdownItem',
}
</script>
