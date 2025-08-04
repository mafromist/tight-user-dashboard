<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import i18n from '@/plugins/i18n'
import Sidebar from '@/components/layout/SidebarLayout.vue'

const route = useRoute()
const localeStore = useLocaleStore()

const localeMap = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
}

onMounted(() => {
  localeStore.initLocale()

  const paramLocale = route.params.locale
  if (paramLocale && localeMap[paramLocale]) {
    const fullLocale = localeMap[paramLocale]
    localeStore.setLocale(fullLocale)
    i18n.global.locale.value = fullLocale
  } else {
    // Default to Turkish
    i18n.global.locale.value = localeStore.currentLocale
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-h-auto lg:tw-flex-row lg:tw-h-screen">
    <div class="tw-w-full tw-h-auto lg:tw-h-full lg:tw-w-[20%]">
      <Sidebar />
    </div>
    <main class="tw-w-full tw-h-full lg:tw-overflow-y-hidden lg:tw-w-[80%] lg:tw-h-auto tw-p-6">
      <router-view />
    </main>
  </div>
</template>
