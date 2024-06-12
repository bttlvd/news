import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  site: { indexable: false },
  runtimeConfig: {
    API_NEWS_KEY: 'eb9a9cf43f6443748bce6089617e1869',
  },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  routeRules: {
    '/login': { ssr: false },
    '/news': { ssr: false },
    '/news/**': { swr: true },
    '/': { redirect: '/news' },
  },
  css: ['~/assets/scss/index.scss'],
})
