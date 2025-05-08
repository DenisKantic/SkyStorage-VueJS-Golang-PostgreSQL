import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    initializeAuth() {
      const token = document.cookie.includes('auth_token')
      console.log('token exists', token)
      this.isLoggedIn = token
    },
    async login(username: string, password: string) {
      try {
        const response = await axios.post(
          'http://localhost:8080/auth/login',
          {
            username,
            password,
          },
          {
            withCredentials: true,
          },
        )
        if (response.status === 200) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
      } catch (error) {
        console.error('Login failed', error)
        this.isLoggedIn = false
      }
    },

    async logout() {
      try {
        const csrfResponse = await axios.get('http://localhost:8080/csrf-token', {
          withCredentials: true,
        })

        const csrfToken = csrfResponse.data.csrf_token
        console.log('TOKEN', csrfToken)

        const logoutResponse = await axios.post(
          'http://localhost:8080/auth/logout',
          {},
          {
            headers: {
              'X-CSRF-Token': csrfToken,
            },
            withCredentials: true,
          },
        )

        if (logoutResponse.status === 200) {
          router.push('/login')

          this.isLoggedIn = false
        }
      } catch (error) {
        console.error('Logout failed', error)
        this.isLoggedIn = false
      }
    },
  },
})
