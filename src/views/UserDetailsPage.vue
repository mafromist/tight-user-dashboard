<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'
import { useToast } from 'primevue/usetoast'
import PostSlider from '@/components/posts/PostSlider.vue'
import AddPost from '@/components/posts/AddPost.vue'
import AddPostSkeleton from '@/components/posts/AddPostSkeleton.vue'
import PostSliderSkeleton from '@/components/posts/PostSliderSkeleton.vue'

const route = useRoute()
const userStore = useUserStore()
const postsStore = usePostsStore()
const toast = useToast()
const timeCountForToast = 3000
const user = computed(() => userStore.currentUser)
const userPosts = computed(() => postsStore.posts)
const isLoading = computed(() => userStore.loading || postsStore.loading)

// Add Post Function for AddPost Component

const addPost = async (params) => {
  try {
    await postsStore.createPost(params)
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create post',
      life: timeCountForToast,
    })
  }
}

// Delete Post Function on User Details Page

const deletePost = async (postId) => {
  try {
    await postsStore.removePost(postId)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post deleted successfully',
      life: timeCountForToast,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete post',
      life: timeCountForToast,
    })
  }
}

onMounted(async () => {
  try {
    await userStore.getUser(Number(route.params.id))
    await postsStore.fetchPostsByUser(Number(route.params.id))
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load user data',
      life: timeCountForToast,
    })
  }
})
</script>

<template>
  <div v-if="user && !isLoading">
    <AddPost :userId="user.id" @post-added="addPost" />

    <!-- User's Posts Table -->
    <section class="user-posts">
      <h2 class="tw-text-primary">{{ $t('posts.yourPosts') }}</h2>
      <Divider />
      <PostSlider :postsProp="userPosts" :userId="user.id" @delete-post="deletePost" />
    </section>
  </div>
  <div v-else-if="isLoading">
    <AddPostSkeleton />
    <section class="user-posts">
      <h2 class="tw-text-primary">{{ $t('posts.yourPosts') }}</h2>
      <Divider />
      <PostSliderSkeleton />
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
