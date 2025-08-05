import { useRouter, useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import i18n from '@/plugins/i18n'

export const useLanguage = () => {
  const router = useRouter()
  const route = useRoute()
  const localeStore = useLocaleStore()

  const languages = [
    { code: 'tr', label: '🇹🇷' },
    { code: 'en', label: '🇬🇧' },
    { code: 'de', label: '🇩🇪' },
  ]

  const changeLanguage = (code) => {
    localeStore.setLocale(code)
    i18n.global.locale.value = code
    const path = route.fullPath.replace(/^\/[a-z]{2}/, `/${code}`)
    router.push(path)
  }

  return {
    languages,
    changeLanguage,
  }
}
