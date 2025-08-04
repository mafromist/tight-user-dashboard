<!-- src/components/SidebarHeader.vue -->
<template>
  <header class="tw-p-4 tw-border-b tw-border-gray-200 dark:tw-border-gray-700">
    <div class="tw-flex tw-justify-between">
      <div class="tw-text-2xl tw-font-bold tw-text-purple-800 tw-mb-6 text-center">TightUser</div>
      <Button
        type="button"
        @click="toggleDarkMode"
        rounded
        :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
        severity="secondary"
      />
    </div>

    <div
      v-if="route.name === 'UserDetails'"
      class="tw-text-purple-700 dark:tw-text-purple-400 tw-font-medium tw-text-center tw-mb-4"
    >
      {{ t('dashboard.userTable') }}
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

defineProps({
  isDarkTheme: Boolean,
  toggleDarkMode: Function,
})
</script>
