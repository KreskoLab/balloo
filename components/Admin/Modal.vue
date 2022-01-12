<template>
    <div class="h-screen w-full fixed top-0 left-0 z-1 bg-gray-600 bg-opacity-80">

        <div class="flex flex-col justify-center items-center h-full">
            
            <div class="h-max px-6 py-6 bg-light-100 rounded-md shadow-md">
                
                <div class="flex flex-col space-y-4">

                    <div class="flex items-center space-x-4">
                        <svg class="h-10 w-10 stroke-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>

                        <h3 class="text-xl font-medium">Удалить {{ header }}</h3>
                    </div>

                    <footer class="flex items-center justify-end space-x-4">
                        <button @click="close()" class="px-4 py-1.5 rounded-md border border-gray-600 hover:(shadow)">
                            Отменить
                        </button>

                        <button @click="remove()" class="px-4 py-1.5 rounded-md border border-red-500 text-light-50 bg-red-500 bg-opacity-90 focus:(ring-2 ring-offset-2 ring-red-500 ring-opacity-70 outline-none) hover:(bg-red-500 bg-opacity-80 transition duration-150)">
                            Удалить
                        </button>
                    </footer>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: String
    },
    methods: {
        close() {
            this.$emit('close')
        },
        remove() {
            this.$emit('remove')
        }
    }
}
</script>