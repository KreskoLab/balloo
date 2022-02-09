<template>
  <div>

    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-lg font-medium">Товары</h1>
      </div>

      <div>
        <button @click="create = !create" class="btn font-medium">
          {{ create ? 'Отменить' : 'Создать' }}
        </button>
      </div>
    </div>

    <div class="my-12">

      <div v-if="create">
        <AdminProductForm
            :inputs="inputs"
            :selects="selects"
            @done="create = false; add($event)"
        />
      </div>

      <div v-else>
        <AdminTable
          :data="products"
          :headers="headers"
        />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  async fetch() {
    await this.$axios.$get('api/crm/products')
      .then((res) => {
        this.products = res.map(item => ({
          image: item.image,
          name: `${item.name[0].value} / ${item.name[1].value}`,
          code: item.code,
          subcategory: `${item.subcategory.name.langs[0].value} / ${item.subcategory.name.langs[1].value}`,
          price: `${item.price} грн`,
          quantity: `${item.quantity} штук`
        }))
      })
  },
  async created() {
    await this.$axios.$get(`api/subcategories`)
    .then((res) => {
      this.selects[0].langs.forEach(lang => {
        lang.options = res.map(subcategory => ({
          filter: subcategory.filter,
          option: subcategory.name.langs.find(item => item.lang === lang.lang).value
        }))
      })
    })
  },
  data() {
    return {
      create: false,
      products: [],
      headers: ['Изображение', 'Название', 'Код товара', 'Подкатегория', 'Цена', 'Количество', 'Действия'],
      inputs: [
        {
          name: 'title',
          size: 'w-48',
          langs: [ { lang: 'uk', label: 'Назва', value: '' }, { lang: 'ru', label: 'Название', value: '' }]
        },
        {
          name: 'price',
          size: 'w-32',
          langs: [ { lang: 'uk', label: 'Ціна', value: '' }, { lang: 'ru', label: 'Цена', value: '' }]
        },
        {
          name: 'quantity',
          size: 'w-32',
          langs: [ { lang: 'uk', label: 'Кількість', value: '' }, { lang: 'ru', label: 'Количество', value: '' }]
        },
        {
          name: 'code',
          size: 'w-32',
          langs: [ { lang: 'uk', label: 'Код товара', value: '' }, { lang: 'ru', label: 'Код товара', value: '' }]
        }
      ],
      selects: [
        {
          name: 'subcategory',
          langs: [ { lang: 'uk', label: 'Підкатегорія', value: '' }, { lang: 'ru', label: 'Подкатегория', value: '' }]
        }
      ]
    }
  },
  methods: {
    async add(form) {
      await this.$axios.$post('api/product', form)
      .then(() => this.$fetch())
    }
  }
}
</script>