export const state = () => ({
    list: [],
    show: false
})

export const mutations = {

    addToCart(state, item) {
        const product = state.list.find(({_id}) => _id === item._id)

        if (product) {
            product.amount++
        }

        else {
            state.list.push(({ ...item, amount: 1 }))
        }
    },

    incAmount(state, id) {
        const product = state.list.find(({_id}) => _id === id)
        product.amount++
    },

    decAmount(state, id) {
        const product = state.list.find(({_id}) => _id === id)
        product.amount--
    },

    removeFromCart(state, id) {
      const index = state.list.indexOf(item => item._id === id)
      state.list.splice(index, 1)
    },

    showCart(state) {
        state.show = !state.show
    }
}

export const getters = {

    summary(state) {
        return state.list.reduce((total, cv) => total + Number(cv.price) * Number(cv.amount), 0)
    }
}