import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/counter'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Pocetna',
      requiresAuth: true,
    },
    component: () => import('@/views/home_page/homePage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard to update the document title and check authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore() // accessing store for storing global state if user is logged in
  try {
    // Always check authentication status (even for public routes)
    const response = await axios.get(`/petapi/validate-token`, {
      withCredentials: true,
    })

    if (response.status === 200) {
      authStore.isAuthenticated = true
    } else {
      authStore.isAuthenticated = false
    }
  } catch (err) {
    authStore.isAuthenticated = false
    console.log('ERROR FOR TOKEN VALIDATION', err)
  }

  // If the route requires authentication and user is not authenticated, redirect
  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
