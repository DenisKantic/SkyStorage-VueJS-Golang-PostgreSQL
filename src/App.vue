<template>
  <v-app>
    <Navbar v-if="isLoggedIn" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from './components/navigation/main_navbar.vue'
import { useAuthStore } from './stores/authStore'

const { isLoggedIn } = useAuthStore()
</script>
