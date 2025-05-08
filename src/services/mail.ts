import axios from 'axios'

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const response = await axios.post('http://localhost:8080/email/send-email', {
      to: to,
      subject: subject,
      body: body,
    })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || 'Something went wrong',
      }
    } else {
      return {
        success: false,
        error: 'An unexpected error occurred',
      }
    }
  }
}
