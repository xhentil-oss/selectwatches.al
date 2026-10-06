import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useSite } from '../../hooks/useSite';

export default function Layout() {
  const site = useSite();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // The theme class swaps the color tokens: neutral for the portal, one palette per store.
  return (
    <div className={`app ${site ? site.theme : 'theme-group'}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
