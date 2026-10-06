import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import NewsGrid from '../components/home/NewsGrid';
import { useI18n } from '../i18n/I18nContext';
import { SITES } from '../data/sites';
import { POSTS, findPost, postBody } from '../data/posts';

function Block({ block }) {
  switch (block.t) {
    case 'h2':
    case 'h3':
      return <h2>{block.x}</h2>;
    case 'h4':
      return <h3>{block.x}</h3>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => {
            // "Label: text" items get a bold label, as in the original articles.
            const idx = item.indexOf(': ');
            return idx > 0 && idx < 60
              ? <li key={i}><strong>{item.slice(0, idx)}:</strong> {item.slice(idx + 2)}</li>
              : <li key={i}>{item}</li>;
          })}
        </ul>
      );
    default:
      return <p>{block.x}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t, tr, lang } = useI18n();
  const post = findPost(slug);
  if (!post) return <NotFound />;

  const site = SITES[post.site];
  const { blocks, lang: bodyLang } = postBody(post.slug, lang);
  const [intro, ...rest] = blocks;
  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <header className="post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="post-hero__shade" />
        <div className="container post-hero__content">
          <nav className="breadcrumb breadcrumb--light">
            <Link to="/">Select Group</Link> / <Link to="/blog">{t('nav.blog')}</Link> / <span>{t(`sites.${post.site}.name`)}</span>
          </nav>
          <Link to={`/blog?site=${post.site}`} className={`blog-card__site blog-card__site--${post.site}`}>{t(`sites.${post.site}.name`)}</Link>
          <h1>{tr(post.title)}</h1>
        </div>
      </header>

      <article className="container post">
        {bodyLang !== lang && <p className="post__note">{t('blog.originalLanguage')}</p>}
        {intro && <p className="post__lead">{intro.x}</p>}
        {rest.map((block, i) => <Block key={i} block={block} />)}

        <aside className={`post__cta ${site.theme}`}>
          <div>
            <span className="eyebrow">{t(`sites.${site.id}.name`)}</span>
            <h3>{t(`sites.${site.id}.tagline`)}</h3>
          </div>
          <Link to={`${site.path}/shop`} className="btn">{t(`sites.${site.id}.cta`)} →</Link>
        </aside>
      </article>

      <NewsGrid posts={related} title={t('blog.more')} />
    </>
  );
}
