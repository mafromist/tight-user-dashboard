import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAllPosts,
  getUserPosts,
  sendPost,
  editPost,
  deletePost,
} from '@/services/postServices.js'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAllPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await getAllPosts()
      posts.value = data
    } catch (err) {
      console.log('Error fetching all posts: ', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchPostsByUser = async (userId) => {
    loading.value = true
    error.value = null
    try {
      const data = await getUserPosts(userId)
      posts.value = data
    } catch (err) {
      console.log('Error fetching posts by user:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getUserPostCount = async (userId) => {
    try {
      const data = await getUserPosts(userId)
      return Array.isArray(data) ? data.length : 0
    } catch (err) {
      console.error('Error fetching user post count:', err)
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
      console.log('posts')
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
      console.log('Removing post with ID:', postId)
      await deletePost(postId)
      posts.value = posts.value.filter((p) => p.id !== postId)
    } catch (err) {
      error.value = err
    }
  }

  return {
    posts,
    loading,
    error,
    fetchAllPosts,
    fetchPostsByUser,
    createPost,
    updatePost,
    removePost,
    getUserPostCount,
  }
})
