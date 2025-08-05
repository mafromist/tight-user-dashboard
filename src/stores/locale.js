// stores/locale.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref('')

  const setLocale = (newLocale) => {
    currentLocale.value = newLocale
    localStorage.setItem('app-locale', newLocale)
  }

  const initLocale = () => {
    const saved = localStorage.getItem('app-locale')
    currentLocale.value = saved || 'en'
  }

  return {
    currentLocale,
    setLocale,
    initLocale,
  }
})
