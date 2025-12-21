import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/items/',
      name: 'items',
      component: () => import('../views/ExploreItems.vue'),
      props: route => ({ categories: route.query.categories }),
    },
    {
      path: '/categories/',
      name: 'categories',
      component: () => import('../views/ExploreCategories.vue'),
      props: true,
    },
    {
      path: '/categories/:slug',
      name: 'category',
      // TODO: Crear vista específica para categoría
      component: () => import('../views/ExploreCategories.vue'),
      props: true,
    },
  ],
})

export default router
