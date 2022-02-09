<template>
    <div class="relative w-full h-full">
        <div class="w-full h-full border-2 border-dashed border-gray-600 hover:(border-orange-400)" v-if="image.length === 0">
            <input
                id="dropzone"
                type="file"
                class="absolute z-50 w-full h-full cursor-pointer opacity-0"
                @change="handleImage($event.target.files[0])"
            >

            <label class="absolute flex flex-col justify-center w-full h-full" for="dropzone">
              <svg class="h-12 w-12 mx-auto stroke-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-center font-medium">Загрузить изображение</span>
            </label>
        </div>

        <div class="relative w-full h-full p-2 border-2 border-dark-600" v-else>
            <img class="w-full h-full" :src="image" alt="image preview">

            <button class="absolute -top-2 -right-2" @click="remove()">
              <svg class="bg-light-50 rounded-full shadow p-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>

    </div>
</template>

<script>
export default {
    props: {
      imageURL: {
        type: String
      }
    },
    data() {
        return {
            image: ''
        }
    },
    watch: {
      imageURL: {
        immediate: true,
        handler(val) {
          if (val.length) {
            this.$axios.$get(this.$config.imagesURL + val, { responseType: 'blob'})
            .then((res) => {
              this.handleImage(res)
            })
          }
        }
      }
    },
    methods: {
        handleImage(image) {
            let file = image
            let reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onloadend = () => {
                this.image = reader.result
                this.$emit('image', this.image)
            }
        },
        remove() {
            this.image = ''
        }
    }
}
</script>