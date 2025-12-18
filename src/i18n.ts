import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/common.json'
import hi from './locales/hi/common.json'
import fr from './locales/fr/common.json'
import es from './locales/es/common.json'
import de from './locales/de/common.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    hi: { common: hi },
    fr: { common: fr },
    es: { common: es },
    de: { common: de },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
