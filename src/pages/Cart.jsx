import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../hooks/useSite';
import { brandName } from '../data/brands';
import ProductImage from '../components/product/ProductImage';

export default function Cart() {
  const { t } = useI18n();
  const { items, subtotal, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="container page page--narrow">
        <h1>{t('cart.title')}</h1>
        <p>{t('cart.empty')}</p>
        <Link to="/" className="btn">{t('cart.continue')}</Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>{t('cart.title')}</h1>
      <ul className="cart-page">
        {items.map((item) => (
          <li key={item.id} className={`cart-line theme-${item.site}`}>
            <ProductImage product={item} small />
            <div className="cart-line__info">
              <small>{brandName(item.brand)}</small>
              <Link to={`/${item.site}/product/${item.slug}`}>{item.name}</Link>
              <div className="qty">
                <button onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => setQty(item.id, item.qty + 1)}>+</button>
              </div>
            </div>
            <div className="cart-line__end">
              <strong>{formatPrice(item.price * item.qty)}</strong>
              <button className="link-underline" onClick={() => remove(item.id)}>{t('cart.remove')}</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <span>{t('cart.subtotal')}</span>
        <strong>{formatPrice(subtotal)}</strong>
        {/* TODO: checkout flow (address, payment) */}
        <button className="btn">{t('cart.checkout')}</button>
      </div>
    </div>
  );
}
