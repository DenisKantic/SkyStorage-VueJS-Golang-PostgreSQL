<template>
  <v-app>
    <v-layout>
      <MainNavbar />
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import MainNavbar from './navigation/main_navbar.vue'

export default {
  components: {
    MainNavbar,
  },
}
</script>
