
/** Obsah stránky /e-mail-podekovani. Upravujte přímo; původní export není za běhu používán. */
export default function Content() {
  return (
    <>
      {/* Sekce 1 */}
      <section id="e-mail-podekovani-section-1-section-1" className="section">
        <div className="layout-row-overlay"></div>
        <div className="layout-row-container">
          <div className="layout-row">
            <div
              className="layout-col-md-12  "
              id="e-mail-podekovani-section-1-grid-2"
            >
              <div
                id="e-mail-podekovani-section-1-column-3"
                className="layout-column  "
              >
                <div className="layout-column-addons"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Děkujeme za Vaši zprávu */}
      <section
        id="e-mail-podekovani-dekujeme-za-vasi-zpravu-section-1"
        className="section ui-wow fadeIn"
        data-motion-duration="600ms"
        data-motion-delay="300ms"
      >
        <div className="layout-row-overlay"></div>
        <div className="layout-row-container">
          <div className="layout-row">
            <div
              className="layout-row-column  "
              id="e-mail-podekovani-dekujeme-za-vasi-zpravu-grid-2"
            >
              <div
                id="e-mail-podekovani-dekujeme-za-vasi-zpravu-column-3"
                className="layout-column  "
              >
                <div className="layout-column-addons">
                  <div
                    id="e-mail-podekovani-dekujeme-za-vasi-zpravu-wrap-4"
                    className="block-wrap  addon-root-heading"
                  >
                    <div
                      id="e-mail-podekovani-dekujeme-za-vasi-zpravu-block-5"
                      className="clearfix  "
                    >
                      <div className="block block-header">
                        <h1 className="block-title">
                          {"Děkujeme za Vaši zprávu"}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div
                    id="e-mail-podekovani-dekujeme-za-vasi-zpravu-wrap-6"
                    className="block-wrap  addon-root-divider"
                  >
                    <div
                      id="e-mail-podekovani-dekujeme-za-vasi-zpravu-block-7"
                      className="clearfix  "
                    >
                      <div className="block-divider-wrap divider-position">
                        <div
                          className="ui-divider ui-divider-border "
                          role="none"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="e-mail-podekovani-dekujeme-za-vasi-zpravu-wrap-8"
                    className="block-wrap  addon-root-text-block"
                  >
                    <div
                      id="e-mail-podekovani-dekujeme-za-vasi-zpravu-block-9"
                      className="clearfix  "
                    >
                      <div className="block block-text-block ">
                        <div className="block-content  ">
                          <h2>{"Vaše zpráva byla úspěšně odeslána."}</h2>
                          <h3>
                            {
                              "Ozveme se Vám co nejdříve, jakmile ji zpracujeme."
                            }
                          </h3>
                          <p>
                            <strong>
                              {"Mezitím se můžete podívat na další "}
                            </strong>
                            <a
                              rel=""
                              href="/proc-s-nami"
                              data-link-type="url"
                              data-link-value="https://power-pro.cz/co-delame"
                            >
                              <strong>{"informace o našich službách"}</strong>
                            </a>
                            <strong>{" nebo se vrátit zpět na "}</strong>
                            <a
                              rel=""
                              href="/"
                              data-link-type="url"
                              data-link-value="https://power-pro.cz/"
                            >
                              <strong>{"hlavní stránku"}</strong>
                            </a>
                            <strong>{"."}</strong>
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
