<template>
    <div class="flex flex-col w-full h-full">

      <div>
        <p class="font-semibold text-xl">фильтры</p>
      </div>

      <div
          class="basis-1/5 mt-3"
          v-for="item in filtersList"
          :key="item.name"
      >
        <h3 class="font-medium pb-1">{{item.name}}</h3>

        <transition-group
            class="list-none"
            name="slide-fade"
            tag="ul"
        >
          <li
              class="flex items-center py-1"
              v-for="filter in item.filters"
              :key="filter.value"
          >
            <input
                class="text-dark-500 outline-none appearance-none w-6 h-6 border-2 border-dark-500 rounded-sm cursor-pointer focus:(ring-transparent ring-0 border-dark-500)"
                type="checkbox"
                :id="filter.value + id"
                :value="{value: filter.value, filter: filter.slug}"
                v-model="activeFilters"
            >
            <label
                class="cursor-pointer select-none ml-2"
                :for="filter.value + id"
            >
              {{filter.name}}
            </label>
          </li>
        </transition-group>

      </div>

    </div>
</template>

<script>
export default {
  name: 'filters',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
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

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>