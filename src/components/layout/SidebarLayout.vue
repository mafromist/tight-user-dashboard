<script setup>
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import i18n from '@/plugins/i18n'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const localeStore = useLocaleStore()
const { currentUser } = storeToRefs(useUserStore())

const appConfig = reactive({
  darkTheme: false,
})

const toggleDarkMode = () => {
  if (!document.startViewTransition) {
    executeDarkModeToggle()

    return
  }

  document.startViewTransition(() => executeDarkModeToggle(event))
}

const executeDarkModeToggle = () => {
  appConfig.darkTheme = !appConfig.darkTheme
  document.documentElement.classList.toggle('dark-mode')
}

const isDarkTheme = computed(() => appConfig.darkTheme)

const languages = [
  { code: 'tr', label: '🇹🇷' },
  { code: 'en', label: '🇬🇧' },
  { code: 'de', label: '🇩🇪' },
]

const changeLanguage = (code) => {
  const fullLocale = {
    tr: 'tr-TR',
    en: 'en-US',
    de: 'de-DE',
  }[code]

  localeStore.setLocale(fullLocale)
  i18n.global.locale.value = fullLocale

  // Replace just the locale in the current path
  const path = route.fullPath.replace(/^\/[a-z]{2}/, `/${code}`)
  router.push(path)
}

const { t } = useI18n()
</script>

<template>
  <aside
    class="tw-bg-purple-100 tw-border-r tw-p-4 tw-shadow-md tw-h-full tw-flex tw-flex-col tw-justify-around tw-items-center"
  >
    <template v-if="route.path.includes('user') && currentUser">
      <Card role="user-details" class="tw-flex tw-items-center tw-mt-20 tw-pt-12">
        <template #header>
          <img
            :src="`https://i.pravatar.cc/150?u=${currentUser.id}`"
            class="tw-rounded-full tw-w-24 tw-h-24 tw-mx-auto tw-mb-4"
            alt="User avatar"
        /></template>
        <template #title>{{ currentUser.name }}</template>
        <template #subtitle>{{ currentUser.email }}</template>
        <template #content>
          <p>📞 {{ currentUser.phone }}</p>
          <p>🏠 {{ currentUser.address.street }}, {{ currentUser.address.city }}</p>
        </template>
      </Card>
    </template>

    <template v-else>
      <h2 class="text-xl font-bold mb-4">{{ t('dashboard.title') }}</h2>
      <RouterLink to="/dashboard" class="text-blue-600 hover:underline">{{
        t('dashboard.userTable')
      }}</RouterLink>
    </template>

    <!-- 🌍 Language switcher at bottom -->
    <div class="tw-mt-auto tw-mb-20 tw-border-t tw-border-gray-200">
      <p class="tw-text-purple-600 tw-font-bold">Choose Your Language</p>
      <div class="tw-space-y">
        <Button
          v-for="lang in languages"
          :key="lang.code"
          :label="lang.label"
          class="tw-text-left !tw-bg-transparent !tw-border-none tw-mr-2"
          @click="changeLanguage(lang.code)"
        />
      </div>
    </div>
    <!-- 🌍 Language switcher at bottom -->
    <div class="tw-mt-10">
      <Button
        type="button"
        @click="toggleDarkMode"
        rounded
        :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
        severity="secondary"
      />
    </div>
  </aside>
</template>
