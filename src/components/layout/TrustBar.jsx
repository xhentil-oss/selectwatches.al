import { useI18n } from '../../i18n/I18nContext';
import { GiftIcon, PinIcon, ShieldIcon, TruckIcon } from '../ui/Icons';

// Light band above the footer: separates the page from the dark footer and states the store guarantees.
const ITEMS = [
  { key: 'original', Icon: ShieldIcon },
  { key: 'shipping', Icon: TruckIcon },
  { key: 'gift', Icon: GiftIcon },
  { key: 'stores', Icon: PinIcon },
];

export default function TrustBar() {
  const { t } = useI18n();

  return (
    <section className="trust" aria-label="Select Group">
      <div className="container trust__grid">
        {ITEMS.map(({ key, Icon }) => (
          <div key={key} className="trust__item">
            <span className="trust__icon"><Icon /></span>
            <div>
              <strong>{t(`trust.${key}`)}</strong>
              <p>{t(`trust.${key}Text`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
