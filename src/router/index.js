import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/pages/HomePage.vue')
      },
      {
        path: '/profile',
        name: 'TheProfile',
        component: () => import('@/pages/auth/TheProfile.vue')
      },
      {
        path: '/cataloge/:category?',
        name: 'TheCatalogPage',
        component: () => import('@/pages/TheCatalogPage.vue')
      },
      {
        path: '/blogs/:id',
        name: 'TheBlogSinglePage',
        component: () => import('@/pages/TheBlogSinglePage.vue')
      },
      {
        path: '/catalog/:id',
        name: 'TheSinglePlantPage',
        component: () => import('@/pages/TheSinglePlantPage.vue')
      },
      {
        path: '/account',
        name: 'TheAccountPage',
        component: () => import('@/pages/TheAccountPage.vue')
      },
      {
        path: '/basket',
        name: 'TheBasketPage',
        component: () => import('@/pages/TheBasketPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
export default router
