<template>
  <v-card class="ma-10" variant="elevated">
    <v-card-title>Email</v-card-title>
    <v-card-subtitle
      >To: <v-text-field type="email" variant="outlined" color="primary"></v-text-field
    ></v-card-subtitle>
    <v-card-text
      >Subject: <v-text-field type="text" variant="outlined" color="primary"></v-text-field
    ></v-card-text>
    <p class="px-5">Text</p>
    <v-textarea auto-grow class="px-5" variant="solo-filled"></v-textarea>
    <v-divider></v-divider>
    <v-card-actions class="float-right">
      <v-btn color="primary" variant="outlined">Send</v-btn>
      <v-btn color="red" variant="elevated">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup></script>
