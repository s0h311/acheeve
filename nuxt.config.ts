import i18n from './config/i18n'
import { pwa } from './config/pwa'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Acheeve | Habits & More',
      link: [
        {rel: 'icon', type:'image/x-icon', href:'/favicon.ico'},
        {rel: 'apple-touch-icon', href:'/logo.png'},
      ],
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
      redirectOn: 'root',  // recommended
    },
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
    vueI18n: i18n
  }
})
