// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', "@nuxtjs/tailwindcss"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8000/query'
      }
    },
  },
})