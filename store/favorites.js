export const state = () => ({
    list: []
})

export const mutations = {

    setItem(state, id) {
        if (state.list.includes(id)) {
            let index = state.list.indexOf(id)
            state.list.splice(index, 1)
        } else {
            state.list.push(id)
        }
    }

}