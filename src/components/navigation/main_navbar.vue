<template>
  <v-app>
    <v-layout>
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" color="primary" class="px-6" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-cloud" title="Storage"></v-list-item>
          <v-progress-linear color="primary" height="10" model-value="20"></v-progress-linear>
          <p class="text-left mt-2">8.35GB used of 40GB</p>
        </v-list>
      </v-navigation-drawer>

      <!-- Top bar with hamburger menu -->
      <v-app-bar>
        <v-toolbar-title @click="drawer = !drawer"
          ><v-icon color="primary" class="mr-2">mdi-cloud-circle</v-icon>Sky
          Storage</v-toolbar-title
        >
      </v-app-bar>

      <!-- Main content -->
      <v-main>
        <v-container class="pa-2 ma-2">
          <h1>My Drive</h1>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true) // Controls sidebar visibility
</script>
