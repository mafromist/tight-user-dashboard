<script setup>
import { computed, onMounted, reactive } from 'vue'
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
    <!-- User's New Post Add Area -->
    <section class="add-post">
      <form @submit.prevent="addPost">
        <div class="card tw-p-4">
          <h2 class="tw-text-xl tw-font-semibold tw-mb-4 tw-text-primary">
            {{ $t('posts.createNew') }}
          </h2>
          <p class="tw-text-gray-600 tw-mb-6">
            {{ $t('posts.shareThoughts') }}
          </p>
          <Splitter
            class="tw-flex tw-flex-col tw-mb-4 tw-p-4 tw-h-full lg:tw-h-[45vh] lg:tw-flex-row"
          >
            <SplitterPanel :size="25" :minSize="10">
              <div
                class="tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-4"
              >
                <i class="pi pi-pencil text-4xl text-primary mb-4" />
                <h3 class="p-text-lg p-font-medium">{{ $t('posts.whatsOnMind') }}</h3>
                <p class="p-text-gray-500 p-mt-2">
                  {{ $t('posts.startWriting') }}
                </p>
              </div>
            </SplitterPanel>
            <SplitterPanel :size="75">
              <Splitter layout="vertical" :gutterSize="1">
                <SplitterPanel :size="30" class="tw-p-4">
                  <label class="tw-block tw-font-medium tw-mb-2 tw-mr-8" for="postTitle">{{
                    $t('posts.postTitle')
                  }}</label>
                  <InputText
                    type="text"
                    id="postTitle"
                    v-model="newPost.title"
                    :placeholder="$t('posts.titlePlaceholder')"
                    class="tw-w-full tw-p-2 tw-rounded tw-outline-none tw-border focus:tw-border-primary-500 hover:tw-border-primary-300 tw-transition-colors"
                    required
                  />
                </SplitterPanel>
                <SplitterPanel :size="60" class="tw-p-4">
                  <label class="tw-block tw-font-medium tw-mb-2 tw-mr-8" for="postContent">{{
                    $t('posts.postContent')
                  }}</label>
                  <Textarea
                    v-model="newPost.body"
                    :placeholder="$t('posts.contentPlaceholder')"
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
                    :label="$t('posts.publish')"
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
