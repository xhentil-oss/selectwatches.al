import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import AccountButton from '../auth/AccountButton';
import { useI18n } from '../../i18n/I18nContext';
import { brandsFor } from '../../data/brands';
import { SITES } from '../../data/sites';
import { CloseIcon } from '../ui/Icons';

// Off-canvas menu for phones/tablets: slides in from the left, above everything.
export default function MobileMenu({ open, onClose, site }) {
  const { t } = useI18n();
  const { pathname, search } = useLocation();
  const [brandsOpen, setBrandsOpen] = useState(false);

  // Close on navigation and on Escape; lock page scroll while open.
  useEffect(() => { onClose(); }, [pathname, search]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const shopBase = site ? site.path : '/watches';

  return (
    <>
      <div className={`mmenu-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`mmenu ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Menu">
        <div className="mmenu__head">
          <Link to="/" className="mmenu__logo"><img src="/logos/select-group.svg" alt="Select Group" /></Link>
          <button className="icon-btn" onClick={onClose} aria-label={t('season.dismiss')}><CloseIcon /></button>
        </div>

        <div className="mmenu__scroll">
          <div className="mmenu__stores">
            {Object.values(SITES).map((s) => (
              <Link key={s.id} to={s.path} className={`mmenu__store mmenu__store--${s.id} ${site?.id === s.id ? 'is-current' : ''}`}>
                <span className="mmenu__store-img" style={{ backgroundImage: `url(${s.images.tile})` }} />
                <span className="mmenu__store-name">{t(`sites.${s.id}.name`)}</span>
              </Link>
            ))}
          </div>

          <nav className="mmenu__links">
            <NavLink to={site ? site.path : '/'} end>{t('nav.home')}</NavLink>
            {site && <NavLink to={`${site.path}/shop`}>{t('nav.shop')}</NavLink>}
            <NavLink to={`${shopBase}/shop?offer=1`}>{t('nav.seasonOffers')}</NavLink>

            <button type="button" className="mmenu__toggle" aria-expanded={brandsOpen} onClick={() => setBrandsOpen((v) => !v)}>
              {t('nav.brands')} <span aria-hidden="true">{brandsOpen ? '−' : '+'}</span>
            </button>
            {brandsOpen && (
              <div className="mmenu__brands">
                {(site ? [site] : Object.values(SITES)).map((s) => (
                  <div key={s.id}>
                    <p>{t(`sites.${s.id}.name`)}</p>
                    {brandsFor(s.id).map((b) => <Link key={b.slug} to={`${s.path}/shop?brand=${b.slug}`}>{b.name}</Link>)}
                  </div>
                ))}
                <Link to="/brands" className="mmenu__all">{t('nav.allBrands')} →</Link>
              </div>
            )}

            <NavLink to="/blog">{t('nav.blog')}</NavLink>
            <NavLink to="/about">{t('nav.about')}</NavLink>
            <NavLink to="/contact">{t('nav.contact')}</NavLink>
          </nav>
        </div>

        <div className="mmenu__foot">
          <LanguageSwitcher />
          <AccountButton />
        </div>
      </aside>
    </>
  );
}
