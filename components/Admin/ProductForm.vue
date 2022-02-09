<template>
    <form @submit.prevent class="form">

        <div class="flex justify-between">
            <h1 class="text-xl font-medium">Новый товар</h1>
            <div class="flex space-x-4">
                <button
                    v-for="item in langs"
                    :key="item" 
                    class="focus:(outline-none)" 
                    :class="lang === item ? 'font-medium border-b-2 border-orange-400' : ''"
                    @click="lang = item" 
                >
                    {{ item.toUpperCase() }}
                </button>
            </div>
        </div>

        <div class="flex flex-row space-x-12 py-6">

            <div class="h-96 w-80">
              <AdminImageUpload
                :imageURL="image"
                @image = "file = $event"
              />
            </div>

            <div class="flex flex-col space-y-12 pt-4 w-full">

                <div class="flex flex-row flex-wrap gap-x-12 gap-y-8">
                    <div 
                        v-for="input in computed_inputs" 
                        :key="input.name"
                        :class="input.size"
                    >
                        <AdminInput 
                            :name="input.name"
                            :label="input.label"
                            :value="input.value"
                            @text="updateInput(input, $event)"
                        />
                    </div>
                </div>

                <div class="flex">
                    <div v-for="select in computed_selects" :key="select.name">
                        <AdminSelect
                            :label="select.label" 
                            :options="select.options"
                            :value="select.value"
                            @selected="updateSelect(select, $event)"
                        />
                    </div>
                </div>

                <div class="flex flex-row flex-wrap gap-x-12 gap-y-8">
                    <div v-for="filter in computed_filters" :key="filter.name">
                        <AdminInput 
                            :name="filter.name"
                            :label="filter.label"
                            :value="filter.value"
                            @text="updateFilter(filter, $event)"
                        />
                    </div>
                </div>

                <button class="btn font-medium w-max !mt-auto" @click="submit()">
                    Добавить
                </button>
            </div>
      </div>
    </form>
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
    },
    image: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lang: 'uk',
      langs: ['uk', 'ru'],
      local_inputs: JSON.parse(JSON.stringify(this.inputs)),
      local_selects: JSON.parse(JSON.stringify(this.selects)),
      local_filters: [],
      file: ''
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
      return JSON.parse(JSON.stringify(this.local_inputs)).map(({ name, size, ...rest }) => {
        return { ...this.findLang(rest), name, size }
      })
    },
    computed_filters() {
      return JSON.parse(JSON.stringify(this.local_filters)).map(({ name, ...rest }) => {
        return { ...this.findLang(rest), name }
      })
    }
  },
  methods: {
    findLang(item) {
      return item.langs.find(item => item.lang === this.lang)
    },
    updateInput(input, text) {
      let local_input = this.local_inputs.find(item => item.name === input.name)

      if (input.name === 'quantity' || input.name === 'code' || input.name === 'price') {
        local_input.langs.forEach(lang => lang.value = text)
      } else {
        local_input.langs.find(item => item.lang === input.lang).value = text
      }
    },
    updateFilter(filter, text) {
      this.local_filters.find(item => item.name === filter.name).langs.find(lang => lang.lang === filter.lang).value = text
    },
    async updateSelect(select, subcategory) {
      let options = this.local_selects[0].langs.find(item => item.lang === select.lang).options
      let index = options.findIndex(item => item.option === subcategory)
      let filter = options.find(item => item.option === subcategory).filter

      this.local_selects[0].langs.forEach(lang => lang.value = lang.options[index].option)
      await this.getFilters(filter)
    },
    async getFilters(id) {
      this.local_filters = []

      await this.$axios.$get(`api/crm/filter/${id}`)
      .then((res) => {
        res.filters.forEach(filter => {
         filter.langs = filter.langs.map(item => ({...item, label: item.value, value: ''}))
         this.local_filters.push(filter)
        })
      })
    },
    submit() {
      let form = {
        name: this.local_inputs[0].langs.map(({label, ...rest}) => rest),
        price: this.local_inputs[1].langs[0].value,
        quantity: this.local_inputs[2].langs[0].value,
        code: this.local_inputs[3].langs[0].value,
        subcategory: this.local_selects[0].langs[0].value,
        properties: this.local_filters.map(filter => filter.langs.map(({label, ...rest}) => ({...rest, name: label}))),
        image: this.file
      }

      this.$emit('done', form)
    }
  }
}
</script>