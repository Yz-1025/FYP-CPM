<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProducts } from '../api/cpm'
import MedicineSummaryCard from '../components/MedicineSummaryCard.vue'
import { localeFromSegment, productPath } from '../utils/localePaths'
import { uiCopy } from '../utils/uiCopy'

const route = useRoute()
const router = useRouter()

const locale = computed(() => localeFromSegment(route.params.langSegment))
const ui = computed(() => uiCopy(locale.value))

const page = ref(1)
const limit = 20
const loading = ref(false)
const error = ref('')
const result = ref({ items: [], total: 0 })

async function load() {
  loading.value = true
  error.value = ''
  try {
    result.value = await fetchProducts({ page: page.value, limit })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function openProduct(pcmNo) {
  router.push(productPath(locale.value, pcmNo))
}

onMounted(load)
watch(page, load)
</script>

<template>
  <div>
    <div class="page-hero mb-4">
      <h1 class="display-6 fw-bold">{{ ui.homeTitle }}</h1>
      <p class="lead text-secondary mb-0">{{ ui.homeLead }}</p>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center py-5 text-secondary">{{ ui.loading }}</div>

    <div v-else class="vstack gap-3">
      <MedicineSummaryCard
        v-for="item in result.items"
        :key="item.pcmNo"
        :item="item"
        :locale="locale"
        @select="openProduct"
      />
    </div>

    <nav
      v-if="!loading && result.total > limit"
      class="d-flex align-items-center justify-content-between mt-4"
      aria-label="Pagination"
    >
      <button type="button" class="btn btn-outline-primary" :disabled="page <= 1" @click="page--">
        {{ ui.pagerPrev }}
      </button>
      <span class="text-secondary small">{{ ui.pagerInfo(page, result.total) }}</span>
      <button
        type="button"
        class="btn btn-outline-primary"
        :disabled="page * limit >= result.total"
        @click="page++"
      >
        {{ ui.pagerNext }}
      </button>
    </nav>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
}
</style>
