import axios from 'axios'
import { ref } from 'vue'

export const uploadPercentage = ref(0)

export async function UploadFiles(files: File[]) {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })

  try {
    const res = await axios.post('http://localhost:8080/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          uploadPercentage.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('Upload progress:', uploadPercentage.value + '%')
        }
      },
    })
    uploadPercentage.value = 0
    return res.data
  } catch (error) {
    console.log('Upload failed', error)
    throw error
  }
}
