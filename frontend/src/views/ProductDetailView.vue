<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProduct } from '../api/cpm'
import { pickLocale } from '../utils/display'
import { homePath, localeFromSegment } from '../utils/localePaths'
import { uiCopy } from '../utils/uiCopy'

const route = useRoute()
const router = useRouter()

const locale = computed(() => localeFromSegment(route.params.langSegment))
const ui = computed(() => uiCopy(locale.value))

const loading = ref(true)
const product = ref(null)

async function load() {
  loading.value = true
  product.value = await fetchProduct(route.params.pcmNo)
  loading.value = false
}

function fieldText(field) {
  if (!product.value) return ''
  return pickLocale(field, locale.value)
}

function packingsList() {
  if (!product.value?.packings?.length) return []
  return product.value.packings.map((p) => pickLocale(p.description, locale.value))
}

onMounted(load)
watch(() => route.params.pcmNo, load)
</script>

<template>
  <div>
    <button type="button" class="btn btn-link ps-0 mb-3" @click="router.push(homePath(locale))">
      ← {{ ui.backHome }}
    </button>

    <div v-if="loading" class="text-center py-5 text-secondary">{{ ui.loading }}</div>
    <div v-else-if="!product" class="alert alert-warning">{{ ui.notFound }}</div>

    <template v-else>
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body p-4">
          <h1 class="h3 fw-bold mb-1">{{ fieldText(product.name) }}</h1>
          <p class="text-primary fw-semibold">{{ product.pcmNo }}</p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <dl class="row detail-dl mb-0">
                <dt class="col-sm-4">{{ ui.fields.pcmNo }}</dt>
                <dd class="col-sm-8">{{ product.pcmNo }}</dd>

                <dt class="col-sm-4">{{ ui.fields.name }}</dt>
                <dd class="col-sm-8">{{ fieldText(product.name) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.dosageForm }}</dt>
                <dd class="col-sm-8">{{ fieldText(product.dosageForm) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.ingredients }}</dt>
                <dd class="col-sm-8 text-break">{{ fieldText(product.ingredients) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.manufacturer }}</dt>
                <dd class="col-sm-8">{{ fieldText(product.manufacturer) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.regHolder }}</dt>
                <dd class="col-sm-8">{{ fieldText(product.regHolder) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.packings }}</dt>
                <dd class="col-sm-8">
                  <ul v-if="packingsList().length" class="mb-0 ps-3">
                    <li v-for="(line, idx) in packingsList()" :key="idx">{{ line }}</li>
                  </ul>
                  <span v-else class="text-muted">{{ ui.noData }}</span>
                </dd>

                <dt class="col-sm-4">{{ ui.fields.efficacy }}</dt>
                <dd class="col-sm-8 text-break">{{ fieldText(product.efficacy) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.contraindications }}</dt>
                <dd class="col-sm-8 text-break">{{ fieldText(product.contraindications) }}</dd>

                <dt class="col-sm-4">{{ ui.fields.precautions }}</dt>
                <dd class="col-sm-8 text-break">{{ fieldText(product.precautions) }}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-white fw-semibold">{{ ui.fields.images }}</div>
            <div class="card-body">
              <div v-if="product.images?.length" class="vstack gap-3">
                <figure v-for="(img, idx) in product.images" :key="idx" class="mb-0">
                  <img :src="img.url" class="img-fluid rounded border" :alt="fieldText(product.name)" />
                  <figcaption v-if="img.source" class="small text-muted mt-1">
                    {{ img.source }}
                  </figcaption>
                </figure>
              </div>
              <p v-else class="text-muted mb-0">{{ ui.noImage }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-dl dt {
  color: #64748b;
  font-weight: 600;
}
.detail-dl dd {
  margin-bottom: 0.75rem;
}
</style>
