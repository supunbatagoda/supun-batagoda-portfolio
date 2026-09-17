import './polyfill.cjs';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],

  // Enable Nuxt 4 directory structure and behaviors
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-01',

  telemetry: false,

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
    },
  },

  nitro: {
    // Direct public output to 'dist' for compatibility with VPS static deployment workflow
    output: {
      publicDir: 'dist',
    },
  },
});
