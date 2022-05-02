export const state = () => ({
  user: {},
  loggedIn: false,
})

export const mutations = {
  setUser(state, val) {
    state.user = val
  },

  setLoggedIn(state, val) {
    state.loggedIn = val
  },
}

export const actions = {
  async getUser({ commit }) {
    await this.$axios
      .$get('api/me')
      .then((res) => {
        commit('setUser', res)
        commit('setLoggedIn', true)
      })
      .catch((err) => {
        console.log(err)
        commit('setLoggedIn', false)
        commit('setUser', {})
      })
  },

  async logout({ commit }) {
    await this.$axios.$get('api/logout').then(() => {
      commit('setLoggedIn', false)
      commit('setUser', {})
    })
  },
}
