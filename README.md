# Select Group – Select Watches & Beauty Point

Faqja e re multi-site e Select Group, në React (Vite).

## Si ta nisësh

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # versioni për publikim në dist/
```

## Faqet (routes)

| URL | Faqja |
|-----|-------|
| `/` | Faqja e përbashkët: ndarja Select Watches / Beauty Point |
| `/watches`, `/beauty` | Faqja kryesore e secilit dyqan |
| `/watches/shop`, `/beauty/shop` | Dyqani me filtra (`?gender=men&brand=dior&max=15000&offer=1&sort=asc`) |
| `/watches/product/:slug` | Faqja e produktit |
| `/brands` | Markat tona |
| `/blog`, `/blog/:slug` | Blogu (filtër `?site=watches` / `beauty`) dhe artikulli |
| `/about`, `/contact`, `/cart` | Rreth nesh, kontakt, shporta |

## Struktura e dosjeve

## Dizajni

I bazuar te selectgroup.al: header dhe footer i errët (#1B1B1B), panele gri (#F3F3F3), tituj me **Playfair Display**,
tekst me **Merriweather Sans 300**, menu me **Murecho**, butona me kornizë 1px dhe qoshe 8px, karta lajmesh me qoshe 20px.
Faqja kryesore ndjek të njëjtën rrjedhë si sot (video hero → pllaka me foto → produkte → seksionet "Time is the most valuable
luxury" / "Perfume speaks the language of memories" → oferta → markat → lajmet), por çdo bllok të çon te njëri nga dy dyqanet.
Të dy dyqanet kanë të njëjtën bazë; ndryshon vetëm ngjyra e theksit: **Select Watches = argjend**, **Beauty Point = ar shampanjë** (`src/styles/themes.css`).

## Struktura e dosjeve

```
public/
  logos/            select-watches-white.webp (nga faqja), beauty-point.svg, select-group.svg (të përkohshme – zëvendësoji me logot reale)
  video/hero.mp4    videoja e hero-s nga faqja aktuale
  images/hero/      fotot e mëdha (for-him, for-her, watches-story, beauty-story)
  images/brands/    logot e markave (Tissot, G-Shock, DW, Festina, Guess, Boss, D&G, JPG)
  images/products/  fotot e produkteve
  images/blog/      fotot e artikujve
src/
  main.jsx, App.jsx  hyrja dhe routes
  i18n/             sq.js, it.js, en.js + I18nContext (gjuha ruhet në browser)
  context/          CartContext (shporta, ruhet në browser)
  data/             sites.js (dy dyqanet, imazhet, kontakti), brands.js, products.js, posts.js + postBodies.js (blogu, artikujt e plotë)
  services/api.js   vendi ku lidhet API-ja reale (VITE_API_URL)
  hooks/useSite.js  cili dyqan është aktiv sipas URL-së, formatimi i çmimit
  components/
    layout/         Header, AnnouncementBar (slider info), SiteSwitcher, LanguageSwitcher, Footer, CartDrawer
    home/           Hero (video), SiteTiles (ndarja e dy dyqaneve), GenderTiles, StorySplit, LatestProducts,
                    GiftIdeas (3 slide), SeasonOffers (×), BrandMarquee, NewsGrid
    product/        ProductCard (shto në shportë pa hapur produktin), ProductGrid, ProductImage
    shop/           Filters (gjinia, kategoria, marka, çmimi, oferta)
    ui/             Slider, Icons
  pages/            Portal, SiteHome, Shop, ProductDetail, Brands, Blog, BlogPost, About, Contact, Cart, NotFound
  styles/           themes.css (ngjyrat dhe fontet), global.css
```

## Çfarë duhet plotësuar

- **Logot**: Beauty Point dhe Select Group kanë logo të përkohshme me tekst. Vendos logot reale (version i bardhë, header-i është i errët) te `public/logos/` dhe ndrysho `logo` te `src/data/sites.js` nëse ndryshon emri.
- **Produktet**: 4 të parat (foto + çmime) janë marrë nga selectgroup.al; të tjerat janë shembuj dhe shfaqin logon e markës derisa të shtohet foto. Lidh WooCommerce-in te `src/services/api.js`.
- **Kontakti & Instagram**: te `src/data/sites.js`.
- **Checkout**: butoni ekziston, procesi i pagesës duhet lidhur me backend-in.

Prompt-i për dizajnin UX/UI është te [PROMPT_CLAUDE.md](PROMPT_CLAUDE.md).
