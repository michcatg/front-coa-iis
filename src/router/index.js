import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/items/',
      name: 'item',
      component: () => import('../views/ExploreItems.vue'),
      props: true,
    }
  ],
})

export default router
