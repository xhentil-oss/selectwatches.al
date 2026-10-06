import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n/I18nContext';
import { SITES } from '../../data/sites';
import { CloseIcon } from '../ui/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 0–4 score: length, mixed case, digit, symbol.
function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function Field({ label, error, children, hint }) {
  return (
    <label className={`auth-field ${error ? 'has-error' : ''}`}>
      <span className="auth-field__label">{label}</span>
      {children}
      {error ? <span className="auth-field__error" role="alert">{error}</span> : hint}
    </label>
  );
}

function PasswordInput({ value, onChange, autoComplete, t }) {
  const [show, setShow] = useState(false);
  return (
    <span className="auth-password">
      <input type={show ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} />
      <button type="button" onClick={() => setShow((v) => !v)} aria-pressed={show}>
        {show ? t('auth.hidePassword') : t('auth.showPassword')}
      </button>
    </span>
  );
}

function LoginForm({ t }) {
  const { login, closeAuth, setMode } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!EMAIL_RE.test(form.email)) errs.email = t('auth.errors.email');
    if (!form.password) errs.password = t('auth.errors.required');
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await login(form);
    setBusy(false);
    closeAuth();
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field label={t('auth.email')} error={errors.email}>
        <input type="email" value={form.email} onChange={set('email')} autoComplete="email" autoFocus />
      </Field>
      <Field label={t('auth.password')} error={errors.password}>
        <PasswordInput value={form.password} onChange={set('password')} autoComplete="current-password" t={t} />
      </Field>
      <div className="auth-row">
        <label className="auth-check">
          <input type="checkbox" checked={form.remember} onChange={set('remember')} />
          <span>{t('auth.remember')}</span>
        </label>
        <button type="button" className="auth-link" onClick={() => setMode('reset')}>{t('auth.forgot')}</button>
      </div>
      <button type="submit" className="auth-submit" disabled={busy}>
        {busy ? <span className="auth-spinner" aria-hidden="true" /> : t('auth.submitLogin')}
      </button>
      <p className="auth-switch">
        {t('auth.noAccount')} <button type="button" className="auth-link" onClick={() => setMode('register')}>{t('auth.register')}</button>
      </p>
    </form>
  );
}

function RegisterForm({ t }) {
  const { register, closeAuth, setMode } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', interests: [], terms: false, newsletter: true });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const toggleInterest = (id) =>
    setForm({ ...form, interests: form.interests.includes(id) ? form.interests.filter((x) => x !== id) : [...form.interests, id] });
  const score = strength(form.password);

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = t('auth.errors.required');
    if (!form.lastName.trim()) errs.lastName = t('auth.errors.required');
    if (!EMAIL_RE.test(form.email)) errs.email = t('auth.errors.email');
    if (form.password.length < 8) errs.password = t('auth.errors.password');
    if (!form.terms) errs.terms = t('auth.errors.terms');
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await register(form);
    setBusy(false);
    closeAuth();
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="auth-grid">
        <Field label={t('auth.firstName')} error={errors.firstName}>
          <input value={form.firstName} onChange={set('firstName')} autoComplete="given-name" autoFocus />
        </Field>
        <Field label={t('auth.lastName')} error={errors.lastName}>
          <input value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
        </Field>
      </div>
      <div className="auth-grid">
        <Field label={t('auth.email')} error={errors.email}>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field label={t('auth.phone')}>
          <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+355 6x xxx xxxx" />
        </Field>
      </div>
      <Field
        label={t('auth.password')}
        error={errors.password}
        hint={
          <span className="auth-meter" data-score={score} aria-live="polite">
            <span className="auth-meter__bars"><i /><i /><i /><i /></span>
            <span className="auth-meter__label">{form.password ? t('auth.strength')[score] : t('auth.passwordHint')}</span>
          </span>
        }
      >
        <PasswordInput value={form.password} onChange={set('password')} autoComplete="new-password" t={t} />
      </Field>

      <fieldset className="auth-interests">
        <legend>{t('auth.interests')}</legend>
        {Object.values(SITES).map((s) => (
          <button
            key={s.id}
            type="button"
            className={`auth-chip auth-chip--${s.id} ${form.interests.includes(s.id) ? 'is-on' : ''}`}
            aria-pressed={form.interests.includes(s.id)}
            onClick={() => toggleInterest(s.id)}
          >
            {t(`sites.${s.id}.name`)}
          </button>
        ))}
      </fieldset>

      <label className={`auth-check ${errors.terms ? 'has-error' : ''}`}>
        <input type="checkbox" checked={form.terms} onChange={set('terms')} />
        <span>{t('auth.terms')}</span>
      </label>
      {errors.terms && <span className="auth-field__error" role="alert">{errors.terms}</span>}
      <label className="auth-check">
        <input type="checkbox" checked={form.newsletter} onChange={set('newsletter')} />
        <span>{t('auth.newsletter')}</span>
      </label>

      <button type="submit" className="auth-submit" disabled={busy}>
        {busy ? <span className="auth-spinner" aria-hidden="true" /> : t('auth.submitRegister')}
      </button>
      <p className="auth-switch">
        {t('auth.haveAccount')} <button type="button" className="auth-link" onClick={() => setMode('login')}>{t('auth.login')}</button>
      </p>
    </form>
  );
}

