<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import i18n from '@/plugins/i18n'
import Sidebar from '@/components/layout/SidebarLayout.vue'

const route = useRoute()
const localeStore = useLocaleStore()

onMounted(() => {
  localeStore.initLocale()

  const paramLocale = route.params.locale
  if (paramLocale && ['en', 'tr', 'de'].includes(paramLocale)) {
    localeStore.setLocale(paramLocale)
    i18n.global.locale.value = paramLocale
  } else {
    i18n.global.locale.value = 'tr'
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-h-auto lg:tw-flex-row lg:tw-h-screen">
    <div class="tw-w-full tw-h-auto lg:tw-h-full lg:tw-w-[20%]">
      <Sidebar />
    </div>
    <main class="tw-w-full tw-h-full tw-overflow-auto lg:tw-w-[80%] tw-p-6">
      <router-view />
    </main>
  </div>
  <ConfirmDialog />
</template>
