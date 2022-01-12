<template>
    <div>
        
        <div class="flex flex-row justify-between">
            <h2 class="text-2xl font-medium">{{$route.params.id}}</h2>

            <div class="">
                sadsad
            </div>
        </div>
        

    </div>
</template>

<script>
export default {
    async fetch() {
        await this.$axios.$get(`api/category/${this.$route.params.id}`)
        .then((res) => {
            this.category = res
        })
    },
    data() {
        return {
            category: {}
        }
    }
}
</script>