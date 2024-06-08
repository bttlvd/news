import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['~/assets/scss/index.scss'],
})
