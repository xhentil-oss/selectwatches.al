import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';

// "For Him" / "For Her" photo tiles, as on selectgroup.al.
export default function GenderTiles({ site }) {
  const { t } = useI18n();
  const tiles = [
    { gender: 'men', label: t('home.forHim'), image: site.images.men },
    { gender: 'women', label: t('home.forHer'), image: site.images.women },
  ];

  return (
    <section className="tiles">
      {tiles.map((tile) => (
        <Link key={tile.gender} to={`${site.path}/shop?gender=${tile.gender}`} className="tile">
          <div className="tile__img" style={{ backgroundImage: `url(${tile.image})` }} />
          <div className="tile__overlay" />
          <div className="tile__content">
            <h2>{tile.label}</h2>
            <span className="btn btn--outline">{t('nav.shop')}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
