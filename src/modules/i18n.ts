import { createLanguageDetector } from 'react-native-localization-settings';
import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';
import histerTitleEn from '../locales/en/hister_decks_titles.json'
import histerBlurbEn from '../locales/en/hister_decks_blurbs.json'
import histerTitleDe from '../locales/de/hister_decks_titles.json'
import histerBlurbDe from '../locales/de/hister_decks_blurbs.json'

const languageDetector = createLanguageDetector({});

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: {
            histerTitles: histerTitleEn,
            histerBlurbs: histerBlurbEn
        },
        de: {
            histerTitles: histerTitleDe,
            histerBlurbs: histerBlurbDe
        }
    }
  });


export default i18next;