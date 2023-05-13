import { NuxtConfig } from 'nuxt/schema'
import manifest from '../manifest.json'

export const pwa: NuxtConfig['pwa'] = {
  registerType: 'autoUpdate',
  manifest,
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,json,css,png,jpg,ico}'],
  },
  client: {
    installPrompt: true,
    periodicSyncForUpdates: 3600,
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
}
