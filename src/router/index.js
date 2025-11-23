import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/repositorio/items/:id',
      name: 'item',
      component: () => import('../views/RepositorioItemView.vue'),
      props: true,
    }
  ],
})

export default router
