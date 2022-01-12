<template>
    <div class="form">

        <div class="flex justify-between">
            <h1 class="text-xl font-medium">Новый товар</h1>
            <div class="flex space-x-4">
                <button
                    v-for="item in langs"
                    :key="item" 
                    @click="lang = item" 
                    class="focus:(outline-none)" 
                    :class="lang == item ? 'font-medium border-b-2 border-orange-400' : ''"
                >
                    {{ item.toUpperCase() }}
                </button>
            </div>
        </div>

        <div class="flex flex-row space-x-12 py-6">

            <AdminImageUpload />

            <div class="flex flex-grow flex-col space-y-12 py-4">

                <div class="grid grid-cols-3 gap-x-6 gap-y-6">
                    <div v-for="input in computed_inputs" :key="input.name">
                        <AdminInput 
                            :name="input.name"
                            :label="input.label"
                            :value="input.value"
                            @text="updateInput(input, $event)"
                        />
                    </div>
                </div>

                <div class="flex space-x-12">
                    <div v-for="select in computed_selects" :key="select.name">
                        <AdminSelect
                            :label="select.label" 
                            :options="select.options"
                            :value="select.value"
                            @selected="updateSelect(select, $event)"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-x-6 gap-y-6">
                    <div v-for="input in local_filters" :key="input.name">
                        <AdminInput 
                            :name="input.name"
                            :label="input.label"
                            :value="input.value"
                            @text="updateInput(input, $event)"
                        />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        inputs: {
            type: Array,
            default: () => []
        },
        selects: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            lang: 'ua',
            langs: ['ua', 'ru'],
            local_inputs: JSON.parse(JSON.stringify(this.inputs)),
            local_selects: JSON.parse(JSON.stringify(this.selects)),
            local_filters: []
        }
    },
    computed: {
        computed_selects() {
            return JSON.parse(JSON.stringify(this.local_selects)).map(select => {
                let res = this.findLang(select)
                res.options = res.options.map(item => item.option)
                return res
            })
        },
        computed_inputs() {
            return JSON.parse(JSON.stringify(this.local_inputs)).map(({ name, ...rest }) => {
                return { ...this.findLang(rest), name }
            })
        }
    },
    methods: {
        findLang(item) {
            return item.langs.find(item => item.lang == this.lang)
        },
        updateInput(input, text) {
            let local_input = this.local_inputs.find(item => item.name == input.name)

            if (input.name == 'quantity' || input.name == 'code') {
                local_input.langs.forEach(lang => lang.value = text)
            } else {
                local_input.langs.find(item => item.lang == input.lang).value = text
            }
        },
        async updateSelect(select, subcategory) {
            let options = this.local_selects[0].langs.find(item => item.lang == select.lang).options
            let index = options.findIndex(item => item.option == subcategory)
            let filter = options.find(item => item.option == subcategory).filter
            
            this.local_selects[0].langs.forEach(lang => lang.value = lang.options[index].option)
            await this.getFilters(filter)
        },
        async getFilters(id) {
            await this.$axios.$get(`api/filter/${id}`)
            .then((res) => {
                this.local_filters = []
                res.filters.forEach(filter => {
                   filter.langs = filter.langs.map(item => ({...item, label: item.value, value: ''}))
                   this.local_filters.push(filter)
                })
            })
        }
    }
}
</script>