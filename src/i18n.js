import { createI18n } from 'vue-i18n'
import en from '@/locale/en.json'
import uk from '@/locale/uk.json'

const savedLocale = localStorage.getItem('locale') || 'uk'
const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    uk: uk,
    en: en
  }
})

export default i18n
