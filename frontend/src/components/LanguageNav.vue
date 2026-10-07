<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { languageLinks } from '../utils/uiCopy'
import { localeFromSegment, pathForLocaleSwitch } from '../utils/localePaths'

const route = useRoute()
const router = useRouter()

const currentLocale = computed(() => localeFromSegment(route.params.langSegment))
const links = computed(() => languageLinks(currentLocale.value))

function switchTo(locale) {
  if (locale === currentLocale.value) return
  router.push(pathForLocaleSwitch(route, locale))
}
</script>

<template>
  <nav class="language-nav" aria-label="Language">
    <template v-for="(item, index) in links" :key="item.locale">
      <span v-if="index > 0" class="sep">|</span>
      <button
        v-if="item.locale === currentLocale"
        type="button"
        class="lang active"
        disabled
      >
        {{ item.label }}
      </button>
      <button v-else type="button" class="lang link" @click="switchTo(item.locale)">
        {{ item.label }}
      </button>
    </template>
  </nav>
</template>

<style scoped>
.language-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem 0.5rem;
  font-size: 0.92rem;
}
.sep {
  color: #94a3b8;
  user-select: none;
}
.lang {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font: inherit;
}
.lang.active {
  font-weight: 700;
  color: #0f172a;
  cursor: default;
}
.lang.link {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}
.lang.link:hover {
  color: #1d4ed8;
}
</style>
