// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Parking Pass Request',
      meta: [
        { name: 'description', content: 'Request a temporary mobile parking pass or file a complaint' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})