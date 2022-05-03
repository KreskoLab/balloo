<template>
  <div
    v-if="showFiltersSheet"
    class="fixed top-20 w-full h-[calc(100%-5rem)] z-50 bg-indigo-50 lg:(hidden)"
  >
    <transition
      enter-active-class="animate-animated animate-faster animate-slideInUp"
      leave-active-class="animate-animated animate-faster animate-slideOutDown"
      :duration="{ enter: 500, leave: 100 }"
      mode="out-in"
      appear
      @after-leave="hideFiltersSheet()"
    >
      <div
        v-show="show"
        class="h-full pt-4"
      >
        <div class="flex h-full px-6">
          <div class="flex flex-col space-y-3 mt-2">
            <SideBarSubcategoriesList />
            <SideBarFiltersList />
          </div>

          <div
            class="ml-auto w-8 mt-4"
            @click="unShow()"
          >
            <UiButton
              color="bg-transparent"
              size="py-0.5 px-2"
            >
              X
            </UiButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SideBarBottomSheet',
  data() {
    return {
      show: true,
    }
  },

  computed: {
    showFiltersSheet() {
      return this.$store.state.showFiltersSheet
    },
  },

  watch: {
    $route(to) {
      if (to.name !== 'category-id-subcategory') {
        this.hideFiltersSheet()
      }
    },
  },

  methods: {
    hideFiltersSheet() {
      this.$store.commit('setFiltersSheet', false)
      this.show = true
    },

    unShow() {
      this.show = false
    },
  },
}
</script>
