import axios from 'axios'

export async function deleteFile(filename: string) {
  try {
    const res = await axios.post('http://localhost:8080/files/delete-file', { filename })

    return res.data.success
  } catch (error) {
    console.log('Error', error)
    throw error
  }
}
