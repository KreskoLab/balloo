<template>
    <div class="w-full h-screen bg-light-100 overflow-auto">

        <div class="hidden sm:block">
            <Navbar />
        </div>

        <div>
            <Header />
        </div>

        <div class="h-full flex flex-row sm:(space-x-12 pt-12 px-2)">

            <div class="hidden sm:(block w-full w-1/4) pl-4">
                <Sidebar />
            </div>

            <div class="flex flex-col w-full">

                <div class="my-2 px-4">
                    <Nuxt />
                </div>

            </div>

        </div>

    </div>
</template>