// Centered brand statement over the selectgroup.al video.
export default function Statement({ video, poster, text }) {
  return (
    <section className="statement">
      <video className="statement__video" autoPlay muted loop playsInline poster={poster}>
        <source src={video} type="video/mp4" />
      </video>
      <div className="statement__shade" />
      <blockquote className="container statement__text">{text}</blockquote>
    </section>
  );
}
