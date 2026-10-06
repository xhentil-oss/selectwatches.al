import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { CONTACT, SITES } from '../../data/sites';
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon } from '../ui/Icons';

// Same structure as the current selectgroup.al footer: logo + about text, Links, Contacts, Payment methods.
export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <div className="footer__logos">
            {Object.values(SITES).map((s) => (
              <Link key={s.id} to={s.path}><img src={s.logo} alt={t(`sites.${s.id}.name`)} /></Link>
            ))}
          </div>
          <h4>{t('nav.about')}</h4>
          <p>{t('about.short')} {t('footerText')}</p>
          <Link to="/about" className="btn btn--outline btn--sm">{t('nav.about')}</Link>
        </div>

        <div>
          <h4>{t('footerLinks')}</h4>
          <Link to="/">{t('nav.home')}</Link>
          {Object.values(SITES).map((s) => (
            <Link key={s.id} to={s.path}>{t(`sites.${s.id}.name`)}</Link>
          ))}
          <Link to="/brands">{t('nav.brands')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
        </div>

        <div>
          <h4>{t('footerContacts')}</h4>
          <a href={CONTACT.phoneHref}><PhoneIcon /> {CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}><MailIcon /> {CONTACT.email}</a>
          <span><PinIcon /> Select Watches TEG &amp; QTU</span>
          {Object.values(SITES).map((s) => (
            <a key={s.id} href={CONTACT.instagram[s.id]} target="_blank" rel="noreferrer">
              <InstagramIcon /> {t(`sites.${s.id}.name`)}
            </a>
          ))}
        </div>

        <div>
          <h4>{t('payment')}</h4>
          <div className="payment-badges">
            <span>VISA</span><span>Mastercard</span><span>Cash</span>
          </div>
          <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
            <h4>{t('footer.newsletter')}</h4>
            <div className="input-row">
              <input type="email" required placeholder={t('footer.email')} aria-label={t('footer.email')} />
              <button type="submit" className="btn btn--outline btn--sm">{t('footer.subscribe')}</button>
            </div>
          </form>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} Select Group. {t('footer.rights')}{' '}
          <a href="https://bos.al/" target="_blank" rel="noopener noreferrer" className="footer__credit">Bos.al</a>
        </span>
        <span className="footer__legal">
          <Link to="/about">{t('footer.privacy')}</Link>
          <Link to="/about">{t('footer.terms')}</Link>
        </span>
      </div>
    </footer>
  );
}
