<script setup lang="ts">
import type { ProjectItem } from '../stores/portfolio';
import { usePortfolioStore } from '../stores/portfolio';

const props = defineProps<{
  project: ProjectItem;
}>();

const store = usePortfolioStore();

const isSaved = computed(() => store.isBookmarked(props.project.id));

const tagsList = computed(() =>
  props.project.tags ? props.project.tags.split(',').map((t) => t.trim()) : [],
);
</script>

<template>
  <div
    class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div>
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ project.title }}
          </h3>
          <span
            v-if="project.featured"
            class="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
          >
            Featured
          </span>
        </div>

        <!-- Pinia-driven bookmark button -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          :title="isSaved ? 'Remove Bookmark' : 'Bookmark Project'"
          @click="store.toggleBookmark(project.id)"
        >
          <span v-if="isSaved" class="text-amber-500 font-bold">★</span>
          <span v-else class="text-gray-400">☆</span>
        </button>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-6">
        <span
          v-for="tag in tagsList"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Live Demo &rarr;
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Source Code
        </a>
      </div>

      <span class="text-xs text-gray-400">
        ID #{{ project.id }}
      </span>
    </div>
  </div>
</template>

