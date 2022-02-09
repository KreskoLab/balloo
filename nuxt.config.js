export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'balloo',
    htmlAttrs: {
      lang: 'uk'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.js' },
    { src: '~/plugins/axios.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-windicss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxt/image'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    "/api": {
      target: "http://localhost:8000", // of course, you can use process.env here!
      pathRewrite: {"^/api": "/"},
      changeOrigin: true
    },
  },

  publicRuntimeConfig: {
    imagesURL: 'http://localhost:8000/images/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
