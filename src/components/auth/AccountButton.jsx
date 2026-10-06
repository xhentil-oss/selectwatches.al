import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n/I18nContext';
import { UserIcon } from '../ui/Icons';

// "Hyr" when signed out; "Përshëndetje, <name> · Dil" when signed in.
export default function AccountButton({ className = '' }) {
  const { user, openAuth, logout } = useAuth();
  const { t } = useI18n();

  if (!user) {
    return (
      <button type="button" className={`header__login ${className}`} onClick={() => openAuth('login')}>
        <UserIcon /> <span>{t('login')}</span>
      </button>
    );
  }

  return (
    <span className={`header__account ${className}`}>
      <span className="header__avatar" aria-hidden="true">{(user.firstName || user.email)[0].toUpperCase()}</span>
      <span className="header__hello">{t('auth.hello')}, {user.firstName}</span>
      <button type="button" className="header__logout" onClick={logout}>{t('auth.logout')}</button>
    </span>
  );
}
