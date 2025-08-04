import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUsers, fetchUserById } from '@/services/userServices.js'
import { usePostsStore } from '@/stores/posts'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const postsStore = usePostsStore()

  const getUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const rawUsers = await fetchUsers()

      const usersWithPostCounts = await Promise.all(
        rawUsers.map(async (user) => {
          const postCount = await postsStore.getUserPostCount(user.id)
          return { ...user, postCount }
        }),
      )

      users.value = usersWithPostCounts
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const getUser = async (userId) => {
    loading.value = true
    error.value = null
    try {
      const [data, postCount] = await Promise.all([
        fetchUserById(userId),
        postsStore.getUserPostCount(userId),
      ])

      console.log('data', data)
      console.log('postCount', postCount)

      const merged = {
        ...data,
        postCount,
      }

      currentUser.value = merged
      setCurrentUser(merged)
    } catch (err) {
      error.value = err
      currentUser.value = null
    } finally {
      loading.value = false
    }
  }

  const setUsers = (newUsers) => {
    users.value = newUsers
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
  }

  const getUserById = (userId) => {
    return users.value.find((user) => user.id === userId)
  }

  return {
    users,
    currentUser,
    loading,
    error,
    getUsers,
    getUser,
    setUsers,
    setCurrentUser,
    getUserById,
  }
})
