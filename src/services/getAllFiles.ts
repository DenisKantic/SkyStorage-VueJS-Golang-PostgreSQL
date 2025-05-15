import axios from 'axios'
import type { FileItem } from '@/types/FileItem'

function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFileType(mime: string) {
  if (mime.includes('pdf')) return 'PDF'
  if (mime.includes('image')) return 'Image'
  if (mime.includes('zip') || mime.includes('rar')) return 'Archive'
  if (mime.includes('audio')) return 'Audio'
  if (mime.includes('msword') || mime.includes('wordprocessingml')) return 'Document'
  return 'Other'
}

function formatDateBosnia(dateString: string | Date): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export async function getAllFiles(): Promise<
  {
    id: number
    name: string
    type: string
    uploaded: string
    size: string
    path: string
  }[]
> {
  const res = await axios.get('http://localhost:8080/files/all-uploads')
  const files = res.data.files as FileItem[]

  return files.map((file) => ({
    id: file.id,
    name: file.file_name,
    type: getFileType(file.mime_type),
    uploaded: formatDateBosnia(file.upload_at),
    size: formatBytes(file.file_size),
    path: file.path,
  }))
}
