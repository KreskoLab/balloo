<template>
    <div class="flex flex-col animate-slower animate-fadeIn">

        <div class="w-full border-2 relative border-dark-500 bg-blue-gray-50 hover:(bg-orange-100 transition duration-200)">

            <svg class="hover:(stroke-amber-500 cursor-pointer transition duration-150) z-50 absolute top-2 right-0 mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>

            <nuxt-img 
                class="py-8 h-full mx-auto hover:(animate-animated animate-infinite animate-headShake cursor-pointer)" 
                width="320" 
                height="320" 
                :src="`./${image}.png`"
                format="webp"
                alt="test" 
            />

        </div>

        <div class="py-2">
            
            <div class="flex flex-row justify-between items-center text-base sm:text-lg font-medium">

                <h1>шарик синий</h1>
                <span>90 ₴</span>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: {
        image: String
    }
}
</script>