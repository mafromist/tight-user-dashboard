import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

// Centralized wrapper for consistent error/data handling
export const baseRequest = async (requestFn) => {
  try {
    const response = await requestFn()
    return response.data
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}
