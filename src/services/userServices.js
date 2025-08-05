import { api, baseRequest } from './baseApi.js'

export const fetchUsers = async () => {
  return baseRequest(() => api.get('/users'))
}

export const fetchUserById = async (userId) => {
  return baseRequest(() => api.get(`/users/${userId}`))
}
