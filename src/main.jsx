import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { I18nProvider } from './i18n/I18nContext';
import { CartProvider } from './context/CartContext';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);
