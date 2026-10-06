import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/shop/Filters';
import ProductGrid from '../components/product/ProductGrid';
import { useI18n } from '../i18n/I18nContext';
import { finalPrice, productsFor } from '../data/products';

export default function Shop({ site }) {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateParam = (key, value) => {
    if (key === null) return setParams({});
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const products = useMemo(() => {
    const gender = params.get('gender');
    const category = params.get('category');
    const brand = params.get('brand');
    const max = Number(params.get('max')) || Infinity;
    const offer = params.get('offer') === '1';
    const sort = params.get('sort') ?? 'new';

    const list = productsFor(site.id).filter((p) =>
      (!gender || p.gender === gender) &&
      (!category || p.category === category) &&
      (!brand || p.brand === brand) &&
      finalPrice(p) <= max &&
      (!offer || p.salePrice)
    );

    if (sort === 'asc') list.sort((a, b) => finalPrice(a) - finalPrice(b));
    else if (sort === 'desc') list.sort((a, b) => finalPrice(b) - finalPrice(a));
    else list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [params, site.id]);

  return (
    <div className="container shop">
      <header className="shop__head">
        <h1>{t(`sites.${site.id}.name`)} — {t('shop.title')}</h1>
        <div className="shop__toolbar">
          <button className="btn btn--ghost shop__filter-toggle" onClick={() => setFiltersOpen((v) => !v)}>
            {t('shop.filters')}
          </button>
          <span>{products.length} {t('shop.results')}</span>
          <label>
            {t('shop.sort')}:{' '}
            <select value={params.get('sort') ?? 'new'} onChange={(e) => updateParam('sort', e.target.value)}>
              <option value="new">{t('shop.sortNew')}</option>
              <option value="asc">{t('shop.sortPriceAsc')}</option>
              <option value="desc">{t('shop.sortPriceDesc')}</option>
            </select>
          </label>
        </div>
      </header>

      <div className={`shop__layout ${filtersOpen ? 'filters-open' : ''}`}>
        <Filters site={site} params={params} onChange={updateParam} />
        {products.length ? <ProductGrid products={products} /> : <p className="shop__empty">{t('shop.empty')}</p>}
      </div>
    </div>
  );
}
