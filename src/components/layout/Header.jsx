import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import LanguageSwitcher from './LanguageSwitcher';
import SiteSwitcher from './SiteSwitcher';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { useSite } from '../../hooks/useSite';
import { brandsFor } from '../../data/brands';
import { SITES } from '../../data/sites';
import { BagIcon, MenuIcon, CloseIcon, UserIcon } from '../ui/Icons';

export default function Header() {
  const { t } = useI18n();
  const { count, open } = useCart();
  const site = useSite();
  const [menuOpen, setMenuOpen] = useState(false);

  // On the shared portal, the brands menu lists both stores side by side.
  const brandGroups = site ? [site] : Object.values(SITES);
  const close = () => setMenuOpen(false);

  return (
    <header className="header">
      <AnnouncementBar />

      <div className="header__bar">
        <div className="container header__bar-inner">
          <SiteSwitcher />
          <div className="header__utils">
            <LanguageSwitcher />
            <button type="button" className="header__login"><UserIcon /> <span>{t('login')}</span></button>
          </div>
        </div>
      </div>

      <div className="container header__main">
        <button className="icon-btn header__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" aria-expanded={menuOpen}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link to={site ? site.path : '/'} className="header__logo" onClick={close}>
          <img src={site ? site.logo : '/logos/select-group.svg'} alt={site ? t(`sites.${site.id}.name`) : 'Select Group'} />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          {site ? (
            <>
              <NavLink to={site.path} end onClick={close}>{t('nav.home')}</NavLink>
              <NavLink to={`${site.path}/shop`} onClick={close}>{t('nav.shop')}</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end onClick={close}>{t('nav.home')}</NavLink>
              {Object.values(SITES).map((s) => (
                <NavLink key={s.id} to={s.path} onClick={close}>{t(`sites.${s.id}.name`)}</NavLink>
              ))}
            </>
          )}

          <div className="nav-dropdown">
            <NavLink to="/brands" onClick={close}>{t('nav.brands')} <span className="caret">▾</span></NavLink>
            <div className="nav-dropdown__panel">
              {brandGroups.map((s) => (
                <div key={s.id} className="nav-dropdown__col">
                  <p className="nav-dropdown__title">{t(`sites.${s.id}.name`)}</p>
                  {brandsFor(s.id).map((b) => (
                    <Link key={b.slug} to={`${s.path}/shop?brand=${b.slug}`} onClick={close}>{b.name}</Link>
                  ))}
                </div>
              ))}
              <Link to="/brands" className="nav-dropdown__all" onClick={close}>{t('nav.allBrands')} →</Link>
            </div>
          </div>

          <NavLink to={`${site ? site.path : '/watches'}/shop?offer=1`} onClick={close}>{t('nav.seasonOffers')}</NavLink>
          <NavLink to="/contact" onClick={close}>{t('nav.contact')}</NavLink>
          <NavLink to="/blog" onClick={close}>{t('nav.blog')}</NavLink>
        </nav>

        <button className="icon-btn header__cart" onClick={open} aria-label={t('cart.title')}>
          <BagIcon />
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
