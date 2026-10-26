# Validation record

## Centered hero composition · 26 October 2026

- Added a hero-inner container sized to the existing text (580px), gap (56px) and portrait (260px): 896px total, centered inside the unchanged outer page width. Tablet uses an 832px cap; stacked mobile uses a 580px cap. Text stays left-aligned.
- Inspected rendered views at 1920×1080, 1366×900 and 390×844. Inner left/right space measured 172/172px on wide desktop and 132/132px on laptop. Paragraphs remain 580px on both; mobile retains the 135px portrait after the copy/buttons. No horizontal overflow.
- Screenshots: .qa/hero-centered-wide.jpg, .qa/hero-centered-laptop.jpg and .qa/hero-centered-mobile.jpg. Viewport override reset after inspection. Photo, crop, frame, typography, colors, text, buttons, navigation widths and other sections were preserved. No deployment.

## Homepage intro/portrait spacing · 26 October 2026

- Limited implementation changes to hero layout CSS. At 1440px, the former 836px text column contained paragraphs capped at 580px, leaving a 320px paragraph-to-portrait gap. Capped the column itself at 580px with a 56px gap, preserving text line lengths. Removed the portrait's 30px top padding so its frame centers against the full introduction.
- Original photo, object fit/position, arch, frame dimensions, palette, typography, copy and buttons retained. Tablet gap is 32px. Mobile keeps text/buttons first and a 135px portrait below, with a 32px gap.
- Before/after screenshots inspected at 1440×900, 834×1112 and 390×844; saved as .qa/portrait-{before,after}-{desktop,tablet,mobile}.jpg. Additional geometry checks at 1920, 768 and 360px found no horizontal overflow. Desktop frame stays 260px; tablet 220px; mobile 135px. Viewport override reset after testing.
- Release build and generated-page verifier passed. No push or deployment; local review only.

Current decision, 26 October 2026: custom-domain exploration is cancelled. Removed the options and migration plan from DEPLOYMENT.md; retain the default GitHub Pages address and existing URL configuration. Deployment workflow improvements remain in place. Earlier research entries below are historical.

## Deployment research and consolidation · 26 October 2026

- GitHub API confirmed workflow publishing, built status, HTTPS enforced and no custom domain. Both previous workflows successfully deployed remote commit 175d122.
- Consolidated the already successful Node 24 check/build/verify pipeline into deploy.yml and removed pages.yml. Added bounded job durations and serialized same-ref runs. Deployment remains restricted to main, with deployment permissions scoped to that job.
- Parsed workflow YAML successfully. Astro check returned zero errors, warnings or hints; release build and verification of 23 HTML pages passed. No GitHub-hosted run of the consolidated file has occurred yet; this needs checking after it is pushed.
- Added DEPLOYMENT.md with primary-source research, domain choices, price references, DNS migration notes and the two remaining hardcoded URL/base locations to update when a domain is selected. No domain purchase, DNS update, settings mutation or remote push performed.

## Current handoff · footer and résumé cleanup

- Owner confirmed the current workflow: work directly on main, push to main, deploy through GitHub Actions. The earlier branch-based publishing instructions below are historical. Current committed baseline at resumption: 175d122; portrait alignment and the larger expandable interests heading are included.
- Completed this revision: removed the separate copyright footer row, CV snapshot/source/date commentary, the dated CGPA qualifier and the Advanced NLP ongoing parenthetical. Kept the CV download and academic/employment dates.
- Astro check: zero errors, warnings and hints. Release build and verification of 23 generated HTML files passed, including draft exclusion and unchanged CV checksum.
- Browser verified education without snapshot/ongoing qualifiers, the retained CV download and a compact footer without copyright or source-note text. Screenshots: .qa/resume-cleanup.jpg and .qa/footer-cleanup.jpg. Restarted review server is available at http://127.0.0.1:4324/personal_page/ (earlier ports were occupied).
- Outstanding deployment housekeeping: deploy.yml and pages.yml both trigger on pushes to main. Their Node versions are 22.23.4 and 24 respectively. Neither workflow was changed in this copy/layout revision.
- The explanatory note remains a local-review draft; publication of that note still requires author review.

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

## Follow-up copy and separator revision · 26 October 2026

- Applied the user-supplied Humanizer skill (`../SKILL.md`) to the visible site copy. Replaced the landing slogan, header/footer taglines, page introductions and decorative project titles with direct wording. Preserved dates, links, reported metrics and the draft note's code/equation.
- Clarified the Hardware Test Jig contribution using the user's correction and local protocol modules. Protocol implementation and configurable settings lead the case; the browser interface and live diagnostics are also personal contributions. CLI/GUI access is secondary. The diagram and résumé use the same emphasis.
- Added a darker horizontal separator token (`#C4B997`). Removed the last writing-row border before the interests disclosure, its surrounding borders, and the spacer before the footer. Browser measurements confirmed no border on the disclosure itself, no final row border and a zero gap to the footer.
- Inspected the revised homepage and test-jig case in the browser. Narrow-layout checks found no horizontal overflow; the native disclosure still toggles with Enter. Moved the diagram's bottom label up after spotting an overlap with its caption on mobile.
- Astro check, production build and generated link/asset/CV/draft-exclusion checks pass. No dependency or deployment changes; the live site remains untouched.

## Follow-up tone balance and simple cover · 26 October 2026

- Researched personal wording on Maggie Appleton, Julia Evans, Josh Comeau and Andrej Karpathy's own pages. Sources and editorial interpretation are in `DESIGN_BRIEF.md`.
- Followed the user's clarified scope: Humanizer primarily guides technical explanations. Restored conversational introductions, invitations, notebook copy and light personal asides. Technical project content, dates, results and the corrected browser-interface contribution were not changed in this revision.
- Simplified the hardware cover to browser controls, a board and connected device icons. The SVG contains only three text labels: Browser, Test jig, Devices. Protocol settings remain in the case study.
- Browser-inspected the homepage and hardware case in the narrow layout: page width 429px within a 443px viewport, with no horizontal overflow. Saved `.qa/simple-test-jig.jpg`; the cover has no text/caption overlap.
- Astro check returned zero errors/warnings/hints; the release build and generated-link/asset/CV/draft-exclusion verifier passed. Nothing was pushed or deployed.

## Limits and intentional omissions

- Authenticated GitHub Pages settings, branch protection and actual Actions deployment have not been exercised. Workflow is prepared for the existing repository base path; deployment follows review.
- No supplied MonoCV reference screenshot was found. The inspected live candidate is credited to Pratham; exact screenshot identity cannot be confirmed. Reference details are in `DESIGN_BRIEF.md`.
- No published articles or verified publications were supplied. The new explanatory note is a local-review draft. No empty publication section is shown.
- MetaFam evaluation details and Microbot measurement conditions remain limited to inspected evidence; public copy qualifies reported metrics. Quantum computing remains an emerging interest without invented entries.
- Browser inspection is representative, not an exhaustive cross-browser/screen-reader audit. External site availability can change; LinkedIn and email delivery were not tested by sending anything.
