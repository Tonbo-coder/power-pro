import Image from "next/image";
import article from "@/content/articles/noho-mereni-vetru.json";

export default function Content() {
  return (
    <article className="news-article" aria-labelledby="news-article-title">
      <div className="layout-row-container">
        <nav className="news-article-breadcrumbs" aria-label="Drobečková navigace">
          <a href="/">Úvod</a><span aria-hidden="true">/</span><a href="/aktuality">Aktuality</a>
        </nav>
        <header className="news-article-heading">
          <h1 id="news-article-title">{article.title}</h1>
        </header>
        <figure className="news-article-photo">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            sizes="(max-width: 1077px) calc(100vw - 30px), 1047px"
            loading="eager"
            fetchPriority="high"
          />
        </figure>
        <div className="news-article-copy">
          <p className="news-article-lead">
            {article.intro.beforePartner}<a href={article.intro.partnerUrl} target="_blank" rel="noopener noreferrer"><strong>{article.intro.partner}</strong></a>{article.intro.afterPartner}
          </p>
          {article.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <a className="button button-primary button-rounded news-article-back" href="/aktuality">Zpět na aktuality</a>
        </div>
      </div>
    </article>
  );
}
