import { useI18n } from '../../i18n/I18nContext';
import { brandsFor } from '../../data/brands';
import { formatPrice } from '../../hooks/useSite';

const GENDERS = ['men', 'women', 'unisex'];
const PRICE_STEPS = [10000, 15000, 20000, 30000];

// Filters are stored in the URL (?gender=men&brand=dior…) so every view is shareable.
export default function Filters({ site, params, onChange }) {
  const { t } = useI18n();
  const get = (key) => params.get(key) ?? '';

  const Option = ({ name, value, label }) => (
    <label className="filter-option">
      <input type="radio" name={name} checked={get(name) === value} onChange={() => onChange(name, value)} />
      <span>{label}</span>
    </label>
  );

  return (
    <aside className="filters" aria-label={t('shop.filters')}>
      <fieldset>
        <legend>{t('shop.gender')}</legend>
        <Option name="gender" value="" label="—" />
        {GENDERS.map((g) => <Option key={g} name="gender" value={g} label={t(`shop.${g}`)} />)}
      </fieldset>

      <fieldset>
        <legend>{t('shop.category')}</legend>
        <Option name="category" value="" label="—" />
        {site.categories.map((c) => <Option key={c} name="category" value={c} label={t(`categories.${c}`)} />)}
      </fieldset>

      <fieldset>
        <legend>{t('shop.brand')}</legend>
        <Option name="brand" value="" label="—" />
        {brandsFor(site.id).map((b) => <Option key={b.slug} name="brand" value={b.slug} label={b.name} />)}
      </fieldset>

      <fieldset>
        <legend>{t('shop.price')}</legend>
        <Option name="max" value="" label="—" />
        {PRICE_STEPS.map((p) => (
          <Option key={p} name="max" value={String(p)} label={`${t('shop.maxPrice')} ${formatPrice(p)}`} />
        ))}
      </fieldset>

      <label className="filter-option filter-option--check">
        <input type="checkbox" checked={get('offer') === '1'} onChange={(e) => onChange('offer', e.target.checked ? '1' : '')} />
        <span>{t('shop.onSale')}</span>
      </label>

      <button type="button" className="link-underline" onClick={() => onChange(null)}>{t('shop.clear')}</button>
    </aside>
  );
}
