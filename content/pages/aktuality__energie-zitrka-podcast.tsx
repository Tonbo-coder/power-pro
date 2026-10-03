import article from "@/content/articles/energie-zitrka-podcast.json";

export default function Content() {
  return (
    <article className="news-article" aria-labelledby="news-article-title">
      <div className="layout-row-container">
        <nav className="news-article-breadcrumbs" aria-label="Drobečková navigace">
          <a href="/">Úvod</a><span aria-hidden="true">/</span><a href="/aktuality">Aktuality</a>
        </nav>
        <header className="news-article-heading podcast-article-heading">
          <h1 id="news-article-title">{article.title}</h1>
        </header>
        <div className="news-article-copy">
          {article.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "news-article-lead" : undefined}>{paragraph}</p>
          ))}
          <section className="podcast-article-player" aria-labelledby="podcast-player-title">
            <h2 id="podcast-player-title">Poslechněte si Energie zítřka</h2>
            <iframe
              src={article.spotify.embedUrl}
              title={article.spotify.title}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            <p><a href={article.spotify.url} target="_blank" rel="noopener noreferrer">Otevřít na Spotify</a></p>
          </section>
          <a className="button button-primary button-rounded news-article-back" href="/aktuality">Zpět na aktuality</a>
        </div>
      </div>
    </article>
  );
}
