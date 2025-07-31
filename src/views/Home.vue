<template>
  <div>
    <h1>Home</h1>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        <router-link :to="`/user/${user.id}`">{{ user.name }} ({{ user.email }})</router-link>
      </li>
    </ul>
    <div v-else>Loading users...</div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { getUsers } from '../services/api'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const users = computed(() => userStore.users)

onMounted(async () => {
  try {
    const fetchedUsers = await getUsers()
    if (Array.isArray(fetchedUsers)) {
      userStore.setUsers(fetchedUsers)
    } else {
      userStore.setUsers([])
      console.error('Fetched users is not an array:', fetchedUsers)
    }
  } catch (error) {
    userStore.setUsers([])
    console.error('Failed to fetch users:', error)
  }
})
</script>

<style lang="scss" scoped></style>
