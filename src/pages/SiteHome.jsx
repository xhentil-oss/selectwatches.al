import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import GenderTiles from '../components/home/GenderTiles';
import LatestProducts from '../components/home/LatestProducts';
import StorySplit from '../components/home/StorySplit';
import GiftIdeas from '../components/home/GiftIdeas';
import SeasonOffers from '../components/home/SeasonOffers';
import BrandMarquee from '../components/home/BrandMarquee';
import NewsGrid from '../components/home/NewsGrid';
import { useI18n } from '../i18n/I18nContext';
import { productsFor } from '../data/products';

// "/watches" and "/beauty" – the home page of one store, same building blocks as the portal.
export default function SiteHome({ site }) {
  const { t } = useI18n();
  const products = productsFor(site.id);
  const story = site.id === 'watches' ? 'watches' : 'beauty';

  return (
    <>
      <Hero image={site.images.hero} title={t(`sites.${site.id}.name`)} text={t(`sites.${site.id}.tagline`)}>
        <Link to={`${site.path}/shop`} className="btn btn--outline">{t(`sites.${site.id}.cta`)}</Link>
        <Link to={`${site.path}/shop?offer=1`} className="btn btn--outline">{t('nav.seasonOffers')}</Link>
      </Hero>

      <GenderTiles site={site} />

      <LatestProducts
        title={t(`latest.${story}`)}
        products={products.filter((p) => p.isNew).slice(0, 4)}
        viewAllTo={`${site.path}/shop`}
      />

      <StorySplit
        image={site.images.story}
        title={t(`story.${story}Title`)}
        text={t(`story.${story}Text`)}
        cta={t('nav.shop')}
        to={`${site.path}/shop`}
      />

      <GiftIdeas site={site} />
      <SeasonOffers products={products} image={site.images.season} shopPath={`${site.path}/shop`} />
      <BrandMarquee siteId={site.id} />
      <NewsGrid siteId={site.id} />
    </>
  );
}
