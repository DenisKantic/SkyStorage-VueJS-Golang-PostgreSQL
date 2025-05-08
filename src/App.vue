<template>
  <v-app>
    <Navbar v-if="isLoggedIn" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import Navbar from './components/navigation/main_navbar.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()

const { isLoggedIn } = storeToRefs(authStore)

console.log('IS LOGGED IN', isLoggedIn)
</script>
