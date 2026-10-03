import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import site from "@/content/site.json";

/** Obsah stránky /kontakt. Upravujte přímo; původní export není za běhu používán. */
export default function Content() {
  return (
    <>
      {/* Kontakt */}
      <section
        id="kontakt-kontakt-section-1"
        className="section section-content-center"
      >
        <div className="layout-row-overlay"></div>
        <div className="layout-row-container">
          <div className="layout-row ui-align-center">
            <div
              className="layout-col-md-6 layout-col-sm-6 layout-col-xs-6  "
              id="kontakt-kontakt-grid-2"
            >
              <div id="kontakt-kontakt-column-3" className="layout-column ">
                <div className="layout-column-addons">
                  <div
                    id="kontakt-kontakt-wrap-4"
                    className="block-wrap  addon-root-heading"
                  >
                    <div
                      id="kontakt-kontakt-block-5"
                      className="clearfix  ui-wow fadeInLeft  "
                      data-motion-duration="400ms"
                      data-motion-delay="400ms"
                    >
                      <div className="block block-header">
                        <h1 className="block-title">{"Kontakt"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="layout-col-md-6 layout-col-sm-6 layout-col-xs-6 sppp-column-vertical-align  ui-hidden-md ui-hidden-sm ui-hidden-xs "
              id="kontakt-kontakt-grid-6"
            >
              <div
                id="kontakt-kontakt-column-7"
                className="layout-column   ui-align-items-bottom"
              >
                <div className="layout-column-addons">
                  <div
                    id="kontakt-kontakt-wrap-8"
                    className="block-wrap  addon-root-image"
                  >
                    <div
                      id="kontakt-kontakt-block-9"
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
      {/* Adresa */}
      <section id="kontakt-adresa-section-1" className="section">
        <div className="layout-row-container">
          <div className="layout-row">
            <div
              className="layout-col-md-6 layout-col-sm-6  "
              id="kontakt-adresa-grid-2"
            >
              <div id="kontakt-adresa-column-3" className="layout-column  ">
                <div className="layout-column-addons">
                  <div
                    id="kontakt-adresa-wrap-4"
                    className="block-wrap  addon-root-form-builder"
                  >
                    <div
                      id="kontakt-adresa-block-5"
                      className="clearfix  ui-wow fadeInUp  "
                      data-motion-duration="400ms"
                      data-motion-delay="400ms"
                    >
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="layout-col-md-6 layout-col-sm-6  "
              id="kontakt-adresa-grid-7"
            >
              <div id="kontakt-adresa-column-8" className="layout-column  ">
                <div className="layout-column-addons">
                  <div
                    id="kontakt-adresa-block-9"
                    className="section bg-soft-2 ui-wow fadeInUp"
                    data-motion-duration="400ms"
                    data-motion-delay="400ms"
                  >
                    <div className="ui-container-inner">
                      <div className="layout-row ui-nested-row">
                        <div
                          className="layout-col-md-12  "
                          id="kontakt-adresa-grid-10"
                        >
                          <div
                            id="kontakt-adresa-column-11"
                            className="layout-column  "
                          >
                            <div className="layout-column-addons">
                              <div
                                id="kontakt-adresa-wrap-12"
                                className="block-wrap  addon-root-feature"
                              >
                                <div
                                  id="kontakt-adresa-block-13"
                                  className="clearfix  "
                                >
                                  <div className="block-content-align-left block block-feature ui-text-left ">
                                    <div className="block-content">
                                      <div className="ui-media">
                                        <div className="pull-left">
                                          <div className="ui-icon">
                                            <span
                                              className="ui-icon-container"
                                              role="img"
                                              aria-label="Adresa"
                                            >
                                              <i
                                                className="fas fa-map-marker-alt"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ui-media-body">
                                          <div className="ui-media-content">
                                            <h3 className="block-title ui-feature-box-title ui-media-heading">
                                              {"Adresa"}
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="kontakt-adresa-wrap-14"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="kontakt-adresa-block-15"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <div className="block-content  ">
                                      {site.address.street}
                                      <br />
                                      {`${site.address.postalCode}, ${site.address.city}`}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="kontakt-adresa-wrap-16"
                                className="block-wrap  addon-root-feature"
                              >
                                <div
                                  id="kontakt-adresa-block-17"
                                  className="clearfix  "
                                >
                                  <div className="block-content-align-left block block-feature ui-text-left ">
                                    <div className="block-content">
                                      <div className="ui-media">
                                        <div className="pull-left">
                                          <div className="ui-icon">
                                            <span
                                              className="ui-icon-container"
                                              role="img"
                                              aria-label="Telefon"
                                            >
                                              <i
                                                className="fas fa-map-marker-alt"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ui-media-body">
                                          <div className="ui-media-content">
                                            <h3 className="block-title ui-feature-box-title ui-media-heading">
                                              {"Telefon"}
                                            </h3>
                                            <div className="block-text">
                                              <p></p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="kontakt-adresa-wrap-18"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="kontakt-adresa-block-19"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <div className="block-content  ">
                                      <p>
                                        {"+420 702 204 789"}
                                        <br />
                                        {" Miloslav Kočí"}
                                        <br />
                                        {"Business development"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="kontakt-adresa-wrap-20"
                                className="block-wrap  addon-root-feature"
                              >
                                <div
                                  id="kontakt-adresa-block-21"
                                  className="clearfix  "
                                >
                                  <div className="block-content-align-left block block-feature ui-text-left ">
                                    <div className="block-content">
                                      <div className="ui-media">
                                        <div className="pull-left">
                                          <div className="ui-icon">
                                            <span
                                              className="ui-icon-container"
                                              role="img"
                                              aria-label="E-mail"
                                            >
                                              <i
                                                className="fas fa-map-marker-alt"
                                                aria-hidden="true"
                                              ></i>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ui-media-body">
                                          <div className="ui-media-content">
                                            <h3 className="block-title ui-feature-box-title ui-media-heading">
                                              {"E-mail"}
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="kontakt-adresa-wrap-22"
                                className="block-wrap  addon-root-text-block"
                              >
                                <div
                                  id="kontakt-adresa-block-23"
                                  className="clearfix  "
                                >
                                  <div className="block block-text-block ">
                                    <div className="block-content  ">
                                      <p>
                                        <a href="mailto:info@power-pro.cz">
                                          {"info@power-pro.cz"}
                                        </a>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="kontakt-restored-1-1" className="section">
        <div className="ui-container-inner">
          <div className="layout-row ui-no-gutter">
            <div className="layout-col-md-12  " id="kontakt-restored-1-2">
              <div id="kontakt-restored-1-3" className="layout-column ">
                <div className="layout-column-addons">
                  <div
                    id="kontakt-restored-1-4"
                    className="block-wrap  addon-root-openstreetmap"
                  >
                    <div id="kontakt-restored-1-5" className="clearfix  ">
                      <ContactMap />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
