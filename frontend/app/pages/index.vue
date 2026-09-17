<script setup lang="ts">
import { usePortfolioStore, type ProjectItem } from '../stores/portfolio';
import { useApi, type HealthResponse } from '../composables/useApi';
import ProjectCard from '../components/ProjectCard.vue';

const store = usePortfolioStore();
const api = useApi();

const health = ref<HealthResponse | null>(null);
const healthLoading = ref(false);
const healthError = ref<string | null>(null);

const projects = ref<ProjectItem[]>([]);
const projectsLoading = ref(false);

// Fallback sample data in case backend isn't running yet
const fallbackProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Nuxt 4 Portfolio Boilerplate',
    slug: 'nuxt-4-portfolio-boilerplate',
    description:
      'A production-grade boilerplate featuring Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS, Pinia, NestJS, and MySQL 8.4 with Prisma.',
    tags: 'Nuxt,Vue,TypeScript,Tailwind,NestJS,Prisma,MySQL',
    demoUrl: 'https://github.com/supunbatagoda/supun-batagoda-portfolio',
    githubUrl: 'https://github.com/supunbatagoda/supun-batagoda-portfolio',
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Realtime Analytics Platform',
    slug: 'realtime-analytics-platform',
    description:
      'Distributed event streaming and real-time visualization platform built with modern TypeScript microservices.',
    tags: 'TypeScript,NestJS,Redis,WebSockets,Tailwind',
    demoUrl: null,
    githubUrl: 'https://github.com/supunbatagoda',
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const checkBackendHealth = async () => {
  healthLoading.value = true;
  healthError.value = null;
  try {
    const data = await api.getHealth();
    health.value = data;
  } catch (err) {
    healthError.value = (err as Error).message || 'Unable to connect to NestJS backend';
    health.value = null;
  } finally {
    healthLoading.value = false;
  }
};

const loadProjects = async () => {
  projectsLoading.value = true;
  try {
    const data = await api.getProjects();
    projects.value = data.length > 0 ? data : fallbackProjects;
  } catch {
    // If backend is not started yet, display fallback sample data
    projects.value = fallbackProjects;
  } finally {
    projectsLoading.value = false;
  }
};

onMounted(() => {
  checkBackendHealth();
  loadProjects();
});

const filteredProjects = computed(() => {
  let list = projects.value;
  if (store.searchQuery.trim()) {
    const q = store.searchQuery.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q),
    );
  }
  return list;
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
    <!-- Hero Section -->
    <section class="text-center space-y-4 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
        <span>✨ Modern Fullstack Architecture</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Nuxt 4 + NestJS + MySQL 8.4
      </h1>

      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300">
        A production-ready fullstack boilerplate configured with Vue 3, Nuxt UI, Tailwind CSS, Pinia, Prisma ORM, Zod validation, ESLint, and Prettier.
      </p>

      <!-- Stack Badges -->
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Nuxt 4
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Vue 3
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          TypeScript
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Nuxt UI
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Tailwind CSS
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Pinia
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          NestJS
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          MySQL 8.4
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Prisma ORM
        </span>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          Zod
        </span>
      </div>
    </section>

    <!-- Fullstack Status & Integration Check -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Backend Status Card -->
      <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>📡 NestJS Backend Health</span>
          </h2>
          <button
            type="button"
            :disabled="healthLoading"
            class="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-50 transition"
            @click="checkBackendHealth"
          >
            {{ healthLoading ? 'Checking...' : 'Refresh Status' }}
          </button>
        </div>

        <div v-if="health" class="space-y-2 text-xs">
          <div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span class="text-gray-500">API Status:</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">● {{ health.status }}</span>
          </div>
          <div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span class="text-gray-500">Database (MySQL 8.4):</span>
            <span
              :class="health.services.database.status === 'connected' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'"
              class="font-semibold uppercase"
            >
              {{ health.services.database.status }}
            </span>
          </div>
          <div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800">
            <span class="text-gray-500">Environment:</span>
            <span class="font-mono text-gray-700 dark:text-gray-300">{{ health.environment }}</span>
          </div>
          <div class="flex items-center justify-between py-1">
            <span class="text-gray-500">Uptime:</span>
            <span class="font-mono text-gray-700 dark:text-gray-300">{{ Math.round(health.uptime) }} seconds</span>
          </div>
        </div>

        <div v-else-if="healthError" class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
          <p class="font-semibold mb-1">Backend Server Offline or Unreachable</p>
          <p class="text-gray-600 dark:text-gray-400">Run <code class="px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono">npm run dev:backend</code> to start NestJS on port 3001.</p>
        </div>

        <div v-else class="text-xs text-gray-500">
          Checking backend connection...
        </div>
      </div>

      <!-- Pinia State Management Card -->
      <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🍍 Pinia State Management</span>
          </h2>
          <span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Reactive Store
          </span>
        </div>

        <div class="space-y-3 text-xs">
          <p class="text-gray-600 dark:text-gray-400">
            State is managed through <code class="font-mono text-emerald-600 dark:text-emerald-400">usePortfolioStore</code>. Click stars on any project below to mutate global state.
          </p>

          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
            <span class="font-medium text-gray-700 dark:text-gray-300">Saved Bookmarks:</span>
            <span class="font-bold text-sm text-emerald-600 dark:text-emerald-400">
              {{ store.bookmarkCount }} {{ store.bookmarkCount === 1 ? 'item' : 'items' }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <input
              v-model="store.searchQuery"
              type="text"
              placeholder="Search projects via Pinia store filter..."
              class="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
            <button
              v-if="store.searchQuery"
              type="button"
              class="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="store.clearFilters"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Projects Portfolio
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Data queried from NestJS + MySQL 8.4 via Prisma ORM
          </p>
        </div>

        <span class="text-xs text-gray-500">
          Showing {{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
        </span>
      </div>

      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          v-for="proj in filteredProjects"
          :key="proj.id"
          :project="proj"
        />
      </div>

      <div
        v-else
        class="text-center py-12 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 text-gray-500 text-sm"
      >
        No projects match your search query "{{ store.searchQuery }}".
        <div class="mt-3">
          <button
            type="button"
            class="text-xs text-emerald-600 dark:text-emerald-400 underline font-semibold"
            @click="store.clearFilters"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

