// Full-height hero like selectgroup.al: background video (or image), dark overlay, text bottom-left.
export default function Hero({ video, image, title, text, children }) {
  return (
    <section className="hero">
      {video ? (
        <video className="hero__media" autoPlay muted loop playsInline poster={image}>
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <div className="hero__media" style={{ backgroundImage: `url(${image})` }} />
      )}
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children && <div className="hero__actions">{children}</div>}
      </div>
    </section>
  );
}
