import { NuxtI18nOptions } from '@nuxtjs/i18n/dist/module'

export const i18n: NuxtI18nOptions = {
  defaultLocale: 'en',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'language',
    redirectOn: 'root',
  },
  strategy: 'prefix',
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
    },
    {
      code: 'de',
      iso: 'de-DE',
      name: 'Deutsch',
    },
  ],
  vueI18n: 'config/i18n.config.ts',
}
