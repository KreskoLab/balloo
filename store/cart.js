export const state = () => ({
  list: [],
  show: false,
})

export const mutations = {
  addToCart(state, productSlug) {
    const product = state.list.find((item) => item.slug === productSlug)

    if (product) {
      product.amount++
    } else {
      state.list.push({ slug: productSlug })
    }
  },

  removeFromCart(state, productSlug) {
    const index = state.list.indexOf((item) => item.slug === productSlug)
    state.list.splice(index, 1)
  },

  showCart(state) {
    state.show = !state.show
  },
}
