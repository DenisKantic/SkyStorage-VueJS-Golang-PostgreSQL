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
        <v-dialog max-width="50%" v-model="dialogIsActive">
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
            <v-card :loading="isLoading" :disabled="isLoading" title="Upload a file">
              <VFileUpload v-model="selectedFiles" multiple clearable show-size />
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn :loading="isLoading" color="primary" @click="handleUpload" variant="flat"
                  >Upload</v-btn
                >
                <v-btn
                  :disabled="isLoading"
                  text="Cancel"
                  variant="elevated"
                  color="red"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
              <v-progress-linear
                v-show="isLoading"
                :model-value="uploadPercentage"
                size="100"
                height="30"
                color="primary"
                class="mt-5 bg-secondary text-white font-weight-bold"
                :indeterminate="false"
              >
                <span>Uploading... {{ uploadPercentage }}%</span>
              </v-progress-linear>
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
      <v-progress-linear
        color="primary"
        max="2"
        height="5"
        :model-value="folder_size"
      ></v-progress-linear>
      <p class="text-left text-body-2 mt-2">{{ folder_size }} used of 2GB</p>
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
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { UploadFiles } from '@/services/uploadFiles'
import { GetTotalSize } from '@/services/getTotalFolderSize'
import { uploadPercentage } from '@/services/uploadFiles'

const { logout } = useAuthStore()
const drawer = ref(true) // Controls sidebar visibility
const folder_size = ref(0)
const dialogIsActive = ref(false)

// storing uploaded files
const selectedFiles = ref<File[]>([])

// control of whole dialog when upload is doing
const isLoading = ref(false)

const handleUpload = async () => {
  if (!selectedFiles.value.length) {
    console.error('No files are selected')
    return
  }

  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await UploadFiles(selectedFiles.value)
    console.log('Files uploaded successfully')
    GetTotalSize()
    isLoading.value = false
    selectedFiles.value = []

    // closing the dialog
    dialogIsActive.value = false
  } catch (error) {
    console.error('ERROR', error)
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    folder_size.value = await GetTotalSize()
  } catch (error) {
    console.error(error)
  }
})
</script>
