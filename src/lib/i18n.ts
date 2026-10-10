import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  te: { translation: te },
  ta: { translation: ta },
  kn: { translation: kn },
  ml: { translation: ml },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Force default language for SSR
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur', 'sa', 'ks', 'kok', 'mni', 'ne', 'brx', 'sat', 'doi', 'mai'],
    interpolation: {
      escapeValue: false, // React escapes by default
    }
  });

export default i18n;
