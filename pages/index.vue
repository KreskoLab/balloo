<template>
  <div class="w-full">

    <div class="grid grid-cols-2 gap-x-3 gap-y-6 sm:(grid-cols-4 gap-x-12 gap-y-6)">

      <div v-for="card in cards" :key="card.name">
        <Card
          :name="card.name"
          :image="card.image"
        />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          name: 'Фольгированые шарики',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/MIX-233_1.jpg'
        },
        {
          name: 'Латексные шарики',
          image: 'https://www.gingerray.co.uk/static/media/catalog/product/a/s/MIX-470_1.jpg'
        }
      ]
    }
  }
}
</script>
