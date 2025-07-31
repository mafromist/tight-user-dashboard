<template>
  <div v-if="user">
    <h1>User Detail</h1>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Username:</strong> {{ user.username }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Website:</strong> {{ user.website }}</p>
    <router-link to="/">Back to Home</router-link>
  </div>
  <div v-else>
    <p>User not found.</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const userStore = useUserStore()
const user = computed(() => {
  return userStore.users.find((u) => u.id === Number(route.params.id))
})
</script>

<style lang="scss" scoped></style>
