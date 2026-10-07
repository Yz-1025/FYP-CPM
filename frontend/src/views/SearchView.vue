<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProducts } from '../api/cpm'
import MedicineSummaryCard from '../components/MedicineSummaryCard.vue'
import { localeFromSegment, productPath } from '../utils/localePaths'
import { uiCopy } from '../utils/uiCopy'

const route = useRoute()
const router = useRouter()

const locale = computed(() => localeFromSegment(route.params.langSegment))
const ui = computed(() => uiCopy(locale.value))

const query = ref('')
const page = ref(1)
const limit = 20
const loading = ref(false)
const error = ref('')
const result = ref({ items: [], total: 0 })
const searched = ref(false)

async function load() {
  if (!query.value.trim()) return
  loading.value = true
  error.value = ''
  searched.value = true
  try {
    result.value = await fetchProducts({ q: query.value.trim(), page: page.value, limit })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function onSearch() {
  page.value = 1
  load()
}

function openProduct(pcmNo) {
  router.push(productPath(locale.value, pcmNo))
}
</script>

<template>
  <div>
    <div class="page-hero mb-4">
      <h1 class="h2 fw-bold">{{ ui.searchTitle }}</h1>
      <p class="text-secondary mb-3">{{ ui.searchLead }}</p>
      <form class="row g-2" @submit.prevent="onSearch">
        <div class="col-md-9">
          <input
            v-model="query"
            type="search"
            class="form-control form-control-lg"
            :placeholder="ui.searchPlaceholder"
          />
        </div>
        <div class="col-md-3">
          <button type="submit" class="btn btn-primary btn-lg w-100">
            {{ ui.searchAction }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center py-5 text-secondary">{{ ui.loading }}</div>

    <div v-else-if="searched" class="vstack gap-3">
      <p v-if="result.items.length === 0" class="text-secondary">{{ ui.notFound }}</p>
      <MedicineSummaryCard
        v-for="item in result.items"
        :key="item.pcmNo"
        :item="item"
        :locale="locale"
        @select="openProduct"
      />
      <nav
        v-if="result.total > limit"
        class="d-flex align-items-center justify-content-between mt-2"
        aria-label="Pagination"
      >
        <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="page <= 1"
          @click="page--; load()"
        >
          {{ ui.pagerPrev }}
        </button>
        <span class="text-secondary small">{{ ui.pagerInfo(page, result.total) }}</span>
        <button
          type="button"
          class="btn btn-outline-primary"
          :disabled="page * limit >= result.total"
          @click="page++; load()"
        >
          {{ ui.pagerNext }}
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
}
</style>
