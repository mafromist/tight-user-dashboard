<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePostsStore } from '@/stores/posts'
import PostSlider from '@/components/Posts/PostSlider.vue'

const route = useRoute()
const userStore = useUserStore()
const postsStore = usePostsStore()
const user = computed(() => userStore.currentUser)
const userPosts = ref([])

const newPost = reactive({
  title: '',
  body: '',
})

const addPost = async () => {
  try {
    const params = {
      userId: Number(route.params.id),
      title: newPost.title,
      body: newPost.body,
    }
    await postsStore.createPost(params)

    newPost.title = ''
    newPost.body = ''
  } catch (error) {
    console.error('Failed to add post:', error)
  }
}

// TODO: Implement editPost method

// delete post method

const deletePost = async (postId) => {
  try {
    await postsStore.removePost(postId)
    userPosts.value = postsStore.posts
  } catch (error) {
    console.error('Failed to delete post:', error)
  }
}

onMounted(async () => {
  await userStore.getUser(Number(route.params.id))
  await postsStore.fetchPostsByUser(Number(route.params.id))
  userPosts.value = [...postsStore.posts]
})
</script>

<template>
  <div v-if="user">
    <!-- Add Post Area -->
    <section class="add-post">
      <form @submit.prevent="addPost">
        <div class="card">
          <Splitter style="height: 300px" class="mb-8">
            <SplitterPanel :size="30" :minSize="10">
              <div className="tw-h-full tw-grid tw-place-items-center tw-text-center">
                <h2>Would you like to add new post?</h2>
              </div>
            </SplitterPanel>
            <SplitterPanel :size="70">
              <Splitter layout="vertical">
                <SplitterPanel :size="15">
                  <h2>Add New Post Title</h2>
                  <div className="h-full flex items-center justify-center">
                    <input v-model="newPost.title" placeholder="Title" required />
                  </div>
                </SplitterPanel>
                <SplitterPanel :size="50">
                  <div className="h-full flex items-center justify-center">
                    <textarea v-model="newPost.body" placeholder="Content" required></textarea>
                    <button type="submit">Add</button>
                  </div>
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </div>
      </form>
    </section>

    <!-- User's Posts Table -->
    <section class="user-posts">
      <h2>Your Posts</h2>
      <Divider />
      <PostSlider :postsProp="userPosts" :userId="user.id" @delete-post="deletePost" />
    </section>
  </div>
  <div v-else>
    <p>User not found.</p>
    <router-link :to="{ name: 'Dashboard', params: { locale: 'en' } }"
      >Back to User Table</router-link
    >
  </div>
</template>

<style lang="scss" scoped></style>
