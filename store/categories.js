export const state = () => ({
    list: []
}) 

export const mutations = {

    setList(state, categories) {
        state.list = categories.map(category => ({...category, name: category.name.langs.find(item => item.lang === 'ua').value}))
        console.log(state.list, categories)
    }
}

export const actions = {

    async getCategories({ commit }) {
        await this.$axios.$get('api/categories')
        .then((res) => {
            commit('setList', res)
        })
        .catch((err) => {

        })
    }
}