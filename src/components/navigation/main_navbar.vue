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
        <v-dialog max-width="50%">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="primary"
              class="my-4"
              text="Open Dialog"
              variant="flat"
              ><v-icon>mdi-plus</v-icon>New</v-btn
            >
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload a file">
              <VFileUpload multiple clearable show-size />
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" variant="flat">Upload</v-btn>
                <v-btn
                  text="Cancel"
                  variant="elevated"
                  color="red"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-list-item>
      <v-list-item
        style="color: black"
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
        to="/"
      ></v-list-item>
      <v-list-item
        style="color: black"
        prepend-icon="mdi-star"
        title="Favorites"
        value="favorites"
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
        @click="logout"
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
    <v-toolbar-title @click="drawer = !drawer" class="cursor-pointer"
      ><v-icon color="primary" class="mr-2 cursor-pointer">mdi-cloud-circle</v-icon>Sky
      Storage</v-toolbar-title
    >
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const { logout } = useAuthStore()
const drawer = ref(true) // Controls sidebar visibility
</script>
