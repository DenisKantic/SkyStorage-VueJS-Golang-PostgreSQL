<template>
  <v-main>
    <v-container class="pa-6 ma-0">
      <v-text-field
        class="mx-auto"
        clearable
        variant="outlined"
        label="Search"
        color="primary"
        prepend-inner-icon="mdi-folder-search"
      ></v-text-field>
      <h1 class="pl-2 mb-5">My Drive</h1>

      <v-btn
        variant="outlined"
        append-icon="mdi-arrow-down"
        color="primary"
        class="text-body-1 px-4 mr-5"
      >
        Type

        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title class="text-h6 d-flex items-center justify-left"
                ><v-icon size="30" class="mr-4" :color="item.color">{{ item.icon }}</v-icon
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <v-btn
        variant="outlined"
        append-icon="mdi-arrow-down"
        color="primary"
        class="text-body-1 px-4"
      >
        Modified

        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title class="text-h6 d-flex items-center justify-left"
                ><v-icon size="30" class="mr-4" :color="item.color">{{ item.icon }}</v-icon
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// items list
const items = ref([
  { title: 'Folders', icon: 'mdi-folder', color: 'gray' },
  { title: 'PDF', icon: 'mdi-file-pdf-box', color: 'red' },
  { title: 'Documents', icon: 'mdi-microsoft-word', color: 'primary' },
  { title: 'Images', icon: 'mdi-image', color: 'red' },
  { title: 'Audio', icon: 'mdi-music', color: 'red' },
  { title: 'Archives (zip)', icon: 'mdi-zip-box', color: 'gray' },
])

// menu control
</script>
