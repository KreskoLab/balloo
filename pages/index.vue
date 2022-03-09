<template>
  <div class="page">

    <div class="grid grid-cols-2 gap-x-6 gap-y-4 sm:(grid-cols-4 gap-x-12 gap-y-6)">

      <div v-for="subcategory in subcategories" :key="subcategory.slug">
        <Card
          :name="subcategory.name"
          :slug="subcategory.slug"
          :category="subcategory.category"
          :image="subcategory.image"
        />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.subcategories = this.$store.getters['categories/getSubcategories']
  },
  data() {
    return {
      subcategories: [],
      cards: [
        {
          name: 'Цифры',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/SG-102_1.jpg'
        },
        {
          name: 'Звезды',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/HE-242_1.jpg'
        },
        {
          name: 'Сердечки',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/HE-233_1.jpg'
        },
        {
          name: 'Фигурки',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/MW-119_1.jpg'
        },
        {
          name: 'Обычные',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/MIX-470_1.jpg'
        },
        {
          name: 'С рисунком',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/DA-105_1.jpg'
        }
      ]
    }
  }
}
</script>
