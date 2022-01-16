export const state = () => ({
    list: []
}) 

export const mutations = {

    setList(state, categories) {
        state.list = categories.map(category => ({
            ...category,
            name: category.name.langs.find(item => item.lang === 'ua').value,
            subcategories: category.subcategories.map(({_id, products, name}) => ({
                _id,
                products: products.length,
                name: name.langs.find(item => item.lang === 'ua').value
            }))
        }))
    }
}

export const actions = {

    async getCategories({ commit }) {
        await this.$axios.$get('api/categories?populate=subcategories')
        .then((res) => {
            commit('setList', res)
        })
        .catch((err) => {

        })
    }
}

export const getters = {

    getSubcategoriesBySlug: (state) => slug => {
        if (state.list.length > 0) {
            return state.list.find(category => category.slug === slug).subcategories
        } else {
            return []
        }
    },

    getCategoryBySlug: (state) => slug => {
        if (state.list.length > 0) {
            return state.list.find(category => category.slug === slug)
        } else {
            return {}
        }
    }
}