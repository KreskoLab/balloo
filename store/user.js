export const state = () => ({
  user: {},
  loggedIn: false
})

export const mutations = {

  setUser(state, val) {
    state.user = val
  },

  setLoggedIn(state, val) {
    state.loggedIn = val
  }
}

export const actions = {

  async getUser({ commit }) {

    await this.$axios.$get('api/me')
    .then((res) => {
      commit('setUser', res.user)
      commit('setLoggedIn', true)
    })
    .catch((err) => {
      commit('setUser', {})
      commit('setLoggedIn', false)
    })
  },

  async logout({ commit }) {

    await this.$axios.$get('api/logout')
    .then(() => {
      commit('setLoggedIn', false)
      commit('setUser', {})
    })
  }
}
