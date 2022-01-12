<template>
  <div>

    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-lg font-medium"> {{ title }}</h1>
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
          @done="create = false; add($event)" 
        />
      </div>

      <div v-else>
        <AdminTable 
          :data="items" 
          :headers="headers" 
          :type="words[1]"
          @remove="remove($event)" 
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

      await this.$axios.$get(`api/${page.name}` + page.query)
      .then((res) => this.formatData(res))
    },
    data() {
      return {
        page_name: this.$route.params.dataPage,
        pages: [ 
          { name: 'categories', query: '?populate=subcategories&populate=name' },
          { name: 'subcategories', query: '?populate=filter&populate=name' },
          { name: 'filters', query: '' }
        ],
        create: false,
        isEditable: false,
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
    },
    methods: {
      async add(form) {
        await this.$axios.$post(`api/${this.words[3]}`, form)
        .then(() => this.$fetch())
      },

      async remove(id) {
        await this.$axios.$delete(`api/${this.words[3]}/` + id)
        .then(() => this.$fetch())
      },

      formatData(data) {
        console.log(data);
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
              filter: item.filter.name.langs[1].value  
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
      }
    }
}
</script>