export const state = () => ({
    list: [],
    listCopy: [],
    active: [],
    query: ""
})

export const mutations = {

    setFilters(state, newFilters) {
      state.list = newFilters
    },

    setFiltersCopy(state, copy) {
        state.listCopy = copy
    },

    setActiveFilter(state, filters) {
      state.active = filters
    },

    setAvailableFilters(state, newFilters) {
        let localCopy = JSON.parse(JSON.stringify(state.listCopy))

        state.list = localCopy.map((item) => {
            item.filters = item.filters.filter(element => {
                return newFilters.some(filter => filter.value === element) || state.active.every(active => active.filter === item.slug)
            })
            return item
        })
    },

    setQuery(state, query) {
        state.query = query
    }
}

export const actions = {

    async getFilters({ commit }, id) {
        let filters = await this.$axios.$get(`api/subcategory/${id}/filters`)
        commit("setFilters", filters)
        commit("setFiltersCopy", filters)
    }
}