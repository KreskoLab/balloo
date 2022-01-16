export const actions = {

  async nuxtServerInit({ dispatch }) {
    await dispatch('user/getUser')
    await dispatch('categories/getCategories')
  }
}
