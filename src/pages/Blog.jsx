import { Link, useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { SITES } from '../data/sites';
import { POSTS, postUrl } from '../data/posts';

// "/blog" – all articles, filterable by store (?site=watches | beauty).
export default function Blog() {
  const { t, tr } = useI18n();
  const [params, setParams] = useSearchParams();
  const active = params.get('site');
  const posts = active ? POSTS.filter((p) => p.site === active) : POSTS;

  const filters = [{ id: null, label: t('blog.all') }, ...Object.values(SITES).map((s) => ({ id: s.id, label: t(`sites.${s.id}.name`) }))];

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <span className="eyebrow">Select Group</span>
          <h1>{t('nav.blog')}</h1>
          <p>{t('news.subtitle')}</p>
          <div className="blog-filters" role="tablist">
            {filters.map((f) => (
              <button
                key={f.id ?? 'all'}
                role="tab"
                aria-selected={active === f.id}
                className={`blog-filters__btn ${active === f.id ? 'is-active' : ''} ${f.id ? `blog-filters__btn--${f.id}` : ''}`}
                onClick={() => setParams(f.id ? { site: f.id } : {})}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container section">
        <div className="blog-grid">
          {posts.map((post, i) => (
            <article key={post.id} className={`blog-card ${i === 0 && !active ? 'blog-card--featured' : ''}`}>
              <Link to={postUrl(post)} className="blog-card__img" style={{ backgroundImage: `url(${post.image})` }} aria-hidden="true" tabIndex={-1} />
              <div className="blog-card__body">
                <span className={`blog-card__site blog-card__site--${post.site}`}>{t(`sites.${post.site}.name`)}</span>
                <h2><Link to={postUrl(post)}>{tr(post.title)}</Link></h2>
                <p>{tr(post.excerpt)}</p>
                <Link to={postUrl(post)} className="link-underline">{t('news.readMore')} →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
