<template>
  <div>

    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-lg font-medium">{{ title }}</h1>
      </div>

      <div>
        <button @click="create = !create" class="btn font-medium">
          {{ create ? 'Отменить' : 'Создать' }}
        </button>
      </div>
    </div>

    <div class="my-12">

      <div v-if="create">
        <AdminForm 
          :title="words[0]"
          :schema="fields"
          :modified="isEditable"
          :image_upload="needImage"
          :image="image"
          @done="handleForm($event)"
        />
      </div>

      <div v-else>
        <AdminTable 
          :data="items" 
          :headers="headers" 
          :type="words[1]"
          @remove="remove($event)"
          @edit="editItem($event)"
        />
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
    layout: 'admin',
    async fetch() {
      let page = this.pages.find(page => page.name === this.page_name)

      await this.$axios.$get(`api/${page.url}${page.query}`)
      .then((res) => {
        this.originalItems = res
        this.formatData(res)
      })
    },
    data() {
      return {
        page_name: this.$route.params.dataPage,
        pages: [ 
          { name: 'categories', url: 'crm/categories', query: '' },
          { name: 'subcategories', url: 'subcategories', query: '?populate=filter' },
          { name: 'filters', url: 'crm/filters', query: '' }
        ],
        create: false,
        edit: false,
        edit_id: '',
        isEditable: false,
        needImage: false,
        image: '',
        originalItems: [],
        schemaCopy: [],
        items: [],
        headers: [],
        words: []
      }
    },
    computed: {
      fields() {
        return this.$store.state.fields.schema
      },
      title() {
        return `${this.words[2]} · ${this.items.length}`
      }
    },
    async mounted() {
      this.$store.commit('fields/clear')
      let data = []

      switch (this.page_name) {
        case 'categories':
          this.words = ['Новая категория', 'категорию', 'Категорий', 'category']
          this.headers = ['Название', 'Подкатегории', 'Действия']

          data = await this.getData('subcategories')

          this.$store.commit('fields/setCategories')
          this.$store.commit('fields/setSelectOptions', data)
          break;

        case 'subcategories':
          this.words = ['Новая подкатегория', 'подкатегорию', 'Подкатегорий', 'subcategory']
          this.headers = ['Название', 'Фильтр', 'Действия']
          this.needImage = true

          data = await this.getData('filters')

          this.$store.commit('fields/setSubcategories')
          this.$store.commit('fields/setSelectOptions', data)
          break;

        case 'filters':
          this.words = ['Новый фильтр', 'фильтр', 'Фильтров', 'filter']
          this.headers = ['Название', 'Фильтры', 'Действия']
          this.isEditable = true

          this.$store.commit('fields/setFilters')
          break;
      }
      this.schemaCopy = this.$store.state.fields.schema
    },
    watch: {
      create(val) {
        if (!val) {
          this.$store.commit('fields/updateSchema', this.schemaCopy)
          this.edit = false
          this.edit_id = ''
        }
      }
    },
    methods: {
      async handleForm(form) {
        this.edit === true ? await this.update(form) : await this.add(form)
        this.image = ''
        this.create = false
      },

      async add(form) {
        await this.$axios.$post(`api/${this.words[3]}`, form)
        .then(() => this.$fetch())
      },

      async update(form) {
        await this.$axios.$put(`api/${this.words[3]}/` + this.edit_id, form)
            .then(() => this.$fetch())
      },

      async remove(id) {
        await this.$axios.$delete(`api/${this.words[3]}/` + id)
        .then(() => this.$fetch())
      },

      formatData(data) {
        this.items = data.map(item => {

          if (this.page_name === 'categories') {
            return { 
              _id: item._id,
              name: `${item.name.langs[0].value} / ${item.name.langs[1].value}`,
              subcategories: item.subcategories.map(subcategory => subcategory.name.langs[1].value).join(', ') 
            } 
          }

          if (this.page_name === 'subcategories') {
             return {
              _id: item._id,
              name: `${item.name.langs[0].value} / ${item.name.langs[1].value}`,
              filter: item.filter ? item.filter.name.langs[1].value : 'нету'
            }
          }

          if (this.page_name === 'filters') {
            return {
              _id: item._id,
              name: `${item.name.langs[0].value} / ${item.name.langs[1].value}`,
              filters: item.filters.map(filter => filter.langs[1].value).join(', ')
            }
          }
        })
      },

      async getData(url) {
        return await this.$axios.$get(`api/${url}`)
      },

      editItem(id) {
        let item = this.originalItems.find(item => item._id === id)
        let fields_copy = JSON.parse(JSON.stringify(this.fields))
        fields_copy[0].langs.forEach((lang, index) => fields_copy[0].langs[index] = ({...lang, ...item.name.langs[index]}))

        if (this.page_name === 'filters') {
          item.filters.forEach((filter, index) => {
            let field = JSON.parse(JSON.stringify(fields_copy[1]))
            field = { ...field, name: filter.name }
            field.langs.forEach((lang, idx) => field.langs[idx] = ({...lang, value: filter.langs[idx].value}))
            index > 0 ? fields_copy.push(field) : fields_copy[1] = field
          })
        }

        if (this.page_name === 'subcategories') {
          if (item.filter) {
            item.filter.name.langs.forEach((lang, index) => fields_copy[1].langs[index].value = lang.value)
          }
          this.image = item.image
        }

        if (this.page_name === 'categories') {
          if (item.subcategories) {
            item.subcategories.forEach(subcategory => {
              subcategory.name.langs.forEach((lang, idx) => fields_copy[1].langs[idx].value.push(lang.value))
            })
          }
        }

        this.$store.commit('fields/updateSchema', fields_copy)
        this.create = true
        this.edit = true
        this.edit_id = item._id
      }
    }
}
</script>