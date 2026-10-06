import { Link } from 'react-router-dom';
import { postsFor, postUrl } from '../../data/posts';
import { useI18n } from '../../i18n/I18nContext';

// "Latest News": dark rounded cards with photo, title, excerpt and outlined "Read more".
export default function NewsGrid({ siteId, posts: given, title }) {
  const { t, tr } = useI18n();
  const posts = given ?? postsFor(siteId);

  return (
    <section className="section section--dark">
      <div className="container">
        <h2 className="section__title section__title--center">{title ?? t('news.title')}</h2>
        {!title && <p className="section__subtitle">{t('news.subtitle')}</p>}
        <div className="news-grid">
          {posts.map((post) => (
            <article key={post.id} className="news-card">
              <Link to={postUrl(post)} className="news-card__img" style={{ backgroundImage: `url(${post.image})` }} aria-hidden="true" tabIndex={-1} />
              <div className="news-card__body">
                <h3><Link to={postUrl(post)}>{tr(post.title)}</Link></h3>
                <p>{tr(post.excerpt)}</p>
                <Link to={postUrl(post)} className="btn btn--outline btn--sm">{t('news.readMore')}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
