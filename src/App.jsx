import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Portal from './pages/Portal';
import SiteHome from './pages/SiteHome';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Brands from './pages/Brands';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { SITES } from './data/sites';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Portal />} />

        {Object.values(SITES).map((site) => (
          <Route key={site.id} path={site.path}>
            <Route index element={<SiteHome site={site} />} />
            <Route path="shop" element={<Shop site={site} />} />
            <Route path="product/:slug" element={<ProductDetail site={site} />} />
          </Route>
        ))}

        <Route path="brands" element={<Brands />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
