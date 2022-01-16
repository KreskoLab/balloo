<template>
    <aside class="h-max px-2">
        
        <div class="border-b-1 border-gray-500">
            <Subcategories />
        </div>

        <div
            class="py-4"
            v-if="$route.name !== 'category-id'"
        >
            <Filters />
        </div>

    </aside>
</template>