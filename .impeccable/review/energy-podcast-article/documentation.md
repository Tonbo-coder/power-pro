# Energie zítřka — documentation review

Reviewed 2026-10-03. Scope: the second internal news tile and `/aktuality/energie-zitrka-podcast`.

## Decision

The implementation extends the established Power Pro article and news treatment. No newly approved system change was found. `PRODUCT.md`, `DESIGN.md` and `.impeccable/design.json` remain the governing context and were preserved; their working-tree diff is empty. The article-specific Read mode and listening flow belong in the existing surface brief, not in global design rules.

## Evidence

- `content/articles/energie-zitrka-podcast.json` owns the title, derived perex, three paragraphs and Spotify URLs. The article maps the paragraphs directly into semantic paragraph elements. No date or separate cover image was introduced.
- `content/pages/aktuality.tsx` renders `[newsNoho, newsPodcast]`, preserving NOHO first and placing the podcast second. Both use the incumbent card markup, the same 115-character preview treatment and ordinary same-tab article links.
- `public/styles/news-article.css` carries the existing NOHO article rules, explicitly scoped to the two article `data-page` values. Replacing the expanded selector with the original NOHO selector produces an exact match with the committed NOHO stylesheet, after line-ending normalization. Both article page stylesheets import the shared file.
- The shared article rules preserve the charcoal header, Hind heading, blue links, 70ch reading column, system body type, inherited buttons and footer. The new page stylesheet adds only its heading width and player layout. Its 352px reserved height, 12px embed corner and spacing are local media treatment, not new system tokens.
- `content/pages/aktuality__energie-zitrka-podcast.tsx` provides one H1, labelled breadcrumbs, a labelled player section and iframe, lazy loading, a direct Spotify link and a return to news. The embed uses show `53N17blu0Vp4i9VKA6Uu4X` without an autoplay URL parameter. The existing `public/styles/refinements.css` supplies visible keyboard focus.
- `EDITING.md` identifies the article JSON, page component, player CSS and shared article CSS, including the explicit scope of those shared rules.

## Asset provenance and limits

No new shipping raster is part of this addition. The podcast cover is served remotely within the supplied official Spotify embed; it is not copied, regenerated or promoted to a local site asset.

This is a static documentation review. It does not certify rendered layout, playback, external availability, build success or exact equality with the original user message; those require the implementation and finish verification evidence. The three stored paragraphs are rendered without rewriting in the page component.

Historical product deployment wording was not repaired as part of this narrow UI addition. The user's later GitHub/Vercel authorization governs deployment work.
