<script setup>
import { pickLocale } from '../utils/display'

defineProps({
  label: { type: String, required: true },
  field: { type: Object, default: null },
  locale: { type: String, default: 'zh' },
  multiline: { type: Boolean, default: false },
})
</script>

<template>
  <div class="field-row">
    <div class="label">{{ label }}</div>
    <div class="value" :class="{ muted: !field?.available }">
      <template v-if="multiline">
        <p v-for="(line, i) in pickLocale(field, locale).split('\n')" :key="i">{{ line }}</p>
      </template>
      <template v-else>
        {{ pickLocale(field, locale) }}
      </template>
      <p v-if="field?.source" class="source">來源：{{ field.source }}</p>
    </div>
  </div>
</template>

<style scoped>
.field-row {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 0.75rem 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e8e8e8;
}
.label {
  font-weight: 600;
  color: #444;
}
.value.muted {
  color: #888;
}
.source {
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  color: #6b7280;
}
@media (max-width: 640px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
