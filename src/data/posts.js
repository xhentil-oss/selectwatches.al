// Blog posts migrated from selectgroup.al. Full bodies live in postBodies.js (keyed by slug).
import { POST_BODIES } from './postBodies';

export const POSTS = [
  {
    id: 1, slug: 'how-to-care-for-your-watch', site: 'watches', image: '/images/blog/watch-care.png',
    title: { sq: 'Si të kujdeseni për orën tuaj', en: 'How to Care for Your Watch', it: 'Come prendersi cura del proprio orologio' },
    excerpt: {
      sq: 'Orët janë më shumë se instrumente kohe; janë shprehje stili dhe shënues momentesh…',
      en: 'Watches are more than just timepieces; they’re expressions of style, markers of milestones…',
      it: 'Gli orologi sono più che segnatempo; sono espressioni di stile e testimoni di traguardi…',
    },
  },
  {
    id: 2, slug: 'perfume-etiquette-how-much-is-too-much', site: 'beauty', image: '/images/blog/perfume-etiquette.png',
    title: { sq: 'Etika e parfumit: sa është shumë?', en: 'Perfume Etiquette: How Much Is Too Much?', it: 'Galateo del profumo: quanto è troppo?' },
    excerpt: {
      sq: 'Parfumi ka qenë gjithmonë simbol elegance, individualiteti dhe shprehjeje personale…',
      en: 'Perfume has long been a symbol of elegance, individuality, and personal expression…',
      it: 'Il profumo è da sempre simbolo di eleganza, individualità ed espressione personale…',
    },
  },
  {
    id: 3, slug: 'how-to-apply-and-store-perfume-to-last-longer', site: 'beauty', image: '/images/blog/store-perfume.png',
    title: { sq: 'Si ta aplikoni dhe ruani parfumin që të zgjasë', en: 'How to Apply and Store Perfume to Last Longer', it: 'Come applicare e conservare il profumo più a lungo' },
    excerpt: {
      sq: 'Parfumi është një aksesor i përjetshëm që shton sharm dhe vetëbesim…',
      en: 'Perfume has been a timeless accessory, adding charm, confidence, and an unforgettable impression…',
      it: 'Il profumo è un accessorio senza tempo che aggiunge fascino e sicurezza…',
    },
  },
  {
    id: 4, slug: 'how-to-choose-the-right-watch-for-your-style', site: 'watches', image: '/images/blog/choose-watch.webp',
    title: { sq: 'Si të zgjidhni orën e duhur për stilin tuaj', en: 'How to Choose the Right Watch for Your Style', it: 'Come scegliere l’orologio giusto per il tuo stile' },
    excerpt: {
      sq: 'Një orë është më shumë se një mjet për të parë kohën – është një deklaratë…',
      en: 'A watch is more than just a tool to tell time – it’s a statement piece…',
      it: 'Un orologio è più di uno strumento per leggere l’ora – è un pezzo che parla di te…',
    },
  },
];

export const postsFor = (siteId) => (siteId ? POSTS.filter((p) => p.site === siteId) : POSTS);

export const findPost = (slug) => POSTS.find((p) => p.slug === slug) ?? null;

// Bodies are stored per language; falls back to English (the original) when a translation is missing.
export function postBody(slug, lang) {
  const body = POST_BODIES[slug];
  if (!body) return { blocks: [], lang: null };
  if (Array.isArray(body)) return { blocks: body, lang: 'en' };
  return body[lang] ? { blocks: body[lang], lang } : { blocks: body.en ?? [], lang: 'en' };
}

export const postUrl = (post) => `/blog/${post.slug}`;
