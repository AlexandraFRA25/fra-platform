import * as i18next from 'i18next'

// @ts-ignore
const createInstance = i18next.createInstance || i18next.default.createInstance

import * as enTranslation from './resources/en'
import * as frTranslation from './resources/fr'
import * as esTranslation from './resources/es'
import * as ruTranslation from './resources/ru'
import * as arTranslation from './resources/ar'
import * as zhTranslation from './resources/zh'

const translationsFiles: { [langCode: string]: any } = {
  en: enTranslation.translation,
  es: esTranslation.translation,
  fr: frTranslation.translation,
  ru: ruTranslation.translation,
  ar: arTranslation.translation,
  zh: zhTranslation.translation,
}

const createParams = (lang: string) => ({
  fallbackLng: 'en',
  debug: false,

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },

  lng: lang,

  resources: {
    [lang]: {
      translation: translationsFiles[lang],
    },
  },
})

export const createI18nInstance = (lang: any, callback: any) =>
  createInstance(createParams(lang), (_err: any, t: any) => callback({ language: lang, t }))

export const createI18nPromise = (lang: any) =>
  new Promise((resolve, reject) =>
    createInstance(createParams(lang), (err: any, t: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ language: lang, t })
    })
  )