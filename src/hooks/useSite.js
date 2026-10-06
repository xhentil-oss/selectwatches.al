import { useLocation } from 'react-router-dom';
import { getSite } from '../data/sites';

// Current store derived from the URL: /watches/... or /beauty/... ; null on the shared portal pages.
export function useSite() {
  const { pathname } = useLocation();
  const first = pathname.split('/')[1];
  return getSite(first);
}

export const formatPrice = (value) => `${value.toLocaleString('sq-AL')} L`;
