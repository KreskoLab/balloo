export const state = () => ({
    lang: 'uk',
    languages: ['uk', 'ru']
})

export const mutations = {

    setLanguage(state, payload) {
        state.lang = payload
    }
}