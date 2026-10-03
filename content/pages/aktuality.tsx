
import newsNoho from "@/content/articles/noho-mereni-vetru.json";
import newsPodcast from "@/content/articles/energie-zitrka-podcast.json";

/** Obsah stránky /aktuality. Upravujte přímo; původní export není za běhu používán. */
export default function Content() {
  return (
    <>
      {/* Aktuality */}
      <section
        id="aktuality-aktuality-section-1"
        className="section section-content-center"
      >
        <div className="layout-row-overlay"></div>
        <div className="layout-row-container">
          <div className="layout-row ui-align-center">
            <div
              className="layout-col-md-6 layout-col-sm-6 layout-col-xs-6  "
              id="aktuality-aktuality-grid-2"
            >
              <div id="aktuality-aktuality-column-3" className="layout-column ">
                <div className="layout-column-addons">
                  <div
                    id="aktuality-aktuality-wrap-4"
                    className="block-wrap  addon-root-heading"
                  >
                    <div
                      id="aktuality-aktuality-block-5"
                      className="clearfix  ui-wow fadeInLeft  "
                      data-motion-duration="400ms"
                      data-motion-delay="400ms"
                    >
                      <div className="block block-header">
                        <h1 className="block-title">{"Aktuality"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="layout-col-md-6 layout-col-sm-6 layout-col-xs-6 sppp-column-vertical-align  ui-hidden-md ui-hidden-sm ui-hidden-xs "
              id="aktuality-aktuality-grid-6"
            >
              <div
                id="aktuality-aktuality-column-7"
                className="layout-column   ui-align-items-bottom"
              >
                <div className="layout-column-addons">
                  <div
                    id="aktuality-aktuality-wrap-8"
                    className="block-wrap  addon-root-image"
                  >
                    <div
                      id="aktuality-aktuality-block-9"
                      className="clearfix  ui-wow fadeInRight   ui-positioned-addon "
                      data-motion-duration="300ms"
                      data-motion-delay="300ms"
                    >
                      <div className="block block-single-image  img-half-tablet block-image-shape">
                        <div className="block-content">
                          <div className="block-single-image-container">
                            <img
                              className="ui-img-responsive "
                              src="/files/banners/vetrne_elektrarny2.png"
                              alt="Image"
                              title=""
                              width="300"
                              height="352"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sekce 2 */}
      <section id="aktuality-section-2-section-1" className="section">
        <div className="layout-row-container">
          <div className="layout-row">
            <div className="layout-col-md-12  " id="aktuality-section-2-grid-2">
              <div
                id="aktuality-section-2-column-3"
                className="layout-column  bg-soft-2"
              >
                <div className="layout-column-addons">
                  <div id="aktuality-section-2-block-4" className="section">
                    <div className="ui-container-inner">
                      <div className="layout-row ui-nested-row">
                        {[newsNoho, newsPodcast].map(news => <div key={news.path} className="layout-col-md-6 news-native-grid">
                          <div className="layout-column bg-soft-2 news-native-card">
                            <div className="layout-column-addons">
                              <div className="block-wrap addon-root-text-block">
                                <div className="clearfix news-native-text">
                                  <div className="block block-text-block">
                                    <h2 className="block-title h4 news-native-title">{news.title}</h2>
                                    <div className="block-content">{news.perex.slice(0, 115).trimEnd()}...</div>
                                  </div>
                                </div>
                              </div>
                              <div className="block-wrap addon-root-button">
                                <div className="clearfix news-native-action">
                                  <div className="ui-button-wrapper">
                                    <a href={news.path} className="button button-primary button-rounded" aria-label={`Číst článek: ${news.title}`}>Číst článek</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>)}
                        <div
                          className="layout-col-md-6  "
                          id="aktuality-section-2-grid-5"
                        >
                          <div
                            id="aktuality-section-2-column-6"
                            className="layout-column  bg-soft-2"
                          >
                            <div className="layout-column-addons">
                              <div
                                id="aktuality-section-2-wrap-7"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="aktuality-section-2-block-8"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <h4 className="block-title">
                                      {
                                        "Sněmovna schválila Zákon o urychlení rozvoje obnovitelných zdrojů energie"
                                      }
                                    </h4>
                                    <div className="block-content  ">
                                      {
                                        "Česká republika se dlouhodobě potýká s jedním z nejpomalejších povolovacích procesů pro obnovitelné zdroje energie (OZE) v Evropě..."
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="aktuality-section-2-wrap-9"
                                className="block-wrap  addon-root-button"
                              >
                                <div
                                  id="aktuality-section-2-block-10"
                                  className="clearfix  "
                                >
                                  <div className="ui-button-wrapper">
                                    <a
                                      href="https://www.csve.cz/snemovna-schvalila-zakon-o-urychleni-rozvoje-obnovitelnych-zdroju-energie/"
                                      target="_blank"
                                      id="aktuality-section-2-button-11"
                                      className="button  button-primary button-rounded"
                                      rel="noopener noreferrer"
                                    >
                                      {"Číst článek"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="layout-col-md-6  "
                          id="aktuality-section-2-grid-12"
                        >
                          <div
                            id="aktuality-section-2-column-13"
                            className="layout-column  bg-soft-2"
                          >
                            <div className="layout-column-addons">
                              <div
                                id="aktuality-section-2-wrap-14"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="aktuality-section-2-block-15"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <h4 className="block-title">
                                      {
                                        "Větrné elektrárny nesnižují ceny nemovitostí. První analýza z Česka obavy vyvrací"
                                      }
                                    </h4>
                                    <div className="block-content  ">
                                      {
                                        "Přítomnost větrných elektráren v obcích nemá negativní vliv na ceny nemovitostí..."
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="aktuality-section-2-wrap-16"
                                className="block-wrap  addon-root-button"
                              >
                                <div
                                  id="aktuality-section-2-block-17"
                                  className="clearfix  "
                                >
                                  <div className="ui-button-wrapper">
                                    <a
                                      href="https://www.csve.cz/vetrne-elektrarny-nesnizuji-ceny-nemovitosti-prvni-analyza-z-ceska-obavy-vyvraci/"
                                      target="_blank"
                                      id="aktuality-section-2-button-18"
                                      className="button  button-primary button-rounded"
                                      rel="noopener noreferrer"
                                    >
                                      {"Číst článek"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="layout-col-md-6  "
                          id="aktuality-section-2-grid-19"
                        >
                          <div
                            id="aktuality-section-2-column-20"
                            className="layout-column  bg-soft-2"
                          >
                            <div className="layout-column-addons">
                              <div
                                id="aktuality-section-2-wrap-21"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="aktuality-section-2-block-22"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <h4 className="block-title">
                                      {
                                        "Lesy ČR a Komora OZE uzavřely memorandum o spolupráci na rozvoji obnovitelných zdrojů"
                                      }
                                    </h4>
                                    <div className="block-content  ">
                                      {
                                        "Spolupráce s respektem k veřejnému majetku a férovým podmínkám pro všechny..."
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="aktuality-section-2-wrap-23"
                                className="block-wrap  addon-root-button"
                              >
                                <div
                                  id="aktuality-section-2-block-24"
                                  className="clearfix  "
                                >
                                  <div className="ui-button-wrapper">
                                    <a
                                      href="https://www.csve.cz/lesy-cr-a-komora-oze-uzavrely-memorandum-o-spolupraci-na-rozvoji-obnovitelnych-zdroju/"
                                      target="_blank"
                                      id="aktuality-section-2-button-25"
                                      className="button  button-primary button-rounded"
                                      rel="noopener noreferrer"
                                    >
                                      {"Číst článek"}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Podcasty */}
      <section id="aktuality-podcasty-section-1" className="section">
        <div className="layout-row-container">
          <div className="layout-row">
            <div className="layout-row-column  " id="aktuality-podcasty-grid-2">
              <div id="aktuality-podcasty-column-3" className="layout-column  ">
                <div className="layout-column-addons">
                  <div
                    id="aktuality-podcasty-wrap-4"
                    className="block-wrap  addon-root-divider"
                  >
                    <div id="aktuality-podcasty-block-5" className="clearfix  ">
                      <div className="block-divider-wrap divider-position">
                        <div
                          className="ui-divider ui-divider-border "
                          role="none"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="aktuality-podcasty-wrap-6"
                    className="block-wrap  addon-root-heading"
                  >
                    <div id="aktuality-podcasty-block-7" className="clearfix  ">
                      <div className="block block-header">
                        <h2 className="block-title">{"Podcasty"}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sekce 4 */}
      <section id="aktuality-section-4-section-1" className="section">
        <div className="layout-row-container">
          <div className="layout-row">
            <div className="layout-col-md-12  " id="aktuality-section-4-grid-2">
              <div
                id="aktuality-section-4-column-3"
                className="layout-column  bg-soft-2"
              >
                <div className="layout-column-addons">
                  <div id="aktuality-section-4-block-4" className="section">
                    <div className="ui-container-inner">
                      <div className="layout-row ui-nested-row">
                        <div
                          className="layout-col-md-6  "
                          id="aktuality-section-4-grid-5"
                        >
                          <div
                            id="aktuality-section-4-column-6"
                            className="layout-column  bg-soft-2"
                          >
                            <div className="layout-column-addons">
                              <div
                                id="aktuality-section-4-wrap-7"
                                className="block-wrap  addon-root-video"
                              >
                                <div
                                  id="aktuality-section-4-block-8"
                                  className="clearfix  "
                                >
                                  <div className="block block-video ">
                                    <div className="block-video-local-video-wrap">
                                      <video
                                        className="block-video-local-source"
                                        controls={true}
                                        poster="/files/banners/zeleny_vodik1.jpg"
                                        playsInline={true}
                                        preload="metadata"
                                      >
                                        <source
                                          src="/media/videos/2026/05/04/Uvod_do_zeleneho_vodiku-3.mp4"
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="aktuality-section-4-wrap-9"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="aktuality-section-4-block-10"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <h4 className="block-title">
                                      {"Úvod do zeleného vodíku"}
                                    </h4>
                                    <div className="block-content  "></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="layout-col-md-6  "
                          id="aktuality-section-4-grid-11"
                        >
                          <div
                            id="aktuality-section-4-column-12"
                            className="layout-column  bg-soft-2"
                          >
                            <div className="layout-column-addons">
                              <div
                                id="aktuality-section-4-wrap-13"
                                className="block-wrap  addon-root-video"
                              >
                                <div
                                  id="aktuality-section-4-block-14"
                                  className="clearfix  "
                                >
                                  <div className="block block-video ">
                                    <div className="block-video-local-video-wrap">
                                      <video
                                        className="block-video-local-source"
                                        controls={true}
                                        poster="/files/banners/zeleny_vodik1.jpg"
                                        playsInline={true}
                                        preload="metadata"
                                      >
                                        <source
                                          src="/media/videos/2026/05/04/zeleny_vodik_-_technologie_ukladani_a_transport.mp4"
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="aktuality-section-4-wrap-15"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="aktuality-section-4-block-16"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <h4 className="block-title">
                                      {"Technologie, ukládání a transport"}
                                    </h4>
                                    <div className="block-content  "></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sekce 5 */}
      <section id="aktuality-section-5-section-1" className="section">
        <div className="layout-row-container">
          <div className="layout-row">
            <div
              className="layout-row-column  "
              id="aktuality-section-5-grid-2"
            >
              <div id="aktuality-section-5-column-3" className="layout-column ">
                <div className="layout-column-addons">
                  <div
                    id="aktuality-section-5-wrap-4"
                    className="block-wrap  addon-root-text-block"
                  >
                    <div
                      id="aktuality-section-5-block-5"
                      className="clearfix  "
                    >
                      <div className="block block-text-block ">
                        <div className="block-content  ">
                          <p>
                            {"* Externí články v této sekci vycházejí z materiálů "}
                            <a
                              target="_blank"
                              rel=""
                              href="https://www.csve.cz/"
                              data-link-type="url"
                              data-link-value="https://www.csve.cz/"
                            >
                              {"dostupných na stránkách csve.cz"}
                            </a>
                            {
                              ", kde naleznete také další podrobné informace o větrných elektrárnách."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
