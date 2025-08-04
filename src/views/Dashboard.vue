<script setup>
import { onMounted, computed } from 'vue'

import { useUserStore } from '@/stores/user'
import UserTable from '@/components/Table/UserTable.vue'

const userStore = useUserStore()
const users = computed(() => userStore.users)

onMounted(async () => {
  await userStore.getUsers()
  console.log('users', users.value)
})
</script>

<template>
  <div>
    <div class="tw-flex tw-justify-between tw-mx-4 tw-text-purple-600">
      <h1>User List</h1>
      <p class="tw-text-lg tw-font-bold">Total Users: {{ users.length }}</p>
    </div>
    <section v-if="users.length">
      <UserTable :users="users" />
    </section>
    <div v-else>Loading users...</div>
  </div>
</template>

<style lang="scss" scoped></style>
