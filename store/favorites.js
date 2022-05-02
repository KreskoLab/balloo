export const state = () => ({
  list: [],
})

export const mutations = {
  setItem(state, payload) {
    if (state.list.some((item) => item.product === payload.product)) {
      const index = state.list.findIndex((item) => item.product === payload.product)
      state.list.splice(index, 1)
    } else {
      state.list.push(payload)
    }
  },
}
