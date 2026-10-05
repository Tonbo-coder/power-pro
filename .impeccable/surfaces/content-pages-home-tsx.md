---
version: 1
slug: "content-pages-home-tsx"
primary_target: "content/pages/home.tsx"
related_targets: ["components/PodcastPopup.tsx","components/PodcastPopup.module.css","content/podcast.json"]
---

# Homepage podcast invitation

Scope: Power-pro homepage only. Persuade mode. Preserve the established page, brand, media and animation. Use the user's exact title, copy and Spotify URL. The only new surface is the requested popup.

## Direction contract

THESIS: A concise invitation to listen, with an equally clear exit. Avoid repeated interruption while the visitor explores the site.

OWN-WORLD: Inherit Power-pro's white surfaces, charcoal blue text, Hind headings and actions, 15px corners and restrained controls. No new visual identity or promotional artwork.

STORY: Read the supplied promise, choose Spotify or dismiss, and continue browsing without losing position.

FIRST VIEWPORT: A centered panel no wider than 560px, title above a readable paragraph, Spotify action below, visible 44px close control at the upper right. Dim the existing homepage. On phones, keep 16px outer clearance and stack the actions.

FORM: Precisely requested local extension using a native modal dialog. No concept seed is required for this narrow request. Per the owner's preference on 2026-10-05, show after one second on the homepage. Dismissal or following Spotify suppresses further prompts in the current tab session, including reloads and returns to the homepage; a fresh tab shows the invitation again. Ignore the previous seven-day localStorage cooldown. Defer if another dialog or text entry is active. Support Escape, backdrop dismissal, keyboard focus containment, focus return, reduced motion and unavailable storage.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
