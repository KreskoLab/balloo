<template>
  <div class="form">

    <div class="flex justify-between">
      <h1 class="text-xl font-medium">{{ title }}</h1>
      <div class="flex space-x-4">
        <button
          v-for="(item, i) in langs"
          :key="i" 
          @click="lang = item" 
          class="focus:(outline-none)" 
          :class="lang === item ? 'font-medium border-b-2 border-orange-400' : ''"
        >
          {{ item.toUpperCase() }}
        </button>
      </div>
    </div>

    <div class="flex flex-row space-x-12 py-6">

      <div class="h-96 w-1/3" v-if="image_upload">
        <AdminImageUpload
          @image = "file = $event"
        />
      </div>

      <div class="flex flex-col space-y-12 pt-4 w-full">
        <div class="flex flex-row flex-wrap gap-x-12 gap-y-8">
          <div v-for="item in computed_fields" :key="item.name">
            <AdminInput
                :name="item.name"
                :label="item.label"
                :value="item.value"
                :isRemovable="modified"
                @text="updateInput(item, $event)"
                @remove="removeField($event)"
                v-if="item.type === 'input'"
            />

            <AdminSelect
                :label="item.label"
                :options="item.options"
                :value="item.value"
                :multiple="item.multiple"
                @selected="updateSelect(item, $event)"
                v-if="item.type === 'select'"
            />
          </div>
        </div>

        <button class="btn font-medium w-max" :class="image_upload ? '!mt-auto' : 'my-6'" @click="submit()">
          Добавить
        </button>
      </div>

      <button class="btn font-medium w-max h-max" @click="addField()" v-if="modified">
        +
      </button>

    </div>



  </div>
</template>

<script>
export default {
  props: {
    title: String,
    schema: {
      type: Array,
      default: () => []
    },
    modified: {
      type: Boolean,
      default: false
    },
    image_upload: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computed_fields() {
      return JSON.parse(JSON.stringify(this.fields)).map(({ name, type, multiple, ...rest }) => {
        return { ...this.findLang(rest), name, type, multiple }
      })
    }
  },
  methods: {
    namer(str, num) {
      let number = Number(str.slice(-1)) + num
      return str.slice(0, -1) + number
    },
    addField() {    
      let new_field = JSON.parse(JSON.stringify(this.fields[this.fields.length - 1]))
      
      new_field.name = this.namer(new_field.name, 1)
      new_field.id = new_field.name + Date.now()
      new_field.langs.forEach(lang => lang.value = '')

      this.fields.push(new_field)
    },
    findLang(item) {
      return item.langs.find(item => item.lang === this.lang)
    },
    updateInput(input, text) {
      this.fields.find(field => field.name === input.name).langs.find(item => item.lang === input.lang).value = text
    },
    updateSelect(select, subcategory) {
      let field = this.fields.find(field => field.name === select.name)

      if (select.multiple) {
        let indexes = subcategory.map(item => field.langs.find(lang => lang.lang === select.lang).options.findIndex(option => option === item))
        field.langs.forEach(lang => lang.value = [])
        indexes.forEach(index => field.langs.forEach(lang => lang.value.push(lang.options[index])))
      }
      else {
        let index = field.langs.find(item => item.lang === select.lang).options.findIndex(option => option === subcategory)
        field.langs.forEach(lang => lang.value = lang.options[index])
      }
    },
    removeField(name) {
      let index = this.fields.findIndex(i => i.name === name)
      this.fields.splice(index, 1)   
    },
    submit() {
      let { id, name, ...rest } = this.fields[0]

      let form = { 
        title: { name, langs: rest.langs.map(({ label, ...name }) => name) },       
        body: [] 
      }

      for (let i = 1; i < this.fields.length; i++) {
        const element = this.fields[i]
        let filter = {
          name: element.name,
          langs: element.langs.map(({ label, options, ...rest }) => rest),
          image: this.file
        }
        form.body.push(filter)
      }

      this.$emit('done', form)
    }
  },
  data() {
    return {
      lang: 'ua',
      langs: ['ua', 'ru'],
      file: '',
      fields: JSON.parse(JSON.stringify(this.schema))
    }
  }
}
</script>