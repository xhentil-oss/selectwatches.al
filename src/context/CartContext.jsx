import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { finalPrice } from '../data/products';

const CartContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((i) => i.id === action.product.id);
      if (existing) {
        return items.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + action.qty } : i));
      }
      const { id, slug, name, brand, site, image } = action.product;
      return [...items, { id, slug, name, brand, site, image, price: finalPrice(action.product), qty: action.qty }];
    }
    case 'setQty':
      return items
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items, count, subtotal, isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (product, qty = 1) => {
        dispatch({ type: 'add', product, qty });
        setOpen(true);
      },
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
