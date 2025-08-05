<script setup>
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['post-added'])
const toast = useToast()
const timeCountForToast = 3000

const newPost = reactive({
  title: '',
  body: '',
})

const addPost = async () => {
  try {
    const params = {
      userId: props.userId,
      title: newPost.title,
      body: newPost.body,
    }

    emit('post-added', params)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post published successfully!',
      life: timeCountForToast,
    })

    newPost.title = ''
    newPost.body = ''
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to publish post',
      life: timeCountForToast,
    })
  }
}
</script>

<template>
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
              <SplitterPanel :size="58" class="tw-p-4">
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
              <SplitterPanel :size="12" class="tw-flex tw-mt-2 tw-justify-end">
                <Button
                  type="submit"
                  :label="$t('posts.publish')"
                  icon="pi pi-send"
                  severity="primary"
                  class="tw-p-4 tw-max-h-[50px] tw-min-h-[40px]"
                />
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </form>
  </section>
</template>
