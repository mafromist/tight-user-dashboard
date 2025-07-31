import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  function setUsers(newUsers) {
    users.value = newUsers
  }
  return { users, setUsers }
})
