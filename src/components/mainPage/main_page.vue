<!-- eslint-disable vue/valid-v-slot -->
<template>
  <ConfirmDeleteDialog
    v-model="showConfirmDelete"
    :filename="fileToDelete"
    @confirm="handleConfirmDelete"
  />
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
          <template v-slot:item.name="{ item }">
            <a
              href="#"
              @click.prevent="openFile(item.path)"
              class="text-black font-weight-bold text-decoration-none"
            >
              {{ item.name }}
            </a>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex items-center justify-center">
              <v-icon @click="deleteFileItem(item)" size="25" color="red">mdi-delete</v-icon>
              <v-icon size="25" class="cursor-pointer ml-10" color="blue">mdi-download</v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfirmDeleteDialog from '../global_components/confirm_delete_dialog.vue'
import { getAllFiles } from '@/services/getAllFiles'
import { deleteFile } from '@/services/deleteFile'
// items list
const items = ref([
  { title: 'Folders', icon: 'mdi-folder', color: 'gray' },
  { title: 'PDF', icon: 'mdi-file-pdf-box', color: 'red' },
  { title: 'Documents', icon: 'mdi-microsoft-word', color: 'primary' },
  { title: 'Images', icon: 'mdi-image', color: 'red' },
  { title: 'Audio', icon: 'mdi-music', color: 'red' },
  { title: 'Archives (zip)', icon: 'mdi-zip-box', color: 'gray' },
])

const showConfirmDelete = ref(false)
const fileToDelete = ref('')

const search = ref('')
const headers = ref<
  readonly {
    readonly key: string
    readonly title: string
    readonly align?: 'start' | 'center' | 'end'
    readonly sortable?: boolean
  }[]
>([
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Name',
  },
  { key: 'type', title: 'Type' },
  { key: 'uploaded', title: 'Uploaded' },
  { key: 'size', title: 'File Size' },
  { key: 'actions', title: 'Actions', align: 'center' },
] as const)

const data_items = ref<
  {
    id: number
    name: string
    type: string
    uploaded: string
    size: string
    path: string
  }[]
>([])

const deleteFileItem = (item: { name: string }) => {
  fileToDelete.value = item.name
  showConfirmDelete.value = true
}

const handleConfirmDelete = async (filename: string) => {
  try {
    await deleteFile(filename)
    data_items.value = await getAllFiles()
  } catch (error) {
    console.error('Failed to delete the file', error)
  }
  showConfirmDelete.value = false
}

function openFile(path: string) {
  const url = `http://localhost:8080/uploads/${path}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

//function downloadFile(path: string) {}

onMounted(async () => {
  try {
    data_items.value = await getAllFiles()
  } catch (err) {
    console.error('Failed to load files', err)
  }
})
// menu control
</script>
