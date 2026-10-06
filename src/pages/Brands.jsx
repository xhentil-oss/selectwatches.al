import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { SITES } from '../data/sites';
import { brandsFor } from '../data/brands';

export default function Brands() {
  const { t } = useI18n();

  return (
    <div className="container page">
      <h1>{t('nav.brands')}</h1>
      {Object.values(SITES).map((site) => (
        <section key={site.id} className="section">
          <h2 className="section__title">{t(`sites.${site.id}.name`)}</h2>
          <div className="brand-grid">
            {brandsFor(site.id).map((b) => (
              <Link key={b.slug} to={`${site.path}/shop?brand=${b.slug}`} className="brand-grid__item">
                {b.logo ? <img src={b.logo} alt={b.name} loading="lazy" /> : <span>{b.name}</span>}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
