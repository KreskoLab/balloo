export const state = () => ({
  list: [],
  listCopy: [],
  active: [],
  query: '',
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
    const localCopy = JSON.parse(JSON.stringify(state.listCopy))

    state.list = localCopy.map((item) => {
      item.filters = item.filters.filter((element) => {
        return (
          newFilters.some((filter) => filter.valueSlug === element.value) ||
          state.active.every((active) => item.filters.some((fil) => fil.value === active.value))
        )
      })
      return item
    })
  },

  setQuery(state, query) {
    state.query = query
  },
}

export const actions = {
  async getFilters({ commit }, id) {
    await this.$axios.$get(`api/subcategory/${id}/filters`).then((res) => {
      commit('setFilters', res)
      commit('setFiltersCopy', res)
    })
  },
}
