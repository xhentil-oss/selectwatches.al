import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import LanguageSwitcher from './LanguageSwitcher';
import SiteSwitcher from './SiteSwitcher';
import MobileMenu from './MobileMenu';
import AccountButton from '../auth/AccountButton';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { useSite } from '../../hooks/useSite';
import { brandsFor } from '../../data/brands';
import { SITES } from '../../data/sites';
import { BagIcon, MenuIcon } from '../ui/Icons';

export default function Header() {
  const { t } = useI18n();
  const { count, open } = useCart();
  const site = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // On the shared portal, the brands menu lists both stores side by side.
  const brandGroups = site ? [site] : Object.values(SITES);

  return (
    <>
      <header className="header">
        <AnnouncementBar />

        <div className="header__bar">
          <div className="container header__bar-inner">
            <SiteSwitcher />
            <div className="header__utils">
              <LanguageSwitcher />
              <AccountButton />
            </div>
          </div>
        </div>

        <div className="container header__main">
          <button className="icon-btn header__burger" onClick={() => setMenuOpen(true)} aria-label="Menu" aria-expanded={menuOpen}>
            <MenuIcon />
          </button>

          <Link to={site ? site.path : '/'} className="header__logo">
            <img src={site ? site.logo : '/logos/select-group.svg'} alt={site ? t(`sites.${site.id}.name`) : 'Select Group'} />
          </Link>

          {/* Desktop navigation; phones use MobileMenu below. */}
          <nav className="header__nav" aria-label="Main">
            {site ? (
              <>
                <NavLink to={site.path} end>{t('nav.home')}</NavLink>
                <NavLink to={`${site.path}/shop`}>{t('nav.shop')}</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" end>{t('nav.home')}</NavLink>
                {Object.values(SITES).map((s) => (
                  <NavLink key={s.id} to={s.path}>{t(`sites.${s.id}.name`)}</NavLink>
                ))}
              </>
            )}

            <div className="nav-dropdown">
              <NavLink to="/brands">{t('nav.brands')} <span className="caret">▾</span></NavLink>
              <div className="nav-dropdown__panel">
                {brandGroups.map((s) => (
                  <div key={s.id} className="nav-dropdown__col">
                    <p className="nav-dropdown__title">{t(`sites.${s.id}.name`)}</p>
                    {brandsFor(s.id).map((b) => (
                      <Link key={b.slug} to={`${s.path}/shop?brand=${b.slug}`}>{b.name}</Link>
                    ))}
                  </div>
                ))}
                <Link to="/brands" className="nav-dropdown__all">{t('nav.allBrands')} →</Link>
              </div>
            </div>

            <NavLink to={`${site ? site.path : '/watches'}/shop?offer=1`}>{t('nav.seasonOffers')}</NavLink>
            <NavLink to="/contact">{t('nav.contact')}</NavLink>
            <NavLink to="/blog">{t('nav.blog')}</NavLink>
          </nav>

          <button className="icon-btn header__cart" onClick={open} aria-label={t('cart.title')}>
            <BagIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} site={site} />
    </>
  );
}
