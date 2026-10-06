import { useI18n } from '../i18n/I18nContext';
import { CONTACT } from '../data/sites';

export default function Contact() {
  const { t } = useI18n();

  return (
    <div className="container page page--narrow">
      <h1>{t('contact.title')}</h1>
      <p>
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </p>
      {/* TODO: connect to the backend / email service */}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>{t('contact.name')}<input required /></label>
        <label>Email<input type="email" required /></label>
        <label>{t('contact.message')}<textarea rows={5} required /></label>
        <button className="btn" type="submit">{t('contact.send')}</button>
      </form>
    </div>
  );
}
