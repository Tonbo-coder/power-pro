# Podcast popup documentation review

Reviewed on 3 October 2026 after the finish review. Documentation-only pass; no browser automation or implementation edits.

## Sources checked

- `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json` and `.impeccable/surfaces/content-pages-home-tsx.md`.
- `components/PodcastPopup.tsx`, `components/PodcastPopup.module.css`, `components/Icon.tsx`, `content/podcast.json` and `app/[[...slug]]/page.tsx`.
- `EDITING.md`, `public/styles/base.css`, `public/styles/refinements.css` and `.impeccable/review/podcast/review.md`.

## Result

No system documentation changes are necessary. This is an ordinary local extension of the existing Power Pro identity. The popup reuses white, charcoal blue, the existing solid CTA and focus colors, Hind headings/actions, system body text, 15px panel corners, 4px controls and 150ms button transitions. The Original Palette Rule and The Local Typography Rule remain applicable.

The popup's title is 40px on desktop and 30px on phones, its paragraph is 16px/1.7, and its actions are 19px. The 560px panel, 16px viewport clearance, stacked phone actions, modal shadow, 180ms entry animation and 480px local breakpoint remain component-specific choices; they are not promoted into global tokens or rules. The existing system and sidecar retain their dated description of the incumbent site.

`EDITING.md` accurately documents the JSON configuration, five-second delay, seven-day cooldown and campaign `id`. Source confirms homepage-only rendering and the supplied title, paragraph, CTA label and Spotify URL. Behavioral and build validation are recorded in `review.md`; this pass checked their documentation against source and did not rerun them.

No new raster is shipped. The popup uses the existing inline SVG play/close paths from `Icon.tsx`. `desktop.png` and `mobile.png` are local browser evidence captures, not shipped artwork; their dimensions and provenance are recorded in `review.md`. No generated or third-party asset provenance is required for this addition.

Unrelated legacy documentation and implementation drift were not repaired or canonized. The local modal's elevation, spacing and motion do not authorize applying those values to incumbent cards or other surfaces.
