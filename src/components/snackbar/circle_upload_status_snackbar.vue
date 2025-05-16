<!-- components/GlobalSnackbar.vue -->
<template>
  <v-snackbar
    v-model="visible"
    location="bottom center"
    :timeout="0"
    :vertical="false"
    elevation="6"
    class="d-flex align-center"
  >
    <v-progress-circular
      :value="uploadPercentage"
      size="40"
      width="4"
      color="primary"
      :indeterminate="false"
      class="mr-3"
    />
    <span>Uploading... {{ uploadPercentage }}%</span>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { uploadPercentage } from '@/services/uploadFiles'

const visible = ref(false)

watch(uploadPercentage, (newVal) => {
  if (newVal > 0 && newVal < 100) visible.value = true
  if (newVal === 100) setTimeout(() => (visible.value = false), 1000)
})
</script>

<style scoped>
.v-snackbar {
  min-width: 200px;
}
</style>
