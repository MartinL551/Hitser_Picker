
import * as Localization from "expo-localization";
import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';


import histerTitleEn from '../locales/en/hister_decks_titles.json'
import histerBlurbEn from '../locales/en/hister_decks_blurbs.json'
import uiEn from '../locales/en/ui.json'

import histerTitleDe from '../locales/de/hister_decks_titles.json'
import histerBlurbDe from '../locales/de/hister_decks_blurbs.json'
import uiDe from '../locales/de/ui.json'

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    const locale = Localization.locale ?? "en";
    const languageCode = locale.split("-")[0]; // "en-GB" -> "en"
    callback(languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["histerTitles", "histerBlurbs", "ui"],
    resources: {
        en: {
            histerTitles: histerTitleEn,
            histerBlurbs: histerBlurbEn,
            ui: uiEn
        },
        de: {
            histerTitles: histerTitleDe,
            histerBlurbs: histerBlurbDe,
            ui: uiDe
        }
    },
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });


export default i18next;