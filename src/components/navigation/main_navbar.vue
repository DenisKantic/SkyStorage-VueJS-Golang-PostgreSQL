<template>
  <!-- Sidebar -->
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        subtitle="VortexDigitalSystems"
        title="Denis"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" color="primary" class="px-6 text-h5" nav>
      <v-list-item class="text-center">
        <v-btn color="primary" class="my-4"><v-icon>mdi-plus</v-icon>New</v-btn>
      </v-list-item>
      <v-list-item
        style="color: black"
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        style="color: black"
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item
        style="color: black"
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
      ></v-list-item>

      <!-- Email Dropdown -->
      <v-list-group value="email" prepend-icon="mdi-email">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Email" />
        </template>
        <v-list-item to="/email" title="Send Email" />
        <v-list-item to="/sent" title="Sent" />
        <v-list-item to="/inbox" title="Inbox" />
      </v-list-group>
      <v-list-item
        color="#BB3E00"
        prepend-icon="mdi-account"
        title="Logout"
        value="logout"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-database-outline" title="Storage"></v-list-item>
      <v-progress-linear color="primary" height="10" model-value="25"></v-progress-linear>
      <p class="text-left text-body-2 mt-2">8.35GB used of 40GB</p>
    </v-list>
  </v-navigation-drawer>

  <!-- Top bar with hamburger menu -->
  <v-app-bar>
    <v-toolbar-title @click="drawer = !drawer"
      ><v-icon color="primary" class="mr-2">mdi-cloud-circle</v-icon>Sky Storage</v-toolbar-title
    >
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true) // Controls sidebar visibility
</script>
