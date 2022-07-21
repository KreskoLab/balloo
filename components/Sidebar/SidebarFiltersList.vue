<template>
  <div class="flex flex-col w-full h-full">
    <p class="font-semibold text-xl">{{ $t('filters') }}</p>

    <div
      v-for="item in filtersList"
      :key="item.name"
      class="mt-3"
    >
      <h3 class="font-medium pb-1">{{ item.name }}</h3>

      <transition-group
        class="list-none"
        name="slide-fade"
        tag="ul"
      >
        <li
          v-for="filter in item.filters"
          :key="filter.value"
          class="flex items-center py-1"
        >
          <input
            :id="filter.value"
            v-model="activeFilters"
            class="text-dark-500 outline-none appearance-none w-6 h-6 border-2 border-dark-500 rounded-sm cursor-pointer focus:(ring-transparent ring-0 border-dark-500)"
            type="checkbox"
            :value="{ value: filter.value, filter: filter.slug }"
          />

          <label
            class="cursor-pointer select-none ml-2"
            :for="filter.value"
          >
            {{ filter.name }}
          </label>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarFiltersList',
  computed: {
    subcategoryId() {
      return this.$store.getters['categories/getSubcategoryBySlug'](this.$route.params.subcategory)._id
    },

    filtersList() {
      return this.$store.state.filters.list
    },

    activeFilters: {
      get() {
        return this.$store.state.filters.active
      },

      set(val) {
        this.$store.commit('filters/setActiveFilter', val)
      },
    },
  },

  watch: {
    subcategoryID() {
      this.activeFilters = []
      this.$store.dispatch('filters/getFilters', this.subcategoryID)
    },

    activeFilters(val) {
      const url = this.$router.currentRoute.path
      let query = ''

      if (this.activeFilters.length > 0) {
        this.activeFilters.forEach((item) => (query += `${item.filter}=${item.value}&`))
        this.$store.commit('filters/setQuery', query)
        this.$router.push(url + `?${query}`)
      } else {
        this.$store.commit('filters/setQuery', '')
        this.$router.push(url)
      }
    },
  },

  created() {
    this.$store.dispatch('filters/getFilters', this.subcategoryId)
  },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
