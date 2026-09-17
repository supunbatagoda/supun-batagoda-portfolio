<script setup lang="ts">
import { usePortfolioStore } from '../stores/portfolio';

const store = usePortfolioStore();
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md"
        >
          SB
        </div>
        <div>
          <span class="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
            Fullstack Boilerplate
          </span>
          <span class="hidden sm:inline-block ml-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
            Nuxt 4 + NestJS
          </span>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Bookmark counter badge from Pinia -->
        <div
          v-if="store.bookmarkCount > 0"
          class="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
        >
          <span>★ {{ store.bookmarkCount }}</span>
          <span class="hidden sm:inline">Saved</span>
        </div>

        <!-- Dark/Light mode toggle -->
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-moon"
          aria-label="Toggle Color Mode"
          @click="toggleColorMode"
        >
          <template #leading>
            <span v-if="colorMode.value === 'dark'">☀️</span>
            <span v-else>🌙</span>
          </template>
        </UButton>

        <UButton
          to="https://github.com/supunbatagoda/supun-batagoda-portfolio"
          target="_blank"
          color="neutral"
          variant="subtle"
          label="GitHub"
        />
      </div>
    </div>
  </header>
</template>

