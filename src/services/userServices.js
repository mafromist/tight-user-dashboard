import { api, baseRequest } from './baseApi.js'

export const fetchUsers = async () => {
  return baseRequest(() => api.get('/users'))
}

export const fetchUserById = async (userId) => {
  return baseRequest(() => api.get(`/users/${userId}`))
}

// Tüm postları getir (isteğe bağlı burada olabilir)
export const fetchAllPosts = async () => {
  return baseRequest(() => api.get('/posts'))
}

// Belirli kullanıcıya ait postları getir
export const fetchUserPosts = async (userId) => {
  return baseRequest(() => api.get(`/posts?userId=${userId}`))
}
