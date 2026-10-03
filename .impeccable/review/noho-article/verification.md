# NOHO article verification

Checked on 3 October 2026 against the local production build.

- `npm run typecheck` and `npm run build` passed after the final correction.
- Actual news-tile click opens `/aktuality/mereni-vetru-noho` in the same tab; the article's return link opens `/aktuality`.
- Browser DOM contains one H1 and the exact three supplied paragraphs. NOHO is bold and linked to the supplied LinkedIn URL.
- Desktop and 390px phone captures show the complete, uncropped photograph and readable content. Phone document width does not exceed the viewport.
- At 1280px the new tile and adjacent original title have identical computed font (500 21.76px / 27.2px system stack), color (#424b54), and tracking (-0.1088px). Card surface, padding, corner radius and CTA treatment inherit the existing news design.
- Article HTTP response is 200. Canonical URL, `og:type=article`, article image and sitemap entry are correct.
- PNG dimensions are 1047 × 425. IHDR, PLTE, IDAT and tRNS visual chunk hashes match the original user attachment; only origin metadata was embedded. Provenance scan: one new raster, zero missing.
- The detector was run once on the article component/CSS and news component; no findings. The final correction restored legacy header-logo and footer styles on the new route and narrowed the existing CSVE note to external articles.

Final captures: `desktop.png` and `mobile.png` are the article; `news-desktop.png` and `news-mobile.png` are the news index. All are full-page browser captures starting at the document top. News captures emulate reduced motion to settle inherited entrance animations; production animations are preserved. Capture widths are 1280px and 390px respectively.

Scope: one new internal article and news tile. Supplied editorial assertions were preserved; this verification does not independently substantiate them or audit unrelated legacy content.
