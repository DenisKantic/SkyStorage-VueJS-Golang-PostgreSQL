<template>
  <v-app>
    <v-layout>
      <MainNavbar />
      <MainPage />
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import MainNavbar from './navigation/main_navbar.vue'
import MainPage from './mainPage/main_page.vue'

export default {
  components: {
    MainNavbar,
    MainPage,
  },
}
</script>
