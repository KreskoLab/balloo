<template>
    <div class="w-full">
        
        <h2 class="font-semibold text-xl">фильтры</h2>

        <div>
            <div
                class="py-3"
                v-for="item in filtersList"
                :key="item.name"
            >
              <h3 class="font-medium pb-1">{{item.name}}</h3>

              <div
                  class="flex items-center py-1"
                  v-for="filter in item.filters"
                  :key="filter.value"
              >
                <input
                    class="text-dark-500 outline-none appearance-none w-6 h-6 border-2 border-dark-500 rounded-sm cursor-pointer focus:(ring-transparent ring-0 border-dark-500)"
                    type="checkbox"
                    :id="filter"
                    :value="{value: filter.value, filter: filter.slug}"
                    v-model="activeFilters"
                >
                <label class="select-none cursor-pointer ml-2" :for="filter">{{filter.name}}</label>
              </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'filters',
  data() {
    return {
      activeFilters: []
    }
  },
  created() {
    this.$store.dispatch("filters/getFilters", this.subcategoryID)
  },
  computed: {
    subcategoryID() {
      return this.$store.getters['categories/getSubcategoryBySlug'](this.$route.params.subcategory)._id
    },
    filtersList() {
      return this.$store.state.filters.list
    }
  },
  watch: {
    subcategoryID() {
      this.activeFilters = []
      this.$store.dispatch("filters/getFilters", this.subcategoryID)
    },
    activeFilters(val) {
      this.$store.commit("filters/setActiveFilter", val)

      let url = this.$router.currentRoute.path
      let query = ""

      if (this.activeFilters.length > 0) {
        this.activeFilters.forEach(item => query += `${item.filter}=${item.value}&`)
        this.$store.commit('filters/setQuery', query)
        this.$router.push(url + `?${query}`)
      }

      else {
        this.$store.commit('filters/setQuery', "")
        this.$router.push(url)
      }
    }
  }
}
</script>