import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import { formatPrice } from '../../hooks/useSite';
import { brandName } from '../../data/brands';
import { CloseIcon } from '../ui/Icons';
import ProductImage from '../product/ProductImage';

export default function CartDrawer() {
  const { t } = useI18n();
  const { items, subtotal, isOpen, close, setQty, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} />
      <aside className={`drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen} aria-label={t('cart.title')}>
        <div className="drawer__head">
          <h3>{t('cart.title')}</h3>
          <button className="icon-btn" onClick={close} aria-label={t('season.dismiss')}><CloseIcon /></button>
        </div>

        {items.length === 0 ? (
          <p className="drawer__empty">{t('cart.empty')}</p>
        ) : (
          <ul className="drawer__items">
            {items.map((item) => (
              <li key={item.id} className={`cart-line theme-${item.site}`}>
                <ProductImage product={item} small />
                <div className="cart-line__info">
                  <small>{brandName(item.brand)}</small>
                  <Link to={`/${item.site}/product/${item.slug}`} onClick={close}>{item.name}</Link>
                  <div className="qty">
                    <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="-">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="+">+</button>
                  </div>
                </div>
                <div className="cart-line__end">
                  <strong>{formatPrice(item.price * item.qty)}</strong>
                  <button className="link-underline" onClick={() => remove(item.id)}>{t('cart.remove')}</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer__foot">
          <div className="drawer__total">
            <span>{t('cart.subtotal')}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <Link to="/cart" className="btn btn--block" onClick={close}>{t('cart.checkout')}</Link>
          <button className="btn btn--ghost btn--block" onClick={close}>{t('cart.continue')}</button>
        </div>
      </aside>
    </>
  );
}
