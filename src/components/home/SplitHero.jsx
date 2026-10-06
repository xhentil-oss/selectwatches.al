import { Link } from 'react-router-dom';
import { SITES } from '../../data/sites';
import { brandsFor } from '../../data/brands';
import { useI18n } from '../../i18n/I18nContext';

// Portal hero: the two businesses ARE the hero. The headline is split between them
// ("Elegant watches" | "Captivating fragrances"), a rotating Select Group seal sits on the seam,
// and hovering one side widens it and reveals its quick links.
export default function SplitHero() {
  const { t } = useI18n();
  const sides = [
    { site: SITES.watches, index: '01', word: t('hero.watchesWord'), image: SITES.watches.images.tile },
    { site: SITES.beauty, index: '02', word: t('hero.beautyWord'), image: SITES.beauty.images.story },
  ];
  const ring = `${t('hero.ring')} • `.repeat(2);

  return (
    <section className="split-hero">
      <div className="split-hero__brand">
        <span className="split-hero__brand-name">Select Group</span>
        <span className="split-hero__brand-sub">{t('hero.kicker')}</span>
      </div>

      {sides.map(({ site, index, word, image }) => (
        <div key={site.id} className={`split-hero__side split-hero__side--${site.id} ${site.theme}`}>
          <div className="split-hero__img" style={{ backgroundImage: `url(${image})` }} />
          <div className="split-hero__shade" />
          {/* Whole side is clickable; quick links sit above this cover. */}
          <Link to={site.path} className="split-hero__cover" aria-label={t(`sites.${site.id}.name`)} />

          <div className="split-hero__content">
            <span className="split-hero__index">{index}</span>
            {/* The store name is the headline, so each business reads at a glance. */}
            <h2 className="split-hero__name">{t(`sites.${site.id}.name`)}</h2>
            <p className="split-hero__word">{word}</p>
            <p className="split-hero__tagline">{site.categories.map((c) => t(`categories.${c}`)).join(' · ')}</p>

            <div className="split-hero__reveal">
              <div className="split-hero__reveal-inner">
                <div className="split-hero__chips">
                  <Link to={`${site.path}/shop?gender=men`}>{t('home.forHim')}</Link>
                  <Link to={`${site.path}/shop?gender=women`}>{t('home.forHer')}</Link>
                  <Link to={`${site.path}/shop?offer=1`}>{t('nav.seasonOffers')}</Link>
                  <Link to="/brands">{brandsFor(site.id).length} {t('hero.brands')}</Link>
                </div>
                <Link to={site.path} className="split-hero__cta">
                  {t(`sites.${site.id}.cta`)} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="split-hero__seal" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="split-hero__ring">
          <defs>
            <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text><textPath href="#seal-circle" textLength="488">{ring}</textPath></text>
        </svg>
        <span className="split-hero__amp">&amp;</span>
      </div>

      <span className="split-hero__scroll" aria-hidden="true">{t('hero.scroll')}</span>
    </section>
  );
}
