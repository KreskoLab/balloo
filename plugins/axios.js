export default function ({ $axios, i18n }) {
  $axios.onRequest((config) => {
    config.headers['Accept-Language'] = i18n.locale
  })
}
