<template>
    <div class="table w-full">

        <div class="table-header-group">
            <div class="table-row text-xl">
                <div 
                    v-for="(header, i) in headers" 
                    :key="i" 
                    class="table-cell font-medium"
                >
                    {{header}}
                </div>
            </div>
        </div>

        <div class="table-row-group">
            <div 
                v-for="item in filtered_data" 
                :key="item.name"  
                class="table-row"
            >
                <div 
                    v-for="value in item"  
                    :key="value"
                    class="table-cell py-2"
                >
                    {{ value }}
                </div>

                <div class="table-cell py-2 mx-auto">
                    <svg 
                        class="h-6 w-6 cursor-pointer hover:(stroke-red-500)" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        @click="showModal(); target = item"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </div>

        <div v-if="modal">
            <AdminModal  
                :header="`${type} ${target.name}`"
                @close="closeModal(); target = {}"
                @remove="closeModal(); removeTarget()" 
            />
        </div>

    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        headers: Array,
        type: String
    },
    data() {
        return {
            modal: false,
            target: {}
        }
    },
    computed: {
        filtered_data() {
            return this.data.map(({ _id, ...rest }) => rest)
        }
    },
    methods: {
        showModal() {
            this.modal = true
        },
        closeModal() {
            this.modal = false
        },
        async removeTarget() {
            let item_to_remove = this.data.find(item => item.name == this.target.name)
            this.$emit('remove', item_to_remove._id)
        }
    }
}
</script>