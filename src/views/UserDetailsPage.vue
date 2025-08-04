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
const userPosts = computed(() => postsStore.posts)

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
})
</script>

<template>
  <div v-if="user">
    <!-- Add Post Area -->
    <!-- <section class="add-post">
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
    </section> -->

    <section class="add-post">
      <form @submit.prevent="addPost">
        <div class="card tw-p-4">
          <h2 class="tw-text-xl tw-font-semibold tw-mb-4 tw-text-primary">Create a New Post</h2>
          <p class="tw-text-gray-600 tw-mb-6">
            Got something to share? Fill out the form below to publish your thoughts.
          </p>
          <Splitter
            class="tw-flex tw-flex-col tw-mb-4 tw-p-4 tw-h-full lg:tw-h-[45vh] lg:tw-flex-row"
          >
            <SplitterPanel :size="25" :minSize="10">
              <div
                class="tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-4"
              >
                <i class="pi pi-pencil text-4xl text-primary mb-4" />
                <h3 class="p-text-lg p-font-medium">What's on your mind today?</h3>
                <p class="p-text-gray-500 p-mt-2">
                  Start by entering a catchy title and a meaningful message.
                </p>
              </div>
            </SplitterPanel>
            <SplitterPanel :size="75">
              <Splitter layout="vertical" gutterSize="1">
                <SplitterPanel :size="30" class="tw-p-4">
                  <label class="tw-block tw-font-medium tw-mb-2 tw-mr-8" for="postTitle"
                    >Post Title</label
                  >
                  <InputText
                    type="text"
                    id="postTitle"
                    v-model="newPost.title"
                    placeholder="e.g. Travel Notes from Thailand"
                    class="tw-w-full tw-p-2 tw-rounded tw-outline-none tw-border focus:tw-border-primary-500 hover:tw-border-primary-300 tw-transition-colors"
                    required
                  />
                </SplitterPanel>
                <SplitterPanel :size="60" class="tw-p-4">
                  <label class="tw-block tw-font-medium tw-mb-2 tw-mr-8" for="postContent"
                    >Post Content</label
                  >
                  <Textarea
                    v-model="newPost.body"
                    placeholder="Share your experience, thoughts, or questions..."
                    :autoResize="true"
                    rows="5"
                    cols="60"
                    id="postContent"
                    class="tw-w-full tw-p-2 tw-h-full tw-border tw-rounded tw-resize-none"
                    required
                  />
                </SplitterPanel>
                <SplitterPanel :size="10" class="tw-flex tw-mt-2 tw-justify-end">
                  <Button
                    type="submit"
                    label="Publish"
                    icon="pi pi-send"
                    severity="primary"
                    class="tw-p-4"
                  />
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
