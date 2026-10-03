# NOHO article documentation

Checked on 3 October 2026 after the finish review returned `disposition: ship` with no material fixes.

## Documentation decision

Preserve `PRODUCT.md`, `DESIGN.md` and `.impeccable/design.json` without changes. This is an ordinary extension of the existing Power Pro identity: one internal article and its first news tile. The implementation introduces no approved global palette, type, component or motion change. The article's copy column, lead treatment and photograph placement are local surface decisions, so they do not become global tokens. No seed or generated comp is required by the surface contract.

`EDITING.md` already records the article's JSON content, TSX layout, scoped CSS, shared news tile and SEO registration. No further editing-guide change is needed.

## Source evidence

| Checked source | Evidence and system relationship |
| --- | --- |
| `PRODUCT.md` | The existing website remains the binding visual authority; authentic supplied content and imagery fit its commitments. |
| `DESIGN.md`, `.impeccable/design.json` | The recorded original palette, local typography, container breakpoints, controls and media guardrails remain applicable. The sidecar's two named rules agree with the Markdown. |
| `public/styles/base.css`, `public/styles/refinements.css` | Existing blue-grey variables, white ground, dark footer, button states, visible focus and mobile header correction support the new surface. |
| `public/styles/pages/aktuality__mereni-vetru-noho.css` | Heading uses Hind, `clamp(30px, 3vw, 48px)`, weight 600, line height 1.25 and tracking −.015em, matching the recorded headline role. Body uses 16px/1.7 and existing brand text. Restored header and footer styles preserve the shared shell. |
| `public/styles/pages/aktuality.css`, `content/pages/aktuality.tsx` | New tile retains the original centered layout, inherited title font, blue-grey surface, 15px corners and existing button. The verification report records matching computed title styles at 1280px. |
| `content/pages/aktuality__mereni-vetru-noho.tsx`, `content/articles/noho-mereni-vetru.json` | Semantic article, one title source, the three supplied paragraphs, bold linked NOHO, explicit photograph dimensions and ordinary return link. |
| Surface contract, `review.md`, `verification.md` | The contract's article and first-tile journey is satisfied. The fresh finish review inspected all four final full-page captures and found no material fixes. Build, typecheck, exact DOM text, internal click/return journey, phone overflow, metadata and sitemap checks are recorded in `verification.md`. Those runtime checks were performed by the implementation pass and are not claimed as rerun by this documentation pass. |

## Five-line system summary

1. Palette: existing blue-grey headings `#424B54`, body `#58626D`, links `#556F89`, white content and dark footer.
2. Type ramp: article headline uses the recorded Hind headline role; body remains 16px/1.7; news titles retain their existing local inherited treatment.
3. Layout and shape: existing centered responsive containers, scoped page exceptions, 15px media/card corners and restrained controls.
4. Named rule: **The Original Palette Rule** continues to preserve Power Pro's original color roles.
5. Named rule: **The Local Typography Rule** continues to preserve explicit block typography and actual font inheritance.

## Shipping raster provenance

Only one new shipping raster is present in this extension: `public/files/aktuality/noho-lidar-windcube.png`. The documentation pass directly read its PNG header and embedded `tEXt` origin record. Dimensions are 1047 × 425. The `impeccable:prompt` record identifies it as the image supplied by the user on 2026-10-03 for the NOHO Vaisala WindCube 2.1 article, names the original attachment `codex-clipboard-1f0fd044-816e-41ba-9588-8adf803ab661.png`, and records that no visual content was generated or altered.

The implementation verification records matching original IHDR, PLTE, IDAT and tRNS visual-chunk hashes and a provenance scan of one new raster with zero missing records. This documentation pass confirms the supplied-origin record is embedded in the shipping file. The four review screenshots are review evidence rather than shipping media. No generated asset was added; existing logos and media retain their roles.

Observed SHA-256 of the shipping photograph: `EC833631353F215D4A452E635EF593B469DDE15D02A30FE1E26A6B175858E04D`.

## Preserved system and uncanonized drift

No material defect is reported in the approved extension. Legacy page-specific declarations, including the existing news stylesheet's green footer-hover declaration, were not promoted to global tokens or repaired: they are outside the approved addition, and this pass does not assert they are the effective rendered style. The article's local 19px desktop lead and 70ch copy width also remain surface decisions rather than new durable system rules.

System-file SHA-256 values observed by this pass:

| File | SHA-256 |
| --- | --- |
| `PRODUCT.md` | `FE50273D0672CE7BF598FA10175139ACDA0BE32B21631E28A32821FD32F1D53B` |
| `DESIGN.md` | `30CC78567055F1EE85D4A8873998E0C0178CDE8E0F73513E425F2ADD27C0258E` |
| `.impeccable/design.json` | `6A5D1D5CB0C27D268552BEB89CE951A08EBC6BEAD1D51934E4A5ECBA862CABAE` |

Written by this documentation pass: `.impeccable/review/noho-article/documentation.md` only.
