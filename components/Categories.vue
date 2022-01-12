<template>
    <ul class="list-none flex space-x-8 h-full">
        <li 
            v-for="category in categories" 
            :key="category.slug" 
            class="flex items-center h-full font-medium pt-1 cursor-pointer border-b-2 border-transparent hover:( border-dark-500 transition duration-500)"
        >
            <NuxtLink :to="`/category/${category.slug}`">
                {{ category.name_ru }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch('categories/getCategories')   
    },
    computed: {
        categories() {
            return this.$store.state.categories.list
        }
    }
}
</script>