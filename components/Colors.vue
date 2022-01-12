<template>
    <div>
        <h3 class="font-medium">цвет:</h3>

        <div class="flex flex-row items-center py-2">

            <input 
                    class="
                    bg-red-400
                    text-red-400
                    outline-none
                    appearance-none 
                    w-6 h-6 
                    border-2 border-dark-500 
                    focus:(ring-transparent ring-0 border-dark-500)
                    "

                type="checkbox" 
                id="scales" 
                name="scales" 
            >
            <label class="cursor-pointer ml-4"><span class="select-none">красный</span></label>

        </div>

        <div class="flex flex-row items-center py-2">
            <input 
                    class="
                    bg-blue-400
                    text-blue-400
                    outline-none
                    appearance-none 
                    w-6 h-6 
                    border-2 border-dark-500 
                    focus:(ring-transparent ring-0 border-dark-500)
                    "

                type="checkbox" 
                id="scales" 
                name="scales" 
            >
            <label class="select-none ml-4">синий</label>
        </div>

    </div>
</template>