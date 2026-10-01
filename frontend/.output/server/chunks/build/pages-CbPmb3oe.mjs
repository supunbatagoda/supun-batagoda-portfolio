globalThis.__timing__.logStart('Load chunks/build/pages-CbPmb3oe');import { u as usePortfolioStore, a as useRuntimeConfig, $ as $fetch$2 } from '../virtual/entry.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import '@vue/shared';
import 'pinia';
import 'fnv1a-64';
import 'object-identity';
import '@iconify/vue';
import 'tailwindcss/colors';
import '@vueuse/core';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'unhead/utils';

//#region app/composables/useApi.ts
function useApi() {
	const apiBase = useRuntimeConfig().public.apiBase || "http://localhost:3001";
	const getHealth = async () => {
		return $fetch$2(`${apiBase}/api/health`);
	};
	const getProjects = async (featuredOnly = false) => {
		const url = featuredOnly ? `${apiBase}/api/projects?featured=true` : `${apiBase}/api/projects`;
		return $fetch$2(url);
	};
	const getProject = async (id) => {
		return $fetch$2(`${apiBase}/api/projects/${id}`);
	};
	return {
		apiBase,
		getHealth,
		getProjects,
		getProject
	};
}
//#endregion
//#region app/components/ProjectCard.vue?vue&type=script&setup=true&lang.ts
var ProjectCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProjectCard",
	__ssrInlineRender: true,
	props: { project: {} },
	setup(__props) {
		const props = __props;
		const store = usePortfolioStore();
		const isSaved = computed(() => store.isBookmarked(props.project.id));
		const tagsList = computed(() => props.project.tags ? props.project.tags.split(",").map((t) => t.trim()) : []);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200" }, _attrs))}><div><div class="flex items-start justify-between gap-2 mb-3"><div class="flex items-center gap-2 flex-wrap"><h3 class="text-lg font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.project.title)}</h3>`);
			if (__props.project.featured) _push(`<span class="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"> Featured </span>`);
			else _push(`<!---->`);
			_push(`</div><button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"${ssrRenderAttr("title", unref(isSaved) ? "Remove Bookmark" : "Bookmark Project")}>`);
			if (unref(isSaved)) _push(`<span class="text-amber-500 font-bold">★</span>`);
			else _push(`<span class="text-gray-400">☆</span>`);
			_push(`</button></div><p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">${ssrInterpolate(__props.project.description)}</p><div class="flex flex-wrap gap-1.5 mb-6"><!--[-->`);
			ssrRenderList(unref(tagsList), (tag) => {
				_push(`<span class="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">${ssrInterpolate(tag)}</span>`);
			});
			_push(`<!--]--></div></div><div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3"><div class="flex items-center gap-2">`);
			if (__props.project.demoUrl) _push(`<a${ssrRenderAttr("href", __props.project.demoUrl)} target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"> Live Demo → </a>`);
			else _push(`<!---->`);
			if (__props.project.githubUrl) _push(`<a${ssrRenderAttr("href", __props.project.githubUrl)} target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"> Source Code </a>`);
			else _push(`<!---->`);
			_push(`</div><span class="text-xs text-gray-400"> ID #${ssrInterpolate(__props.project.id)}</span></div></div>`);
		};
	}
});
//#endregion
//#region app/components/ProjectCard.vue
var _sfc_setup$1 = ProjectCard_vue_vue_type_script_setup_true_lang_default.setup;
ProjectCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ProjectCard_default = Object.assign(ProjectCard_vue_vue_type_script_setup_true_lang_default, { __name: "ProjectCard" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const store = usePortfolioStore();
		useApi();
		const health = ref(null);
		const healthLoading = ref(false);
		const healthError = ref(null);
		const projects = ref([]);
		ref(false);
		(/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString();
		const filteredProjects = computed(() => {
			let list = projects.value;
			if (store.searchQuery.trim()) {
				const q = store.searchQuery.toLowerCase();
				list = list.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.toLowerCase().includes(q));
			}
			return list;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" }, _attrs))}><section class="text-center space-y-4 max-w-3xl mx-auto"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"><span>✨ Modern Fullstack Architecture</span></div><h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"> Nuxt 4 + NestJS + MySQL 8.4 </h1><p class="text-base sm:text-lg text-gray-600 dark:text-gray-300"> A production-ready fullstack boilerplate configured with Vue 3, Nuxt UI, Tailwind CSS, Pinia, Prisma ORM, Zod validation, ESLint, and Prettier. </p><div class="flex flex-wrap justify-center gap-2 pt-2"><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Nuxt 4 </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Vue 3 </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> TypeScript </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Nuxt UI </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Tailwind CSS </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Pinia </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> NestJS </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> MySQL 8.4 </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Prisma ORM </span><span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"> Zod </span></div></section><section class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><span>📡 NestJS Backend Health</span></h2><button type="button"${ssrIncludeBooleanAttr(unref(healthLoading)) ? " disabled" : ""} class="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium disabled:opacity-50 transition">${ssrInterpolate(unref(healthLoading) ? "Checking..." : "Refresh Status")}</button></div>`);
			if (unref(health)) _push(`<div class="space-y-2 text-xs"><div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span class="text-gray-500">API Status:</span><span class="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">● ${ssrInterpolate(unref(health).status)}</span></div><div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span class="text-gray-500">Database (MySQL 8.4):</span><span class="${ssrRenderClass([unref(health).services.database.status === "connected" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500", "font-semibold uppercase"])}">${ssrInterpolate(unref(health).services.database.status)}</span></div><div class="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span class="text-gray-500">Environment:</span><span class="font-mono text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(health).environment)}</span></div><div class="flex items-center justify-between py-1"><span class="text-gray-500">Uptime:</span><span class="font-mono text-gray-700 dark:text-gray-300">${ssrInterpolate(Math.round(unref(health).uptime))} seconds</span></div></div>`);
			else if (unref(healthError)) _push(`<div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300"><p class="font-semibold mb-1">Backend Server Offline or Unreachable</p><p class="text-gray-600 dark:text-gray-400">Run <code class="px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono">npm run dev:backend</code> to start NestJS on port 3001.</p></div>`);
			else _push(`<div class="text-xs text-gray-500"> Checking backend connection... </div>`);
			_push(`</div><div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><span>🍍 Pinia State Management</span></h2><span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"> Reactive Store </span></div><div class="space-y-3 text-xs"><p class="text-gray-600 dark:text-gray-400"> State is managed through <code class="font-mono text-emerald-600 dark:text-emerald-400">usePortfolioStore</code>. Click stars on any project below to mutate global state. </p><div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"><span class="font-medium text-gray-700 dark:text-gray-300">Saved Bookmarks:</span><span class="font-bold text-sm text-emerald-600 dark:text-emerald-400">${ssrInterpolate(unref(store).bookmarkCount)} ${ssrInterpolate(unref(store).bookmarkCount === 1 ? "item" : "items")}</span></div><div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(store).searchQuery)} type="text" placeholder="Search projects via Pinia store filter..." class="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">`);
			if (unref(store).searchQuery) _push(`<button type="button" class="px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"> Clear </button>`);
			else _push(`<!---->`);
			_push(`</div></div></div></section><section class="space-y-6"><div class="flex items-center justify-between flex-wrap gap-4"><div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"> Projects Portfolio </h2><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"> Data queried from NestJS + MySQL 8.4 via Prisma ORM </p></div><span class="text-xs text-gray-500"> Showing ${ssrInterpolate(unref(filteredProjects).length)} ${ssrInterpolate(unref(filteredProjects).length === 1 ? "project" : "projects")}</span></div>`);
			if (unref(filteredProjects).length > 0) {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
				ssrRenderList(unref(filteredProjects), (proj) => {
					_push(ssrRenderComponent(ProjectCard_default, {
						key: proj.id,
						project: proj
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center py-12 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 text-gray-500 text-sm"> No projects match your search query &quot;${ssrInterpolate(unref(store).searchQuery)}&quot;. <div class="mt-3"><button type="button" class="text-xs text-emerald-600 dark:text-emerald-400 underline font-semibold"> Reset Filters </button></div></div>`);
			_push(`</section></div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };;globalThis.__timing__.logEnd('Load chunks/build/pages-CbPmb3oe');
//# sourceMappingURL=pages-CbPmb3oe.mjs.map
