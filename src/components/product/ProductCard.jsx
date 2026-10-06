import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import { formatPrice } from '../../hooks/useSite';
import { brandName } from '../../data/brands';
import { PlusIcon } from '../ui/Icons';

export default function ProductCard({ product }) {
  const { t } = useI18n();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const url = `/${product.site}/product/${product.slug}`;
  const soldOut = product.stock === 0;

  // Add straight from the listing, without opening the product page.
  const quickAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card">
      <Link to={url} className="product-card__media">
        <ProductImage product={product} />
        <div className="product-card__badges">
          {product.salePrice && <span className="tag tag--sale">{t('product.sale')}</span>}
          {product.isNew && <span className="tag">{t('product.new')}</span>}
        </div>
      </Link>

      <button
        type="button"
        className="product-card__quick btn"
        onClick={quickAdd}
        disabled={soldOut}
        aria-label={`${t('product.addToCart')}: ${product.name}`}
      >
        {soldOut ? t('product.outOfStock') : added ? t('product.added') : (<><PlusIcon /> {t('product.addToCart')}</>)}
      </button>

      <div className="product-card__body">
        <small className="product-card__brand">{brandName(product.brand)}</small>
        <Link to={url} className="product-card__name">{product.name}</Link>
        <div className="price">
          {product.salePrice ? (
            <>
              <span className="price__sale">{formatPrice(product.salePrice)}</span>
              <s>{formatPrice(product.price)}</s>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
