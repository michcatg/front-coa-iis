import { createRouter, createWebHistory } from 'vue-router'
import { hasCreateItemPermission, hasSession } from '../application/helpers/userPermissionsHelper'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
      beforeEnter: (to, from, next) => {
        if (hasCreateItemPermission()) {
          next();
        } else {
          next({ name: 'not-found' });
        }
      },
      component: () => import('../views/CreateItem.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to, from, next) => {
        if (hasSession()) {
          next({ name: 'home' });
        } else {
          next();
        }
      },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/Logout.vue')
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ],
})

export default router
