import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(import.meta.glob('./locales/*.json', { eager: true })).map(([key, value]) => [
    key.slice(11, -5),
    value.default,
  ]),
)

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'tr',
  fallbackLocale: 'en',
  messages,
})
