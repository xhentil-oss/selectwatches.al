import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Demo authentication: the account is kept in the browser only.
// To go live, replace the bodies of login / register / requestReset with calls to the
// backend (e.g. WooCommerce REST + JWT) – the UI does not need to change.
const AuthContext = createContext(null);
const KEY = 'sg-user';

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [modal, setModal] = useState(null); // null | 'login' | 'register' | 'reset'

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const login = useCallback(async ({ email }) => {
    await wait(600);
    setUser({ email, firstName: email.split('@')[0] });
  }, []);

  const register = useCallback(async ({ firstName, lastName, email, phone, interests, newsletter }) => {
    await wait(700);
    setUser({ firstName, lastName, email, phone, interests, newsletter });
  }, []);

  const requestReset = useCallback(async () => {
    await wait(600);
  }, []);

  const value = useMemo(() => ({
    user,
    modal,
    openAuth: (mode = 'login') => setModal(mode),
    closeAuth: () => setModal(null),
    setMode: setModal,
    login,
    register,
    requestReset,
    logout: () => setUser(null),
  }), [user, modal, login, register, requestReset]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
