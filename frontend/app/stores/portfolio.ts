import { defineStore } from 'pinia';

export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    bookmarkedIds: [] as number[],
    searchQuery: '',
    selectedTag: null as string | null,
  }),

  getters: {
    bookmarkCount: (state) => state.bookmarkedIds.length,
    hasBookmarks: (state) => state.bookmarkedIds.length > 0,
    isBookmarked: (state) => (id: number) => state.bookmarkedIds.includes(id),
  },

  actions: {
    toggleBookmark(id: number) {
      const index = this.bookmarkedIds.indexOf(id);
      if (index >= 0) {
        this.bookmarkedIds.splice(index, 1);
      } else {
        this.bookmarkedIds.push(id);
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setSelectedTag(tag: string | null) {
      this.selectedTag = tag;
    },

    clearFilters() {
      this.searchQuery = '';
      this.selectedTag = null;
    },
  },
});
