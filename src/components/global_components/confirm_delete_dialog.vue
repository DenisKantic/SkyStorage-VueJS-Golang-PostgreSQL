<template>
  <v-dialog v-model="isVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h6">Confirm Delete</v-card-title>
      <v-card-text>
        Do you want to delete <strong>"{{ filename }}"</strong>?
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="red" variant="elevated" text @click="confirmDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  filename: {
    type: String,
    required: true,
  },
  modelValue: {
    // to control visibility from parent
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const isVisible = ref(props.modelValue)

// Sync internal visibility with parent v-model
watch(
  () => props.modelValue,
  (val) => {
    isVisible.value = val
  },
)

watch(isVisible, (val) => {
  emit('update:modelValue', val)
})

function cancel() {
  isVisible.value = false
}

function confirmDelete() {
  emit('confirm', props.filename)
  isVisible.value = false
}
</script>
