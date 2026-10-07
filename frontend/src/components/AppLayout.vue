<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from './AppFooter.vue'
import LanguageNav from './LanguageNav.vue'
import { homePath, localeFromSegment, searchPath } from '../utils/localePaths'
import { siteTitle, uiCopy } from '../utils/uiCopy'

const route = useRoute()
const router = useRouter()

const locale = computed(() => localeFromSegment(route.params.langSegment))
const ui = computed(() => uiCopy(locale.value))
const brandTitle = computed(() => siteTitle(locale.value))

function goSearch() {
  router.push(searchPath(locale.value))
}

function goHome() {
  router.push(homePath(locale.value))
}
</script>

<template>
  <div class="app-layout d-flex flex-column min-vh-100">
    <header class="app-header border-bottom bg-white shadow-sm sticky-top">
      <div class="container py-3 d-flex align-items-center gap-3 flex-wrap">
        <button type="button" class="btn btn-primary search-btn" @click="goSearch">
          <i class="bi bi-search me-1" aria-hidden="true" />
          {{ ui.searchBtn }}
        </button>
        <button type="button" class="site-brand btn btn-link p-0" @click="goHome">
          {{ brandTitle }}
        </button>
        <LanguageNav class="ms-auto" />
      </div>
    </header>

    <main class="container flex-grow-1 py-4">
      <slot />
    </main>

    <AppFooter :locale="locale" />
  </div>
</template>

<style scoped>
.app-layout {
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
}
.search-btn {
  font-weight: 600;
  border-radius: 999px;
  padding-inline: 1.1rem;
}
.site-brand {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
  line-height: 1.3;
}
.site-brand:hover {
  color: #2563eb;
  text-decoration: none;
}
</style>
