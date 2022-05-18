export const state = () => ({
  showHamburgerMenu: false,
  showFiltersSheet: false,
})

export const mutations = {
  setHamburgerMenu(state) {
    state.showHamburgerMenu = !state.showHamburgerMenu
  },

  setFiltersSheet(state, val) {
    state.showFiltersSheet = val
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('categories/getCategories')
  },
}
