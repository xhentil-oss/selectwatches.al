import { NavLink } from 'react-router-dom';
import { SITES } from '../../data/sites';
import { useI18n } from '../../i18n/I18nContext';
import { HomeIcon } from '../ui/Icons';

// Always-visible tabs at the top of the header: the user always sees which store they are in,
// and can get back to the shared Select Group home from anywhere.
export default function SiteSwitcher() {
  const { t } = useI18n();

  return (
    <nav className="site-switcher" aria-label="Select Group">
      <NavLink to="/" end className="site-switcher__tab site-switcher__tab--group" title={t('nav.groupHome')}>
        <HomeIcon />
        <span className="site-switcher__group-label">Select Group</span>
      </NavLink>
      {Object.values(SITES).map((site) => (
        <NavLink key={site.id} to={site.path} className={`site-switcher__tab site-switcher__tab--${site.id}`}>
          <span className="site-switcher__dot" aria-hidden="true" />
          {t(`sites.${site.id}.name`)}
        </NavLink>
      ))}
    </nav>
  );
}
