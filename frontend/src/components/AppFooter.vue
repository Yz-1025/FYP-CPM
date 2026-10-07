<script setup>
import { computed } from 'vue'
import { uiCopy } from '../utils/uiCopy'

const props = defineProps({
  locale: { type: String, required: true },
})

const ui = computed(() => uiCopy(props.locale))
</script>

<template>
  <footer class="app-footer border-top bg-white mt-auto">
    <div class="container py-4">
      <h2 class="h6 text-secondary mb-2">{{ ui.footer.warm }}</h2>
      <p class="small text-muted mb-0">{{ ui.footer.disclaimer }}</p>
    </div>
  </footer>
</template>
