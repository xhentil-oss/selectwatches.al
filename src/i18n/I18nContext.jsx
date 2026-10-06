import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import sq from './sq';
import en from './en';
import it from './it';

export const LANGUAGES = [
  { code: 'sq', label: 'SQ', name: 'Shqip' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'en', label: 'EN', name: 'English' },
];

const dictionaries = { sq, en, it };
const I18nContext = createContext(null);

function readStoredLang() {
  try {
    const stored = localStorage.getItem('lang');
    return dictionaries[stored] ? stored : 'sq';
  } catch {
    return 'sq';
  }
}

// Resolves a dotted key ("nav.shop") against a dictionary.
function lookup(dict, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const value = useMemo(() => {
    const t = (key) => lookup(dictionaries[lang], key) ?? lookup(sq, key) ?? key;
    // Picks the active language from a multilingual data field: { sq, en, it }.
    const tr = (field) => (field && typeof field === 'object' ? field[lang] ?? field.sq : field);
    return { lang, setLang, t, tr };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
