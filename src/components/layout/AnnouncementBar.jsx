import { useI18n } from '../../i18n/I18nContext';

// Continuously scrolling info strip at the very top of the header.
export default function AnnouncementBar() {
  const { t } = useI18n();
  const messages = t('announcements');
  // Duplicate the list so the CSS marquee loops seamlessly.
  const loop = [...messages, ...messages];

  return (
    <div className="announcement" role="region" aria-label="Info">
      <div className="announcement__track">
        {loop.map((msg, i) => (
          <span key={i} className="announcement__item" aria-hidden={i >= messages.length}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
