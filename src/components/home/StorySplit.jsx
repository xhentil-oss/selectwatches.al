import { Link } from 'react-router-dom';

// Half photo, half light-grey text panel ("Time is the most valuable luxury").
export default function StorySplit({ image, eyebrow, title, text, cta, to, reverse = false }) {
  return (
    <section className={`story ${reverse ? 'story--reverse' : ''}`}>
      <div className="story__img" style={{ backgroundImage: `url(${image})` }} />
      <div className="story__panel">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{text}</p>
        <Link to={to} className="btn btn--dark-outline">{cta}</Link>
      </div>
    </section>
  );
}
