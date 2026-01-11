import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/categories/'
    },
    {
      path: '/items/',
      name: 'items',
      component: () => import('../views/ExploreItems/ExploreItems.vue'),
      props: route => {
        const parseNestedParams = (query, key) => {
          const result = [];
          Object.keys(query).forEach(param => {
            const match = param.match(new RegExp(`^${key}\\[(\\d+)\\]\\[(\\w+)\\]$`));
            if (match) {
              const index = parseInt(match[1], 10);
              const field = match[2];
              result[index] = result[index] || {};
              result[index][field] = query[param];
            }
          });
          return result;
        };
        return {
          categories: route.query.categories,
          initialFulltextSearch: route.query.fullText,
          initialProperty: parseNestedParams(route.query, 'property'),
        };
      },
    },
    {
      path: '/items/:id(\\d+)',
      name: 'itemDetail',
      component: () => import('../views/ItemDetail.vue'),
      props: route => ({
        id: parseInt(route.params.id, 10),
      }),
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
      component: () => import('../views/ExploreCategories.vue'),
      props: true,
    },
    {
      path: '/admin/items/new',
      name: 'createItems',
      component: () => import('../views/CreateItem.vue')
    }
  ],
})

export default router
