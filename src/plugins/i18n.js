import { createI18n } from 'vue-i18n'

import en from './i18n/locales/en.json'
import tr from './i18n/locales/tr.json'
import de from './i18n/locales/de.json'

const messages = {
  en,
  tr,
  de,
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'tr',
  fallbackLocale: 'en',
  messages,
})
