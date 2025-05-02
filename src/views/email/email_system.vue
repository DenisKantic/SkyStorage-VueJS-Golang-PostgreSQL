<template>
  <v-card class="ma-10" variant="elevated" :disabled="cardLoading" :loading="cardLoading">
    <v-card-title>Email</v-card-title>
    <v-card-subtitle
      >To:
      <v-text-field type="email" v-model="email" variant="outlined" color="primary"></v-text-field
    ></v-card-subtitle>
    <v-card-text
      >Subject:
      <v-text-field type="text" v-model="subject" variant="outlined" color="primary"></v-text-field
    ></v-card-text>
    <p class="px-5">Text</p>
    <v-textarea auto-grow class="px-5" v-model="email_text" variant="solo-filled"></v-textarea>
    <v-divider></v-divider>
    <v-card-actions class="float-right">
      <v-btn
        color="primary"
        variant="outlined"
        :disabled="sendBtnLoading"
        :loading="sendBtnLoading"
        @click="validate_and_send"
        >Send</v-btn
      >
      <v-btn color="red" variant="elevated">Cancel</v-btn>
    </v-card-actions>
  </v-card>

  <SnackbarNotification :open="open" :title="title" :message="message" :msg_color="msg_color" />
</template>

<script lang="ts" setup>
import SnackbarNotification from '@/components/snackbar/snackbar_notification.vue'
import { sendEmail } from '@/services/mail'
import { ref } from 'vue'
//import { sendEmail } from '@/services/mail'

const email = ref('')
const subject = ref('')
const email_text = ref('')
const open = ref(false)
const title = ref('')
const message = ref('')
const msg_color = ref('')
const sendBtnLoading = ref(false)
const cardLoading = ref(false)

async function validate_and_send() {
  cardLoading.value = true
  sendBtnLoading.value = true

  if (!email.value.trim() || !subject.value.trim() || !email_text.value.trim()) {
    console.log('VALIDATION FIRED')
    title.value = 'Error'
    message.value = 'Some field is empty'
    msg_color.value = '#547792'
    open.value = true

    cardLoading.value = false
    sendBtnLoading.value = false
    setTimeout(() => {
      open.value = false
    }, 2000)
    return
  }

  console.log('payload', email, '', subject.value, '', email_text.value)
  const res = await sendEmail(email.value, subject.value, email_text.value)

  if (res.success) {
    open.value = true
    title.value = 'Success'
    message.value = 'Email sent successfully'

    setTimeout(() => {
      open.value = false
      cardLoading.value = false
      sendBtnLoading.value = false
    }, 2000)
  } else {
    open.value = true
    title.value = 'Error'
    message.value = 'Error on frontend'

    setTimeout(() => {
      cardLoading.value = false
      sendBtnLoading.value = false
      open.value = false
    }, 2000)
  }
}
</script>
