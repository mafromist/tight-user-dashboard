<script setup>
import { ref, computed } from 'vue'
import { truncateText } from '@/utils/formatters'

const props = defineProps({
  postsProp: {
    type: Array,
    default: () => [],
  },
  userId: {
    type: Number,
  },
})

const emit = defineEmits(['delete-post'])

const page = ref(0)
const perPage = 3
const showAll = ref(false)
const expandedPost = ref(null)

const startIndex = computed(() => page.value * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, props.postsProp.length))

const postsToRender = computed(() => {
  return showAll.value ? props.postsProp : props.postsProp.slice(startIndex.value, endIndex.value)
})

const next = () => {
  if (endIndex.value < props.postsProp.length) page.value++
}
const prev = () => {
  if (page.value > 0) page.value--
}
const expand = (post) => {
  expandedPost.value = post
}
</script>

<template>
  <div class="tw-max-w-5xl tw-mx-auto">
    <div v-if="!postsProp.length" class="tw-text-center tw-py-10">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="4"
        fill="var(--surface-ground)"
        animationDuration="2s"
      />
    </div>

    <div v-else>
      <div v-if="!expandedPost" class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        <Card
          v-for="post in postsToRender"
          :key="post.id"
          class="tw-relative tw-grid tw-origin-center"
          role="user-post"
        >
          <template #header>
            <img
              alt="user-profile-picture"
              :src="`https://i.pravatar.cc/150?u=${userId}`"
              class="tw-object-cover tw-h-50 tw-w-[135px] tw-my-4 tw-mx-auto tw-rounded-full"
            />
          </template>
          <template #title>
            {{ truncateText(post.title, 40) }}
          </template>
          <template #content>
            <p class="tw-text-sm tw-text-surface-500">
              {{ truncateText(post.body, 100) }}
            </p>
          </template>
          <template #footer>
            <div class="tw-flex tw-justify-between tw-items-center">
              <Button
                @click="emit('delete-post', post.id)"
                icon="pi pi-trash"
                severity="danger"
                outlined
                size="small"
                class="tw-mr-2"
              />
              <Button label="Read More" size="small" text @click="expand(post)" />
            </div>
          </template>
        </Card>
      </div>

      <Card v-else class="tw-w-full tw-shadow-lg">
        <template #header>
          <img
            alt="expanded"
            :src="`https://i.pravatar.cc/1180?u=${userId}`"
            class="tw-object-cover tw-h-96 tw-w-full"
          />
        </template>
        <template #title>
          {{ expandedPost.title }}
        </template>
        <template #subtitle> Full Post </template>
        <template #content>
          <p>{{ expandedPost.body }}</p>
        </template>
        <template #footer>
          <div class="tw-flex tw-justify-end">
            <Button label="Back to Posts" size="small" @click="expandedPost = null" />
          </div>
        </template>
      </Card>
    </div>
    <div
      v-if="postsProp.length && !expandedPost"
      class="tw-flex tw-items-center tw-mt-4 tw-gap-3"
      :class="showAll ? 'tw-justify-end ' : 'tw-justify-between '"
    >
      <div v-if="!showAll" class="tw-flex tw-justify-between tw-w-full">
        <div class="tw-text-xs tw-text-surface-500">
          Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ postsProp.length }} posts
        </div>
        <div class="tw-flex tw-gap-2">
          <Button
            icon="pi pi-chevron-left"
            @click="prev"
            :disabled="startIndex === 0"
            outlined
            size="small"
          />
          <Button
            icon="pi pi-chevron-right"
            @click="next"
            :disabled="endIndex >= postsProp.length"
            outlined
            size="small"
          />
        </div>
      </div>
      <div class="tw-flex tw-whitespace-nowrap">
        <Button label="Show All" @click="showAll = true" size="small" v-if="!showAll" />
        <Button label="Show Last 3 Posts" @click="showAll = false" size="small" v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.p-card-header {
  display: grid;
  place-items: center;
}
</style>
