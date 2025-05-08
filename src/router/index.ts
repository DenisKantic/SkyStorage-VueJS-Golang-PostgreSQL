import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Pocetna',
      requiresAuth: true,
    },
    component: () => import('@/views/home_page/homePage.vue'),
  },
  {
    path: '/email',
    name: 'email',
    meta: {
      title: 'Email',
      requiresAuth: true,
    },
    component: () => import('@/views/email/email_system.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: () => import('@/views/login/login_screen.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    console.log('Middleware not logged in')
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
