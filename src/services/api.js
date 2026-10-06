// Single place to swap sample data for a real backend (e.g. the WooCommerce REST API of selectgroup.al).
// Components call these functions instead of importing data files directly once the API is connected.
import { PRODUCTS, findProduct } from '../data/products';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(siteId) {
  if (!API_URL) return PRODUCTS.filter((p) => p.site === siteId);
  const res = await fetch(`${API_URL}/products?site=${siteId}`);
  if (!res.ok) throw new Error(`Products request failed: ${res.status}`);
  return res.json();
}

export async function fetchProduct(slug) {
  if (!API_URL) return findProduct(slug);
  const res = await fetch(`${API_URL}/products/${slug}`);
  if (!res.ok) throw new Error(`Product request failed: ${res.status}`);
  return res.json();
}
