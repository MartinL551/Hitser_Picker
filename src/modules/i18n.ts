
import * as Localization from "expo-localization";
import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';
import Constants from "expo-constants";


import histerTitleEn from '../locales/en/hister_decks_titles.json';
import histerBlurbEn from '../locales/en/hister_decks_blurbs.json';
import uiEn from '../locales/en/ui.json';
import tutorialEn from '../locales/en/tutorial.json';

import histerTitleDe from '../locales/de/hister_decks_titles.json';
import histerBlurbDe from '../locales/de/hister_decks_blurbs.json';
import uiDe from '../locales/de/ui.json';
import tutorialDe from '../locales/de/tutorial.json';



const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    if(__DEV__) {
        const devLanguage = Constants.expoConfig?.extra?.debug?.lang;
        callback(devLanguage);
        return;
    }
    
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
    ns: ["histerTitles", "histerBlurbs", "ui", "tutorial"],
    resources: {
        en: {
            histerTitles: histerTitleEn,
            histerBlurbs: histerBlurbEn,
            ui: uiEn,
            tutorial: tutorialEn,
        },
        de: {
            histerTitles: histerTitleDe,
            histerBlurbs: histerBlurbDe,
            ui: uiDe,
            tutorial: tutorialDe,
        }
    },
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });


export default i18next;