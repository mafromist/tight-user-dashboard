<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLanguage } from '@/composables/switchLanguage'
const { languages, changeLanguage } = useLanguage()

const route = useRoute()
const { t } = useI18n()

const selectedLanguage = computed({
  get: () => route.params.locale,
  set: (value) => value,
})

defineProps({
  isDarkTheme: Boolean,
  toggleDarkMode: Function,
})
</script>

<template>
  <header class="tw-p-4 tw-border-b tw-border-gray-200 dark:tw-border-gray-700">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-2xl tw-font-bold tw-text-purple-800 text-center">
        {{ $t('common.appName') }}
      </div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <!-- Language Selector - visible on mobile/tablet -->
        <Select
          v-model="selectedLanguage"
          :options="languages"
          optionLabel="label"
          optionValue="code"
          @update:modelValue="changeLanguage"
          class="lg:tw-hidden tw-w-22"
          :pt="{
            root: { class: 'tw-border-none tw-bg-transparent' },
            input: { class: 'tw-p-1 tw-text-lg' },
          }"
        />
        <Button
          type="button"
          @click="toggleDarkMode"
          rounded
          :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
          severity="secondary"
        />
      </div>
    </div>

    <RouterLink
      v-if="route.name === 'UserDetails'"
      :to="`/${route.params.locale}/dashboard`"
      class="tw-no-underline tw-text-purple-700 dark:tw-text-purple-400 tw-font-medium tw-text-center tw-mb-4 hover:underline"
    >
      {{ t('user.backToTable') }}
    </RouterLink>
  </header>
</template>
