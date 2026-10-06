// Logos come from selectgroup.al (black on transparent). Brands without a logo show their name.
// A brand can belong to both stores (e.g. Hugo Boss sells watches and fragrances).
export const BRANDS = [
  { slug: 'tissot', name: 'Tissot', sites: ['watches'], logo: '/images/brands/tissot.webp' },
  { slug: 'g-shock', name: 'G-Shock', sites: ['watches'], logo: '/images/brands/g-shock.webp' },
  { slug: 'daniel-wellington', name: 'Daniel Wellington', sites: ['watches'], logo: '/images/brands/daniel-wellington.webp' },
  { slug: 'festina', name: 'Festina', sites: ['watches'], logo: '/images/brands/festina.webp' },
  { slug: 'rosefield', name: 'Rosefield', sites: ['watches'] },
  { slug: 'guess', name: 'Guess', sites: ['watches', 'beauty'], logo: '/images/brands/guess.webp' },
  { slug: 'hugo-boss', name: 'Hugo Boss', sites: ['watches', 'beauty'], logo: '/images/brands/hugo-boss.webp' },
  { slug: 'dolce-gabbana', name: 'Dolce & Gabbana', sites: ['beauty'], logo: '/images/brands/dolce-gabbana.webp' },
  { slug: 'jean-paul-gaultier', name: 'Jean Paul Gaultier', sites: ['beauty'], logo: '/images/brands/jean-paul-gaultier.webp' },
  { slug: 'giorgio-armani', name: 'Giorgio Armani', sites: ['beauty'] },
];

export const brandsFor = (siteId) => BRANDS.filter((b) => b.sites.includes(siteId));

export const findBrand = (slug) => BRANDS.find((b) => b.slug === slug) ?? null;

export const brandName = (slug) => findBrand(slug)?.name ?? slug;
