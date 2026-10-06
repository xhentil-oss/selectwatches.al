import SplitHero from '../components/home/SplitHero';
import Statement from '../components/home/Statement';
import LatestProducts from '../components/home/LatestProducts';
import StorySplit from '../components/home/StorySplit';
import GiftIdeas from '../components/home/GiftIdeas';
import SeasonOffers from '../components/home/SeasonOffers';
import BrandMarquee from '../components/home/BrandMarquee';
import NewsGrid from '../components/home/NewsGrid';
import { useI18n } from '../i18n/I18nContext';
import { HERO_VIDEO, SITES } from '../data/sites';
import { PRODUCTS, productsFor } from '../data/products';

// "/" – the Select Group home. Same flow as selectgroup.al today, but every block
// now leads clearly into one of the two stores.
export default function Portal() {
  const { t } = useI18n();
  const { watches, beauty } = SITES;

  return (
    <>
      <SplitHero />
      <Statement video={HERO_VIDEO} poster={watches.images.hero} text={t('hero.text')} />

      <LatestProducts
        title={t('latest.watches')}
        products={productsFor('watches').filter((p) => p.isNew).slice(0, 4)}
        viewAllTo={`${watches.path}/shop`}
      />

      <StorySplit
        image={watches.images.story}
        eyebrow={t('sites.watches.name')}
        title={t('story.watchesTitle')}
        text={t('story.watchesText')}
        cta={t('sites.watches.cta')}
        to={watches.path}
      />

      <StorySplit
        reverse
        image={beauty.images.story}
        eyebrow={t('sites.beauty.name')}
        title={t('story.beautyTitle')}
        text={t('story.beautyText')}
        cta={t('sites.beauty.cta')}
        to={beauty.path}
      />

      <LatestProducts
        title={t('latest.beauty')}
        products={productsFor('beauty').filter((p) => p.isNew).slice(0, 4)}
        viewAllTo={`${beauty.path}/shop`}
      />

      <GiftIdeas />
      <SeasonOffers products={PRODUCTS} image="/images/hero/for-her.webp" shopPath={`${watches.path}/shop`} />
      <BrandMarquee />
      <NewsGrid />
    </>
  );
}
