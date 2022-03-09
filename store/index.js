export const state = () => ({
  showHamburgerMenu: false
})

export const mutations = {

  setHamburgerMenu(state) {
    state.showHamburgerMenu = !state.showHamburgerMenu
  }

}

export const actions = {

  async nuxtServerInit({ dispatch }) {
    await dispatch('user/getUser')
    await dispatch('categories/getCategories')
  }
}
