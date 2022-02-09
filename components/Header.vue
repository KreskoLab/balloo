<template>
    <div class="w-full flex flex-row items-center space-x-24 px-6 py-2 bg-blue-gray-100 text-gray-700 text-sm">
        
        <div class="flex items-center space-x-2">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h2 class="font-medium tracking-widest">+380937930504</h2>
        </div>

        <h2 class="font-medium tracking-widest">пн-вс: с 9:00 до 19:00</h2>

        <h2 class="font-medium tracking-widest cursor-pointer">Доставка и Оплата</h2>

        <div class="!ml-auto">
            <div class="tracking-widest cursor-pointer select-none">
              <span @click="changeLang('uk')" :class="lang === 'uk' ? active: ''">укр</span>
              <span>|</span>
              <span @click="changeLang('ru')" :class="lang === 'ru' ? active: ''">рус</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  computed: {
    lang() {
      return this.$store.state.language.lang
    },
    active() {
      return 'font-medium'
    }
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('language/setLanguage', lang)
    }
  }
}
</script>
