import { findBrand } from '../../data/brands';

// Product photo; until a photo exists, shows the brand logo (or name) on light grey.
export default function ProductImage({ product, small = false }) {
  const cls = `product-image ${small ? 'product-image--small' : ''}`;
  if (product.image) {
    return (
      <div className={cls}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
    );
  }
  const brand = findBrand(product.brand);
  return (
    <div className={`${cls} product-image--placeholder`} aria-hidden="true">
      {brand?.logo ? <img src={brand.logo} alt="" /> : <span>{brand?.name ?? product.name}</span>}
    </div>
  );
}
