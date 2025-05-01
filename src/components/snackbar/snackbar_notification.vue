<template>
  <div class="text-center">
    <v-snackbar v-model="open" vertical color="msg_color">
      <v-chip class="text-subtitle-1 mb-2">{{ title }}</v-chip>

      <p class="text-white">{{ message }}</p>

      <template v-slot:actions>
        <v-btn color="#273F4F" variant="elevated" @click="open = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  message: string
  msg_color: string
}>()

const open = ref(props.open)

watch(
  () => props.open,
  (val) => (open.value = val),
)
</script>
