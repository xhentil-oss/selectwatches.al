import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../hooks/useSite';
import { PRODUCTS, finalPrice } from '../../data/products';
import ProductImage from '../product/ProductImage';
import { PlusIcon } from '../ui/Icons';

const ROTATE_MS = 6000;

// Each gift idea = a photo panel + a filter that picks real products for it.
const GIFTS = [
  { image: '/images/blog/watch-care.png', query: '?gender=men', fallback: '/watches', pick: (p) => p.gender === 'men' },
  { image: '/images/products/rosefield-heirloom-emerald.webp', query: '?gender=women', fallback: '/watches', pick: (p) => p.gender === 'women' },
  { image: '/images/blog/store-perfume.png', query: '?max=15000', fallback: '/beauty', pick: (p) => finalPrice(p) <= 15000 },
];

// In-stock products, photos first, alternating between the two stores so the portal shows both.
function picksFor(gift, products) {
  const sorted = products
    .filter((p) => p.stock > 0 && gift.pick(p))
    .sort((a, b) => Number(!!b.image) - Number(!!a.image));
  const bySite = Object.values(sorted.reduce((acc, p) => ({ ...acc, [p.site]: [...(acc[p.site] ?? []), p] }), {}));
  const mixed = [];
  for (let i = 0; mixed.length < sorted.length; i++) bySite.forEach((list) => list[i] && mixed.push(list[i]));
  return mixed.slice(0, 3);
}

// On a store page the panels use that store's own photography.
const imageFor = (gift, i, site) => (site ? [site.images.men, site.images.women, site.images.story][i] : gift.image);

// Expanding gift panels: the active one opens and shows hand-picked products with quick add.
export default function GiftIdeas({ site }) {
  const { t } = useI18n();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const texts = t('gifts.slides');
  const products = site ? PRODUCTS.filter((p) => p.site === site.id) : PRODUCTS;

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => setActive((i) => (i + 1) % GIFTS.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section className="section section--light gifts-section">
      <div className="container">
        <header className="gifts-head">
          <div>
            <span className="eyebrow">{t('gifts.eyebrow')}</span>
            <h2>{t('gifts.title')}</h2>
          </div>
          <p>{t('gifts.subtitle')}</p>
        </header>

        <div className="gifts" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {GIFTS.map((gift, i) => {
            const isActive = i === active;
            const shopTo = `${site ? site.path : gift.fallback}/shop${gift.query}`;
            return (
              <article
                key={i}
                className={`gift-panel ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="gift-panel__img" style={{ backgroundImage: `url(${imageFor(gift, i, site)})` }} />
                <div className="gift-panel__shade" />

                <div className="gift-panel__label" aria-hidden={isActive}>
                  <span>0{i + 1}</span>
                  <strong>{texts[i].title}</strong>
                </div>

                <div className="gift-panel__body" aria-hidden={!isActive}>
                  <span className="gift-panel__num">0{i + 1} / 0{GIFTS.length}</span>
                  <h3>{texts[i].title}</h3>
                  <p>{texts[i].text}</p>

                  <ul className="gift-picks">
                    {picksFor(gift, products).map((p) => (
                      <li key={p.id} className="gift-pick">
                        <Link to={`/${p.site}/product/${p.slug}`} className="gift-pick__img" tabIndex={isActive ? 0 : -1}>
                          <ProductImage product={p} small />
                        </Link>
                        <div className="gift-pick__info">
                          <Link to={`/${p.site}/product/${p.slug}`} tabIndex={isActive ? 0 : -1}>{p.name}</Link>
                          <span>{formatPrice(finalPrice(p))}</span>
                        </div>
                        <button
                          type="button"
                          className="gift-pick__add"
                          onClick={(e) => { e.stopPropagation(); add(p); }}
                          aria-label={`${t('product.addToCart')}: ${p.name}`}
                          tabIndex={isActive ? 0 : -1}
                        >
                          <PlusIcon />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <Link to={shopTo} className="gift-panel__cta" tabIndex={isActive ? 0 : -1}>
                    {t('gifts.all')} <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {isActive && !paused && <span key={active} className="gift-panel__progress" style={{ animationDuration: `${ROTATE_MS}ms` }} />}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
