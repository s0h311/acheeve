import { pwa } from './config/pwa'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Acheeve | Habits & More',
      link: [
        {rel: 'icon', type:'image/svg+xml', href:'/a.svg'},
        {rel: 'apple-touch-icon', href:'/a-logo.svg'},
      ],
      htmlAttrs: {
        lang: 'en' //should be auto detected
      } 
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt'
  ],
  pwa,
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    dir: 'assets/static'
  },
  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'de',
        name: 'Deutsch'
      }
    ],
    vueI18n: './config/i18n.js'
  }
})
