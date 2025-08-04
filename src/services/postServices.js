import { api, baseRequest } from './baseApi.js'

export const getAllPosts = async () => {
  return baseRequest(() => api.get('/posts'))
}

export const getUserPosts = async (userId) => {
  return baseRequest(() => api.get(`/users/${userId}/posts`))
}

export const getPostComments = async (postId) => {
  return baseRequest(() => api.get(`/posts/${postId}/comments`))
}

export const sendPost = async (postData) => {
  return baseRequest(() => api.post('/posts', postData))
}

export const editPost = async (postId, postData) => {
  return baseRequest(() => api.put(`/posts/${postId}`, postData))
}

export const deletePost = async (postId) => {
  return baseRequest(() => api.delete(`/posts/${postId}`))
}
