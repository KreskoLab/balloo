<template>
    <div class="w-full">

        <h2 class="font-semibold text-xl">каталог</h2>

        <ul
            class="flex flex-col space-y-3 py-3"
        >
            <li
                class="flex justify-between items-center hover:(transition duration-200 text-teal-500 cursor-pointer)"
                v-for="subcategory in subcategories"
                :key="subcategory._id"
            >
                <span class="font-medium">{{subcategory.name}}</span>
                <span class="text-sm text-gray-600">{{subcategory.products}}</span>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
  name: 'subcategories',
  data() {
    return {

    }
  },
  computed: {
    subcategories() {
      return this.$store.getters['categories/getSubcategoriesBySlug'](this.$route.params.id)
    }
  }
}
</script>