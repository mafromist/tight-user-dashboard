import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getUsers = async () => {
  const response = await api.get('/')
  return response.data
}

export default api
