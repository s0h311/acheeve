import { i18n } from './config/i18n'
import { pwa } from './config/pwa'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Acheeve | Habits & More',
      link: [
        {rel: 'icon', type:'image/svg+xml', href:'/a.svg'},
        {rel: 'apple-touch-icon', href:'/a-logo.svg'},
      ],
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'}
      ],
      htmlAttrs: {
        lang: 'en' //should be auto detected //TODO maybe with i18nHead = useLocaleHead
      } 
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    '@nuxtjs/i18n-edge',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
  ],
  //pwa,
  i18n,
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
})
