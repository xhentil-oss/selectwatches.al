import { Link } from 'react-router-dom';
import ProductGrid from '../product/ProductGrid';
import { useI18n } from '../../i18n/I18nContext';

export default function LatestProducts({ title, products, viewAllTo }) {
  const { t } = useI18n();
  if (products.length === 0) return null;

  return (
    <section className="section container">
      <div className="section__head">
        <h2 className="section__title">{title}</h2>
        {viewAllTo && <Link to={viewAllTo} className="link-underline">{t('home.viewAll')} →</Link>}
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