function ResetForm({ t }) {
  const { requestReset, setMode } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setError(t('auth.errors.email'));
    setError('');
    setBusy(true);
    await requestReset(email);
    setBusy(false);
    setSent(true);
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <h3 className="auth-form__title">{t('auth.resetTitle')}</h3>
      <p className="auth-form__text">{t('auth.resetText')}</p>
      {sent ? (
        <p className="auth-success" role="status">{t('auth.sent')}</p>
      ) : (
        <>
          <Field label={t('auth.email')} error={error}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" autoFocus />
          </Field>
          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? <span className="auth-spinner" aria-hidden="true" /> : t('auth.sendLink')}
          </button>
        </>
      )}
      <p className="auth-switch">
        <button type="button" className="auth-link" onClick={() => setMode('login')}>← {t('auth.back')}</button>
      </p>
    </form>
  );
}

export default function AuthModal() {
  const { modal, closeAuth, setMode } = useAuth();
  const { t } = useI18n();
  const open = modal !== null;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeAuth();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeAuth]);

  if (!open) return null;
  const isTabs = modal === 'login' || modal === 'register';

  return (
    <div className="auth-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeAuth()}>
      <div className="auth" role="dialog" aria-modal="true" aria-label={t(`auth.${modal === 'reset' ? 'resetTitle' : modal}`)}>
        <aside className="auth__visual" aria-hidden="true">
          <div className="auth__half auth__half--watches" style={{ backgroundImage: `url(${SITES.watches.images.tile})` }}>
            <span>Select Watches</span>
          </div>
          <div className="auth__half auth__half--beauty" style={{ backgroundImage: `url(${SITES.beauty.images.story})` }}>
            <span>Beauty Point</span>
          </div>
          <span className="auth__amp"><span>&amp;</span></span>
          <div className="auth__perks">
            <p className="auth__perks-title">{t('auth.welcome')}</p>
            <ul>{t('auth.perks').map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </aside>

        <div className="auth__panel">
          <button className="icon-btn auth__close" onClick={closeAuth} aria-label={t('season.dismiss')}><CloseIcon /></button>
          <img src="/logos/select-group.svg" alt="Select Group" className="auth__logo" />

          {isTabs && (
            <>
              <p className="auth__intro">{t('auth.welcomeText')}</p>
              <div className="auth-tabs" role="tablist" data-active={modal}>
                <button role="tab" aria-selected={modal === 'login'} onClick={() => setMode('login')}>{t('auth.login')}</button>
                <button role="tab" aria-selected={modal === 'register'} onClick={() => setMode('register')}>{t('auth.register')}</button>
                <span className="auth-tabs__indicator" aria-hidden="true" />
              </div>
            </>
          )}

          {modal === 'login' && <LoginForm t={t} />}
          {modal === 'register' && <RegisterForm t={t} />}
          {modal === 'reset' && <ResetForm t={t} />}

          {isTabs && (
            <p className="auth__legal">
              <Link to="/about" onClick={closeAuth}>{t('footer.terms')}</Link> · <Link to="/about" onClick={closeAuth}>{t('footer.privacy')}</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
