export const state = () => ({
    list: []
})

export const mutations = {

    setItem(state, id) {
        state.list.push(id)
    }

}