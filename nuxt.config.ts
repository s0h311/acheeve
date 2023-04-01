// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Acheeve | Habits & More',
      link: [{rel: 'icon', type:'image/x-icon', href:'/favicon.ico'}]
    }
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
  ],
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    dir: 'assets/static'
  }
})
