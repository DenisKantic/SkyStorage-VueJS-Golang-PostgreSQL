<template>
  <v-app>
    <v-layout>
      <MainPage />
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import MainPage from './mainPage/main_page.vue'

export default {
  components: {
    MainPage,
  },
}
</script>
