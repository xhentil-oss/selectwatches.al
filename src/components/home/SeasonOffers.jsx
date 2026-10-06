import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../product/ProductImage';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../hooks/useSite';
import { brandName } from '../../data/brands';
import { SEASON_END } from '../../data/sites';
import { CloseIcon, PlusIcon } from '../ui/Icons';

const discount = (p) => Math.round((1 - p.salePrice / p.price) * 100);

function useCountdown(end) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(end).getTime() - now);
  return {
    done: ms === 0,
    parts: [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60],
  };
}

// "Seasonal offers": dark campaign block (closable with ×) with a giant discount figure,
// a live countdown and a scrollable rail of the discounted products.
export default function SeasonOffers({ products, image, shopPath }) {
  const { t } = useI18n();
  const { add } = useCart();
  const [visible, setVisible] = useState(true);
  const { done, parts } = useCountdown(SEASON_END);
  const offers = products.filter((p) => p.seasonOffer && p.salePrice);

  if (!visible || offers.length === 0) return null;

  const maxDiscount = Math.max(...offers.map(discount));
  const units = [t('season.days'), t('season.hours'), t('season.minutes'), t('season.seconds')];

  return (
    <section className="offers">
      <div className="offers__bg" style={{ backgroundImage: `url(${image})` }} />
      <button className="icon-btn offers__close" onClick={() => setVisible(false)} aria-label={t('season.dismiss')}>
        <CloseIcon />
      </button>

      <div className="container offers__grid">
        <div className="offers__intro">
          <span className="eyebrow">{t('season.title')}</span>
          <p className="offers__upto">{t('season.upTo')}</p>
          <p className="offers__figure" aria-label={`-${maxDiscount}%`}>
            <span>-{maxDiscount}</span><small>%</small>
          </p>
          <p className="offers__text">{t('season.text')}</p>

          {done ? (
            <p className="offers__ended">{t('season.ended')}</p>
          ) : (
            <div className="countdown" role="timer" aria-label={t('season.endsIn')}>
              {parts.map((v, i) => (
                <div key={i} className="countdown__cell">
                  <strong>{String(v).padStart(2, '0')}</strong>
                  <span>{units[i]}</span>
                </div>
              ))}
            </div>
          )}

          <Link to={`${shopPath}?offer=1`} className="offers__cta">{t('season.cta')} <span aria-hidden="true">→</span></Link>
        </div>

        <ul className="offers__rail">
          {offers.map((p) => (
            <li key={p.id} className="offer-card">
              <Link to={`/${p.site}/product/${p.slug}`} className="offer-card__media">
                <ProductImage product={p} />
                <span className="offer-card__badge">-{discount(p)}%</span>
              </Link>
              <div className="offer-card__body">
                <small>{brandName(p.brand)}</small>
                <Link to={`/${p.site}/product/${p.slug}`} className="offer-card__name">{p.name}</Link>
                <div className="offer-card__prices">
                  <strong>{formatPrice(p.salePrice)}</strong>
                  <s>{formatPrice(p.price)}</s>
                </div>
                <span className="offer-card__save">{t('season.save')} {formatPrice(p.price - p.salePrice)}</span>
              </div>
              <button type="button" className="offer-card__add" onClick={() => add(p)} aria-label={`${t('product.addToCart')}: ${p.name}`}>
                <PlusIcon /> {t('product.addToCart')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
