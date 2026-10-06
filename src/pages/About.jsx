import { useI18n } from '../i18n/I18nContext';
import { CONTACT } from '../data/sites';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="container page page--narrow">
      <h1>{t('about.title')}</h1>
      <p className="lead">{t('about.text')}</p>
      <h2>{t('footer.stores')}</h2>
      <ul className="store-list">
        {CONTACT.stores.map((s) => (
          <li key={s.name}><strong>{s.name}</strong> — {s.hours}</li>
        ))}
      </ul>
    </div>
  );
}
