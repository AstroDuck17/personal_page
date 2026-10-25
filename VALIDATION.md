# Validation record

26 October 2026 · local redesign branch `redesign/butter-olive` · original baseline `d4c3cad`. No remote push, Pages-settings change, or deployment was performed.

## Build and content checks

- Node 24.22.1; Astro 7.4.2. Commands run with bundled Node 24 because system Node 22.14 is older than the supported runtime. Project scripts and GitHub Actions use the same build entrypoint.
- Astro check: zero errors, warnings or hints after integration.
- Production build: 19 Astro pages plus four compatibility endpoints, **23 HTML files**. No draft writing route, draft cards, related-draft links or review banner.
- Review build: 20 Astro pages plus four endpoints, **24 HTML files**, including the labeled note with syntax-highlighted Python and KaTeX math. Final `dist/` is rebuilt in release mode.
- `scripts/verify-build.mjs`: generated links, fragment targets, base prefixes, CSS/font assets, one primary heading per page, unique IDs, required legacy routes and draft-mode checks passed in both release and review builds.
- Current dependency installation reports **zero known vulnerabilities**. An initially considered older version was replaced before finalizing the lockfile.
- Downloaded CV from the actual local HTTP endpoint: SHA-256 `EEE4E4BDFB1ED4E2634C3C231F88B27569BDA182808AFA9E9A33F3942900D3D8`, matching the approved September CV and public/build copies.
- All six GitHub project source links returned HTTP 200 in direct HEAD checks. Existing `https://AstroDuck17.github.io/personal_page/` also returned HTTP 200.
- Independent subagent source/integration review found no release-blocking defect. The original README identified during review was replaced.

## Browser checks

Chromium-based in-app browser; desktop 1280px and mobile 390px viewport. Inspected Home, project listing and Hardware Test Jig case, résumé, writing index and draft, topic navigation, and served production output.

- Fraunces and DM Sans loaded from local assets; existing portrait loaded correctly. Heading computed color is `rgb(53,56,44)` on `rgb(255,251,239)`.
- Measured contrast using rendered colors: heading **11.58:1**, secondary copy/eyebrows **5.54:1**, white primary-button text on olive **6.31:1**. Headings remain dark on warm surfaces.
- Mobile note initially overflowed because of intrinsic code width. Fixed with `min-width: 0`, explicit prose width and `minmax(0,1fr)` grid track. Rechecked page width 375px within 390px viewport (15px scrollbar), with prose/code approximately 335px. No horizontal page overflow in inspected mobile pages.
- Project topic/type filters update visible entries and live count; Security yields one entry; Security + Research shows the meaningful empty state. All content remains visible without JavaScript.
- Skip link moved keyboard focus to `main`. Tab navigation produced visible olive outline on navigation links. Native selects and native section anchors remain functional.
- Case-study section links update the fragment; its sticky mobile navigation scrolls horizontally rather than widening the page.
- Responsive résumé keeps identity, contacts, CV download and experience readable. Download uses the correct base-prefixed PDF URL.
- Draft note’s code and MRR equation were inspected. Semantic math and source links render; code scrolls within its block on mobile.
- Production writing index shows its honest empty state with no draft link/banner. Browser-tested `/resume.html` resolves to `/personal_page/resume/`.
- No warning/error logs appeared in the inspected production browser tab. Reduced-motion behavior was verified in CSS; no animation emulation or formal assistive-technology audit was performed.
- Ignored local screenshots are in `.qa/` for Home, résumé and note. Local review server remains available at `http://127.0.0.1:4322/personal_page/`; restart instructions are in README.

## Follow-up layout revision · 26 October 2026

- Replaced the inline personal-interests paragraph with an initially closed native details/summary disclosure. Verified Enter opens and closes it without changing the home URL; interests remain hidden when closed.
- Replaced the disconnected writing legend and full-width list with actual article/note columns at a 7:3 ratio. Browser measurements showed approximately 704px and 302px column widths at the inspected desktop size. The existing draft appears within Notes, with no draft under Articles.
- Quantum computing is one link in the shared topic row; no separate quantum callout remains on the writing index.
- Mobile columns stack with no horizontal page overflow in the inspected narrow viewport. Screenshots: `.qa/writing-columns-desktop.jpg` and `.qa/writing-columns-mobile.jpg`.
- Astro check remained clean; release build and generated-link/draft-exclusion verification passed after the layout revision. Live hosting remains unchanged.

## Limits and intentional omissions

- Authenticated GitHub Pages settings, branch protection and actual Actions deployment have not been exercised. Workflow is prepared for the existing repository base path; deployment follows review.
- No supplied MonoCV reference screenshot was found. The inspected live candidate is credited to Pratham; exact screenshot identity cannot be confirmed. Reference details are in `DESIGN_BRIEF.md`.
- No published articles or verified publications were supplied. The new explanatory note is a local-review draft. No empty publication section is shown.
- MetaFam evaluation details and Microbot measurement conditions remain limited to inspected evidence; public copy qualifies reported metrics. Quantum computing remains an emerging interest without invented entries.
- Browser inspection is representative, not an exhaustive cross-browser/screen-reader audit. External site availability can change; LinkedIn and email delivery were not tested by sending anything.
