<template>
  <div
      class="fixed top-0 w-full h-full backdrop-filter backdrop-blur-sm z-50 sm:(hidden)"
      v-if="showFiltersSheet"
  >
    <transition
        enter-active-class="animate-animated animate-faster animate-slideInUp"
        leave-active-class="animate-animated animate-faster animate-slideOutDown"
        :duration="{ enter: 500, leave: 100 }"
        @after-leave="hideFiltersSheet()"
        mode="out-in"
        appear
    >
      <div
          class="h-full pt-24"
          v-show="show"
      >
        <div
            class="flex flex-col h-full rounded-t-4xl px-6 py-8 bg-indigo-50"
            v-on-clickaway="unShow"
        >

          <div @click="unShow()" class="flex justify-center w-full pb-6">
            <div class="w-24 rounded-full h-1 bg-gray-400"></div>
          </div>

          <Filters id="mobileFilters" />

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: "FiltersSheet",
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    showFiltersSheet() {
      return this.$store.state.showFiltersSheet
    }
  },
  methods: {
    hideFiltersSheet() {
      this.$store.commit("setFiltersSheet", false)
      this.show = true
    },
    unShow() {
      this.show = false
    }
  },
  watch: {
    $route(to) {
      if (to.name !== "category-id-subcategory") {
        this.hideFiltersSheet()
      }
    }
  }
}
</script>