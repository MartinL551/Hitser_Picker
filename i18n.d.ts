import 'react-i18next';
import histerTitleEn from './src/locales/en/hister_decks_titles.json';
import histerBlurbEn from './src/locales/en/hister_decks_blurbs.json';
import uiEn from './src/locales/en/ui.json';
import tutorialEn from './src/locales/en/tutorial.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      histerDeckTitles: typeof histerTitleEn;
      histerBlurbs: typeof histerBlurbEn;
      ui: typeof uiEn;
      tutorial: typeof tutorialEn;
    };
  }
}