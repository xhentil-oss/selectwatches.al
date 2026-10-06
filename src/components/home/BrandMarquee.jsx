import { Link } from 'react-router-dom';
import { BRANDS, brandsFor } from '../../data/brands';
import { useI18n } from '../../i18n/I18nContext';

// "Our Brands": endless strip of brand logos on light grey, as on selectgroup.al.
export default function BrandMarquee({ siteId }) {
  const { t } = useI18n();
  const brands = siteId ? brandsFor(siteId) : BRANDS;
  const loop = [...brands, ...brands];

  return (
    <section className="brands-marquee">
      <h2 className="section__title section__title--center">{t('nav.brands')}</h2>
      <div className="brands-marquee__viewport">
        <div className="brands-marquee__track">
          {loop.map((b, i) => (
            <Link
              key={`${b.slug}-${i}`}
              to={`/${siteId ?? b.sites[0]}/shop?brand=${b.slug}`}
              className="brands-marquee__item"
              aria-hidden={i >= brands.length}
              tabIndex={i >= brands.length ? -1 : undefined}
            >
              {b.logo ? <img src={b.logo} alt={b.name} /> : <span>{b.name}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
