import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProductDetailView from './views/ProductDetailView.vue'
import SearchView from './views/SearchView.vue'
import { isValidSegment, homePath, pageTitleForSegment } from './utils/localePaths'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: homePath('zh') },
    {
      path: '/CPM/:langSegment',
      name: 'home',
      component: HomeView,
      beforeEnter: (to) => {
        if (!isValidSegment(to.params.langSegment)) {
          return homePath('zh')
        }
      },
    },
    {
      path: '/CPM/:langSegment/search',
      name: 'search',
      component: SearchView,
      beforeEnter: (to) => {
        if (!isValidSegment(to.params.langSegment)) {
          return homePath('zh')
        }
      },
    },
    {
      path: '/CPM/:langSegment/product/:pcmNo',
      name: 'product',
      component: ProductDetailView,
      beforeEnter: (to) => {
        if (!isValidSegment(to.params.langSegment)) {
          return homePath('zh')
        }
      },
    },
    {
      path: '/product/:pcmNo',
      redirect: (to) => `/CPM/Chi/product/${to.params.pcmNo}`,
    },
  ],
})

router.afterEach((to) => {
  const seg = to.params.langSegment
  if (seg) {
    document.title = pageTitleForSegment(seg)
  }
})

export default router
