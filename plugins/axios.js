export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        config.headers['Accept-Language'] = store.state.language.lang
    })
}