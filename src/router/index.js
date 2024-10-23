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
        component: () => import('@/pages/TheAccountPage.vue'),
        meta: {
          authRequired: true
        }
      },
      {
        path: '/basket',
        name: 'TheBasketPage',
        component: () => import('@/pages/TheBasketPage.vue'),
        meta: {
          authRequired: true
        }
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

// router.beforeEach((to) => {
//   const userStore = useUsersStore()

//   // Якщо користувач не авторизований і сторінка вимагає авторизації
//   if (!userStore.isLoggedIn && to.meta.authRequired) {
//     if (to.name !== 'TheProfile') {
//       return { name: 'TheProfile' }
//     }
//   }

//   // Якщо користувач авторизований
//   else if (userStore.isLoggedIn) {
//     if (to.name === 'TheProfile' || to.name === 'TheBasketPage') {
//       return true // Дозволяємо доступ до сторінок профілю чи кошика
//     }

//     // Якщо намагається зайти на профіль або сторінку з авторизацією
//     if (to.meta.authRequired && to.name !== 'HomePage') {
//       return true
//     }

//     // Не перенаправляти на головну, якщо користувач вже на ній
//     if (to.name !== 'HomePage') {
//       return { name: 'HomePage' }
//     }
//   }

//   // Якщо не підпадає під жодну перевірку, дозволяємо перехід
//   return true
// })

export default router
