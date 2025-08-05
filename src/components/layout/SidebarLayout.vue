<script setup>
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import i18n from '@/plugins/i18n'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import SidebarHeader from './SidebarHeader.vue'

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
  localeStore.setLocale(code)
  i18n.global.locale.value = code

  // Replace just the locale in the current path
  const path = route.fullPath.replace(/^\/[a-z]{2}/, `/${code}`)
  router.push(path)
}
</script>

<template>
  <aside
    class="tw-bg-purple-300 tw-border-r tw-text-center tw-p-4 tw-shadow-md tw-h-full tw-flex tw-flex-col tw-justify-between"
  >
    <SidebarHeader :isDarkTheme="isDarkTheme" :toggleDarkMode="toggleDarkMode" />
    <template v-if="route.path.includes('user') && currentUser">
      <Card role="user-details" class="tw-flex tw-items-center tw-mt-4 tw-pt-4 tw-shadow-none">
        <template #header>
          <img
            :src="`https://i.pravatar.cc/150?u=${currentUser.id}`"
            class="tw-rounded-full tw-w-24 tw-h-24 tw-mx-auto tw-mb-4"
            alt="User avatar"
          />
        </template>
        <template #title>{{ currentUser.name }}</template>
        <template #subtitle>
          <Button
            as="a"
            :label="currentUser.email"
            icon="pi pi-envelope"
            :href="`mailto:${currentUser.email}`"
            target="_blank"
            rel="noopener"
            severity="secondary"
            variant="text"
            rounded
            aria-label="User's Email Address"
            class="tw-no-underline"
          />
        </template>
        <template #content>
          <Button
            as="a"
            :label="currentUser.phone"
            icon="pi pi-phone"
            :href="`tel:${currentUser.phone}`"
            target="_blank"
            rel="noopener"
            severity="secondary"
            variant="text"
            rounded
            aria-label="User's Phone Number"
            class="tw-no-underline"
          />
          <p>
            <i class="pi pi-home"></i>
            {{ currentUser.address.street }}, {{ currentUser.address.city }}
          </p>
        </template>
      </Card>
    </template>

    <div
      class="tw-hidden lg:tw-flex tw-justify-center tw-items-center tw-border-t tw-pt-4 tw-border-gray-300"
    >
      <div class="tw-text-center">
        <p class="tw-text-purple-600 tw-font-bold tw-mb-2">{{ $t('common.chooseLanguage') }}</p>
        <Button
          v-for="lang in languages"
          :key="lang.code"
          :label="lang.label"
          :class="[
            'tw-border-none tw-text-lg',
            route.params.locale === lang.code
              ? 'tw-bg-purple-200 tw-rounded-full'
              : 'tw-bg-transparent',
          ]"
          @click="changeLanguage(lang.code)"
        />
      </div>
    </div>
  </aside>
</template>
