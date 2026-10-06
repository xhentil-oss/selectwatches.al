import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductImage from '../components/product/ProductImage';
import ProductGrid from '../components/product/ProductGrid';
import NotFound from './NotFound';
import { useI18n } from '../i18n/I18nContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../hooks/useSite';
import { findProduct, productsFor } from '../data/products';
import { brandName } from '../data/brands';

export default function ProductDetail({ site }) {
  const { slug } = useParams();
  const { t, tr } = useI18n();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  const product = findProduct(slug);
  if (!product || product.site !== site.id) return <NotFound />;

  const soldOut = product.stock === 0;
  const related = productsFor(site.id)
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const tabs = [
    { id: 'description', label: t('product.description') },
    { id: 'details', label: t('product.details') },
    { id: 'shipping', label: t('product.shipping') },
  ];

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/">Select Group</Link> / <Link to={site.path}>{t(`sites.${site.id}.name`)}</Link> / <Link to={`${site.path}/shop`}>{t('shop.title')}</Link> / <span>{product.name}</span>
      </nav>

      <div className="pdp">
        <ProductImage product={product} />

        <div className="pdp__info">
          <Link to={`${site.path}/shop?brand=${product.brand}`} className="eyebrow">{brandName(product.brand)}</Link>
          <h1>{product.name}</h1>
          <div className="price price--lg">
            {product.salePrice ? (
              <>
                <span className="price__sale">{formatPrice(product.salePrice)}</span>
                <s>{formatPrice(product.price)}</s>
              </>
            ) : (
              <span>{formatPrice(product.price)}</span>
            )}
          </div>
          <p className={soldOut ? 'stock stock--out' : 'stock'}>{soldOut ? t('product.outOfStock') : t('product.inStock')}</p>
          <p className="pdp__lead">{tr(product.description)}</p>

          <div className="pdp__buy">
            <div className="qty" aria-label={t('product.quantity')}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn--block" disabled={soldOut} onClick={() => add(product, qty)}>
              {t('product.addToCart')}
            </button>
          </div>

          <div className="tabs">
            <div className="tabs__list" role="tablist">
              {tabs.map((x) => (
                <button key={x.id} role="tab" aria-selected={tab === x.id} className={tab === x.id ? 'is-active' : ''} onClick={() => setTab(x.id)}>
                  {x.label}
                </button>
              ))}
            </div>
            <div className="tabs__panel" role="tabpanel">
              {tab === 'description' && <p>{tr(product.description)}</p>}
              {tab === 'details' && (
                <dl className="spec">
                  <div className="spec__row"><dt>{t('shop.gender')}</dt><dd>{t(`shop.${product.gender}`)}</dd></div>
                  <div className="spec__row"><dt>{t('shop.category')}</dt><dd>{t(`categories.${product.category}`)}</dd></div>
                  {Object.entries(product.details ?? {}).map(([k, v]) => (
                    <div key={k} className="spec__row"><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              )}
              {tab === 'shipping' && <p>{t('product.shippingText')}</p>}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <h2 className="section__title">{t('product.related')}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
