export const state = () => ({
    list: []
}) 

export const mutations = {

    setList(state, val) {
      state.list = val
    }
}

export const actions = {

    async getCategories({ commit }) {
        await this.$axios.$get('api/categories')
        .then((res) => {
            commit('setList', res)
        })
        .catch((err) => {
            console.log('4mo');
        })
    }
}