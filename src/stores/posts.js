import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserPosts, sendPost, editPost, deletePost } from '@/services/postServices.js'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const currentUserId = ref(null)

  const getSessionKey = () => `user-posts-${currentUserId.value}`

  const syncPostsToStorage = () => {
    if (currentUserId.value) {
      sessionStorage.setItem(getSessionKey(), JSON.stringify(posts.value))
    }
  }

  const loadPostsFromStorage = (userId) => {
    const stored = sessionStorage.getItem(`user-posts-${userId}`)
    return stored ? JSON.parse(stored) : null
  }

  const fetchPostsByUser = async (userId) => {
    loading.value = true
    error.value = null
    currentUserId.value = userId

    const cached = loadPostsFromStorage(userId)
    if (cached) {
      posts.value = cached
      loading.value = false
      return
    }

    try {
      const data = await getUserPosts(userId)
      posts.value = data
      syncPostsToStorage()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getUserPostCount = async (userId) => {
    const cached = loadPostsFromStorage(userId)
    if (Array.isArray(cached)) {
      return cached.length
    }

    // 🔁 Fallback to API if no sessionStorage cache
    try {
      const data = await getUserPosts(userId)
      sessionStorage.setItem(`user-posts-${userId}`, JSON.stringify(data))
      return Array.isArray(data) ? data.length : 0
    } catch (err) {
      console.error('Error fetching post count from API:', err)
      return 0
    }
  }

  const createPost = async (postData) => {
    try {
      const newPost = await sendPost(postData)
      posts.value.unshift({
        ...newPost,
        createdAt: newPost.createdAt || new Date().toISOString(),
      })
      syncPostsToStorage()
    } catch (err) {
      console.error('Error creating post:', err)
      error.value = err
    }
  }

  const updatePost = async (postId, updatedData) => {
    try {
      const updated = await editPost(postId, updatedData)
      const updatedAt = new Date().toISOString()
      const index = posts.value.findIndex((p) => p.id === postId)
      if (index !== -1) {
        posts.value[index] = {
          ...updated,
          updatedAt,
          createdAt: posts.value[index].createdAt || null,
        }
        posts.value = [...posts.value] // Trigger reactivity
      }
    } catch (err) {
      error.value = err
    }
  }

  const removePost = async (postId) => {
    try {
      await deletePost(postId)
      posts.value = posts.value.filter((p) => p.id !== postId)
      syncPostsToStorage()
    } catch (err) {
      error.value = err
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPostsByUser,
    createPost,
    updatePost,
    removePost,
    getUserPostCount,
    loadPostsFromStorage,
  }
})
