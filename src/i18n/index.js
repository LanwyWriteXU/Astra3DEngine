import en from './en.json';
import zh from './zh.json';
import ja from './ja.json';
import ru from './ru.json';
import la from './la.json';

import pluginSettingsEn from './plugin-settings/en.json';
import pluginSettingsZh from './plugin-settings/zh.json';

function mergeMessages(base, pluginSettings) {
  const merged = { ...base };
  Object.entries(pluginSettings).forEach(([key, value]) => {
    merged[`pluginSettings.${key}`] = value;
  });
  return merged;
}

const messages = {
  en: mergeMessages(en, pluginSettingsEn),
  zh: mergeMessages(zh, pluginSettingsZh),
  ja: mergeMessages(ja, pluginSettingsEn),
  ru: mergeMessages(ru, pluginSettingsEn),
  la: mergeMessages(la, pluginSettingsEn)
};

export const languages = [
  { code: 'zh', name: '中文', nativeName: '中文' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'la', name: 'Latin', nativeName: 'Latina' }
];

const STORAGE_KEY = 'astra-locale';

function loadLocaleFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && messages[saved]) {
    return saved;
  }
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('la')) return 'la';
  return 'en';
}

let currentLocale = loadLocaleFromStorage();
const localeListeners = new Set();

export function subscribeLocale(callback) {
  localeListeners.add(callback);
  return () => localeListeners.delete(callback);
}

export function setLocale(locale) {
  if (messages[locale] && locale !== currentLocale) {
    currentLocale = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    localeListeners.forEach(callback => callback(locale));
  }
}

export function getLocale() {
  return currentLocale;
}

export function msg(key, params = {}) {
  const locale = currentLocale;
  let text = messages[locale]?.[key] || messages['en']?.[key] || key;

  Object.keys(params).forEach(param => {
    text = text.replace(new RegExp(`\\{${param}\\}`), params[param]);
  });

  return text;
}

export function toggleLocale() {
  const langCodes = Object.keys(messages);
  const currentIndex = langCodes.indexOf(currentLocale);
  const nextIndex = (currentIndex + 1) % langCodes.length;
  const newLocale = langCodes[nextIndex];
  currentLocale = newLocale;
  localStorage.setItem(STORAGE_KEY, newLocale);
  localeListeners.forEach(callback => callback(newLocale));
}
