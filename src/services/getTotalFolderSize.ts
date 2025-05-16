import axios from 'axios'

export async function GetTotalSize() {
  try {
    const res = await axios.get('http://localhost:8080/files/total-size')
    return res.data.size_human
  } catch (error) {
    console.error('Failed to fetch the size', error)
    throw error
  }
}
