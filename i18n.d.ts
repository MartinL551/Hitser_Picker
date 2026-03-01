import 'react-i18next';
import histerTitleEn from './src/locales/en/hister_decks_titles.json'
import histerBlurbEn from './src/locales/en/hister_decks_blurbs.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      histerDeckTitles: typeof histerTitleEn;
      histerBlurbEn: typeof histerBlurbEn;
    };
  }
}