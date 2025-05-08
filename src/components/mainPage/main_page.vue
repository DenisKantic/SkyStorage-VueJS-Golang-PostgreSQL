<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-main>
    <v-container class="pa-6 ma-0">
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

      <v-card title="Search" flat>
        <template v-slot:text>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-folder-search"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>

        <v-data-table :headers="headers" :items="data_items" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon @click="deleteFile(item)" size="25" color="red">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
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

const search = ref('')

const headers = ref([
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Name',
  },
  { key: 'type', title: 'Type' },
  { key: 'uploaded', title: 'Uploaded' },
  { key: 'size', title: 'File Size' },
  { key: 'actions', title: 'Actions' },
])

const data_items = ref([
  {
    name: 'Document1.pdf',
    id: 1,
    type: 'PDF', // Type
    uploaded: 'March 10, 2025', // Uploaded date
    size: '1.2 MB', // File size
  },
  {
    name: 'Image1.jpg',
    id: 2,
    type: 'Image', // Type
    uploaded: 'March 5, 2025', // Uploaded date
    size: '2.4 MB', // File size
  },
  {
    name: 'Presentation.pptx',
    id: 3,
    type: 'PowerPoint', // Type
    uploaded: 'March 1, 2025', // Uploaded date
    size: '4.5 MB', // File size
  },
  {
    name: 'Spreadsheet.xlsx',
    id: 4,
    type: 'Excel', // Type
    uploaded: 'February 20, 2025', // Uploaded date
    size: '3.3 MB', // File size
  },
  {
    name: 'AudioFile.mp3',
    id: 5,
    type: 'Audio', // Type
    uploaded: 'January 25, 2025', // Uploaded date
    size: '5.6 MB', // File size
  },
])

const deleteFile = (item: { id: number }) => {
  console.log('selected item', item.id)
}

// menu control
</script>
