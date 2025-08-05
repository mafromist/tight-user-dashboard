<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'
import { useToast } from 'primevue/usetoast'
import PostSlider from '@/components/Posts/PostSlider.vue'
import AddPost from '@/components/Posts/AddPost.vue'

const route = useRoute()
const userStore = useUserStore()
const postsStore = usePostsStore()
const toast = useToast()
const user = computed(() => userStore.currentUser)
const userPosts = computed(() => postsStore.posts)

const handlePostAdded = async (params) => {
  try {
    await postsStore.createPost(params)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create post',
      life: 3000
    })
  }
}

// delete post method

const deletePost = async (postId) => {
  try {
    await postsStore.removePost(postId)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post deleted successfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete post',
      life: 3000
    })
  }
}

onMounted(async () => {
  try {
    await userStore.getUser(Number(route.params.id))
    await postsStore.fetchPostsByUser(Number(route.params.id))
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load user data',
      life: 3000
    })
  }
})
</script>

<template>
  <div v-if="user">
    <AddPost :userId="user.id" @post-added="handlePostAdded" />

    <!-- User's Posts Table -->
    <section class="user-posts">
      <h2>{{ $t('posts.yourPosts') }}</h2>
      <Divider />
      <PostSlider :postsProp="userPosts" :userId="user.id" @delete-post="deletePost" />
    </section>
  </div>
  <div v-else>
    <p>{{ $t('user.notFound') }}</p>
    <router-link :to="{ name: 'Dashboard', params: { locale: 'en' } }">{{
      $t('user.backToTable')
    }}</router-link>
  </div>
</template>

<style lang="scss" scoped></style>
