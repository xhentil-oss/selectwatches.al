import { LANGUAGES, useI18n } from '../../i18n/I18nContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          title={l.name}
          className={l.code === lang ? 'is-active' : ''}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
