// The two stores that live under Select Group. They share header, cart, language and footer;
// each one has its own logo, accent color, imagery, categories and brands.
export const SITES = {
  watches: {
    id: 'watches',
    path: '/watches',
    logo: '/logos/select-watches-white.webp',
    theme: 'theme-watches',
    categories: ['watches', 'straps', 'jewelry'],
    images: {
      hero: '/images/hero/watches-story.webp',
      tile: '/images/hero/for-him.webp',
      story: '/images/hero/watches-story.webp',
      men: '/images/hero/for-him.webp',
      women: '/images/products/rosefield-heirloom-emerald.webp',
      season: '/images/hero/for-her.webp',
    },
  },
  beauty: {
    id: 'beauty',
    path: '/beauty',
    logo: '/logos/beauty-point.svg',
    theme: 'theme-beauty',
    categories: ['perfume', 'skincare', 'makeup'],
    images: {
      hero: '/images/hero/beauty-story.webp',
      tile: '/images/hero/beauty-story.webp',
      story: '/images/hero/beauty-story.webp',
      men: '/images/blog/perfume-etiquette.png',
      women: '/images/blog/store-perfume.png',
      season: '/images/blog/store-perfume.png',
    },
  },
};

export const SITE_IDS = Object.keys(SITES);

export const getSite = (id) => SITES[id] ?? null;

export const HERO_VIDEO = '/video/hero.mp4';

// End of the current season campaign (drives the live countdown in "Ofertat e sezonit").
export const SEASON_END = '2026-10-31T23:59:59';

export const CONTACT = {
  phone: '069 40 48 906',
  phoneHref: 'tel:+355694048906',
  email: 'info@selectgroup.al',
  instagram: { watches: 'https://instagram.com/select_watches', beauty: 'https://instagram.com/beautypoint' },
  stores: [
    { name: 'Select Watches – TEG', hours: '10:00 – 22:00' },
    { name: 'Select Watches – QTU', hours: '09:00 – 21:00' },
  ],
};
