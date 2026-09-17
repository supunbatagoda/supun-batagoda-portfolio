<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';

// Page head metadata
useHead({
  title: 'Fullstack Boilerplate | Nuxt 4 + NestJS + MySQL 8.4',
  meta: [
    {
      name: 'description',
      content:
        'A fullstack boilerplate built with Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS, Pinia, NestJS, MySQL 8.4, and Prisma.',
    },
  ],
});
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <AppHeader />

      <main class="flex-1">
        <NuxtPage />
      </main>

      <footer class="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <div class="max-w-7xl mx-auto px-4">
          <p>Fullstack Boilerplate &bull; Nuxt 4, Vue 3, Tailwind CSS, Nuxt UI, Pinia & NestJS, MySQL 8.4, Prisma, Zod</p>
        </div>
      </footer>
    </div>
  </UApp>
</template>

