<script setup>
import { computed } from 'vue'
import { pickLocale } from '../utils/display'
import { uiCopy } from '../utils/uiCopy'

const props = defineProps({
  item: { type: Object, required: true },
  locale: { type: String, required: true },
})

const emit = defineEmits(['select'])

const ui = computed(() => uiCopy(props.locale))

const imageUrl = computed(() => props.item.images?.[0]?.url ?? null)

function packingsText() {
  const packs = props.item.packings
  if (!packs?.length) return ui.value.noData
  return packs.map((p) => pickLocale(p.description, props.locale)).join('；')
}

function fieldText(field) {
  return pickLocale(field, props.locale)
}
</script>

<template>
  <article class="card h-100 medicine-card shadow-sm" @click="emit('select', item.pcmNo)">
    <div class="row g-0">
      <div class="col-md-4">
        <div class="image-wrap">
          <img v-if="imageUrl" :src="imageUrl" :alt="fieldText(item.name)" class="img-fluid" />
          <div v-else class="no-image">{{ ui.noImage }}</div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="h5 card-title mb-1">{{ fieldText(item.name) }}</h3>
          <p class="text-primary fw-semibold small mb-3">{{ item.pcmNo }}</p>
          <dl class="row small mb-0 summary-dl">
            <dt class="col-sm-4">{{ ui.fields.dosageForm }}</dt>
            <dd class="col-sm-8">{{ fieldText(item.dosageForm) }}</dd>
            <dt class="col-sm-4">{{ ui.fields.ingredients }}</dt>
            <dd class="col-sm-8 text-break">{{ fieldText(item.ingredients) }}</dd>
            <dt class="col-sm-4">{{ ui.fields.manufacturer }}</dt>
            <dd class="col-sm-8">{{ fieldText(item.manufacturer) }}</dd>
            <dt class="col-sm-4">{{ ui.fields.regHolder }}</dt>
            <dd class="col-sm-8">{{ fieldText(item.regHolder) }}</dd>
            <dt class="col-sm-4">{{ ui.fields.packings }}</dt>
            <dd class="col-sm-8">{{ packingsText() }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.medicine-card {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  overflow: hidden;
}
.medicine-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(15, 23, 42, 0.12) !important;
}
.image-wrap {
  height: 100%;
  min-height: 180px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 220px;
}
.no-image {
  color: #64748b;
  font-size: 0.9rem;
  padding: 1rem;
  text-align: center;
}
.summary-dl dt {
  color: #64748b;
  font-weight: 600;
}
.summary-dl dd {
  margin-bottom: 0.35rem;
}
</style>
