import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/resultados',
      name: 'results',
      component: () => import('@/views/ResultsView.vue'),
    },
    {
      path: '/academia/:slug',
      name: 'academy-detail',
      component: () => import('@/views/AcademyDetailView.vue'),
    },
  ],
})

export default router
