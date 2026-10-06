// Catalogue. The first four products (with photos and prices) come from selectgroup.al;
// the rest are samples. In production this comes from the WooCommerce API (see src/services/api.js).
// gender: 'men' | 'women' | 'unisex'. Prices in ALL (Lek). salePrice is optional.
export const PRODUCTS = [
  {
    id: 1, slug: 'rosefield-heirloom-emerald', site: 'watches', brand: 'rosefield', category: 'watches',
    gender: 'women', price: 15900, salePrice: 10900, isNew: true, seasonOffer: true, stock: 6,
    name: 'Rosefield Watch – Heirloom Emerald',
    image: '/images/products/rosefield-heirloom-emerald.webp',
    description: {
      sq: 'Orë elegante me fytyrë smeraldi dhe rrip çeliku të artë. Mekanizëm kuarci, rezistente ndaj ujit 3 ATM.',
      en: 'Elegant watch with an emerald dial and gold steel bracelet. Quartz movement, water resistant to 3 ATM.',
      it: 'Orologio elegante con quadrante smeraldo e bracciale in acciaio dorato. Movimento al quarzo, impermeabile 3 ATM.',
    },
    details: { Material: 'Stainless steel', Movement: 'Quartz', 'Water resistance': '3 ATM' },
  },
  {
    id: 2, slug: 'rosefield-the-ace-xs', site: 'watches', brand: 'rosefield', category: 'watches',
    gender: 'women', price: 14600, isNew: true, stock: 4,
    name: 'Rosefield The Ace XS Silver Sunray Steel Silver Rose Gold Duotone',
    image: '/images/products/rosefield-the-ace-xs.webp',
    description: {
      sq: 'Fytyrë argjendi sunray dhe rrip duotone argjend / ar rozë. Delikate dhe moderne.',
      en: 'Silver sunray dial with a silver / rose gold duotone bracelet. Delicate and modern.',
      it: 'Quadrante argento sunray con bracciale bicolore argento / oro rosa. Delicato e moderno.',
    },
    details: { Material: 'Stainless steel', Movement: 'Quartz', 'Water resistance': '3 ATM' },
  },
  {
    id: 3, slug: 'rosefield-octagon-ocwsg-o40', site: 'watches', brand: 'rosefield', category: 'watches',
    gender: 'women', price: 14600, isNew: true, stock: 5,
    name: 'Rosefield OCWSG-O40 The Octagon Ladies 23mm 3ATM',
    image: '/images/products/rosefield-octagon.webp',
    description: {
      sq: 'Kasë tetëkëndëshe 23 mm, fytyrë e bardhë dhe rrip çeliku të artë.',
      en: '23 mm octagon case, white dial and gold steel bracelet.',
      it: 'Cassa ottagonale da 23 mm, quadrante bianco e bracciale in acciaio dorato.',
    },
    details: { 'Ø': '23 mm', Material: 'Stainless steel', Movement: 'Quartz', 'Water resistance': '3 ATM' },
  },
  {
    id: 4, slug: 'armani-stronger-with-you-tobacco', site: 'beauty', brand: 'giorgio-armani', category: 'perfume',
    gender: 'men', price: 14900, salePrice: 11900, isNew: true, seasonOffer: true, stock: 8,
    name: 'Emporio Armani Stronger With You Tobacco',
    image: '/images/products/armani-stronger-with-you-tobacco.webp',
    description: {
      sq: 'Aromë e ngrohtë me nota duhani, vanilje dhe erëza. Për burrin që lë gjurmë.',
      en: 'A warm fragrance with tobacco, vanilla and spice notes. For the man who leaves an impression.',
      it: 'Una fragranza calda con note di tabacco, vaniglia e spezie. Per l’uomo che lascia il segno.',
    },
    details: { Size: '100 ml', Type: 'Eau de Parfum', Notes: 'Tobacco, vanilla, spices' },
  },
  // ---- Sample products (replace with real ones) ----
  {
    id: 5, slug: 'tissot-le-locle', site: 'watches', brand: 'tissot', category: 'watches',
    gender: 'men', price: 69900, salePrice: 59900, seasonOffer: true, stock: 2,
    name: 'Tissot Le Locle Powermatic 80', image: '',
    description: {
      sq: 'Orë automatike klasike me numra romakë dhe rrip lëkure.',
      en: 'Classic automatic watch with Roman numerals and leather strap.',
      it: 'Orologio automatico classico con numeri romani e cinturino in pelle.',
    },
    details: { 'Ø': '39 mm', Movement: 'Automatic', 'Water resistance': '3 ATM' },
  },
  {
    id: 6, slug: 'g-shock-gba-900', site: 'watches', brand: 'g-shock', category: 'watches',
    gender: 'unisex', price: 17900, isNew: true, stock: 7,
    name: 'G-Shock GBA-900 White', image: '',
    description: {
      sq: 'Orë sportive me Bluetooth, numërues hapash dhe rezistencë ndaj goditjeve.',
      en: 'Sports watch with Bluetooth, step tracker and shock resistance.',
      it: 'Orologio sportivo con Bluetooth, contapassi e resistenza agli urti.',
    },
    details: { Movement: 'Digital / analog', 'Water resistance': '20 ATM' },
  },
  {
    id: 7, slug: 'daniel-wellington-classic', site: 'watches', brand: 'daniel-wellington', category: 'watches',
    gender: 'men', price: 16900, stock: 5,
    name: 'Daniel Wellington Classic Sheffield', image: '',
    description: {
      sq: 'Minimalizëm skandinav – një orë që shkon me çdo veshje.',
      en: 'Scandinavian minimalism – a watch that goes with everything.',
      it: 'Minimalismo scandinavo – un orologio che si abbina a tutto.',
    },
    details: { 'Ø': '40 mm', Movement: 'Quartz', 'Water resistance': '3 ATM' },
  },
  {
    id: 8, slug: 'boss-bottled-edp', site: 'beauty', brand: 'hugo-boss', category: 'perfume',
    gender: 'men', price: 11900, isNew: true, stock: 9,
    name: 'Boss Bottled Eau de Parfum', image: '',
    description: {
      sq: 'Mollë, kanellë dhe dru sandali – aroma klasike e burrit modern.',
      en: 'Apple, cinnamon and sandalwood – the classic scent of the modern man.',
      it: 'Mela, cannella e legno di sandalo – la fragranza classica dell’uomo moderno.',
    },
    details: { Size: '100 ml', Type: 'Eau de Parfum' },
  },
  {
    id: 9, slug: 'jpg-divine', site: 'beauty', brand: 'jean-paul-gaultier', category: 'perfume',
    gender: 'women', price: 15500, salePrice: 12900, seasonOffer: true, isNew: true, stock: 6,
    name: 'Jean Paul Gaultier Divine EDP', image: '',
    description: {
      sq: 'Lule të bardha, nota detare dhe krem i ëmbël – shkëlqim i artë.',
      en: 'White flowers, sea notes and a sweet cream accord – golden radiance.',
      it: 'Fiori bianchi, note marine e un accordo cremoso – luce dorata.',
    },
    details: { Size: '100 ml', Type: 'Eau de Parfum' },
  },
  {
    id: 10, slug: 'dg-light-blue', site: 'beauty', brand: 'dolce-gabbana', category: 'perfume',
    gender: 'women', price: 10900, isNew: true, stock: 10,
    name: 'Dolce & Gabbana Light Blue EDT', image: '',
    description: {
      sq: 'Limon sicilian, mollë dhe kedër – freski mesdhetare.',
      en: 'Sicilian lemon, apple and cedar – Mediterranean freshness.',
      it: 'Limone di Sicilia, mela e cedro – freschezza mediterranea.',
    },
    details: { Size: '100 ml', Type: 'Eau de Toilette' },
  },
  {
    id: 11, slug: 'guess-seductive', site: 'beauty', brand: 'guess', category: 'perfume',
    gender: 'unisex', price: 6900, stock: 0,
    name: 'Guess Seductive EDT', image: '',
    description: {
      sq: 'Aromë e lehtë dhe joshëse për çdo ditë.',
      en: 'A light, seductive everyday fragrance.',
      it: 'Una fragranza leggera e seducente per ogni giorno.',
    },
    details: { Size: '75 ml', Type: 'Eau de Toilette' },
  },
];

export const productsFor = (siteId) => PRODUCTS.filter((p) => p.site === siteId);

export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug) ?? null;

export const finalPrice = (p) => p.salePrice ?? p.price;
