# Podcast invitation finish review

Disposition: ship. Fresh finish review completed after the final implementation and captures. No material fixes remain.

## Persistence

The direction contract is `.impeccable/surfaces/content-pages-home-tsx.md`. PRODUCT.md and DESIGN.md define the existing identity; EDITING.md documents the popup configuration. `desktop.png` (1280 × 720) and `mobile.png` (390 × 700) show the final implementation.

## Fidelity

The exact Czech title, paragraph, button label and Spotify URL are preserved. The popup extends Power Pro's existing white, charcoal blue, Hind typography and rounded panel styling. The desktop panel is 560px wide; phone layout has 16px clearance, readable text and stacked actions. Close control is 44px. Heading sizes are 40px desktop and 30px mobile; actions use the documented 19px size.

The native dialog includes visible focus, explicit keyboard containment, focus restoration, Escape and backdrop dismissal, and reduced motion support. Rendering is limited to the homepage. Five seconds and seven days are documented defaults adopted while the optional frequency preference remained unanswered.

## Ceiling

Reached for this local extension. Additional artwork or ornament would exceed the established identity. No separate approved comp or QUALITY BAR card applies.

## Material fixes

None. The detector was run once; its 38px/18px advisories in `detector.json` were resolved in the final source to 40px/19px.

## Keep

Preserve exact copy, existing styling, clear dismissal, visible keyboard focus and restrained display frequency.

## Verification and limits

The parent verified type checking and production build, desktop and phone layouts including 320px width, keyboard containment, Escape, backdrop dismissal, focus return, reduced motion, repeat suppression, mobile menu deferral and homepage-only rendering. The finish reviewer inspected the source and captures, relying on the parent's execution evidence for behavior and build results. Podcast editorial claims came from the user and were not independently fact-checked.
