# Design brief

## Confirmed direction

Warm, light, slightly playful personal site for Yashav Bhatnagar, B.Tech CSE at IIIT Hyderabad. Four main destinations: Home, Projects & Research, Articles & Notes, Résumé. Project and writing entries have individual URLs. Topics connect both collections; quantum computing is a learning direction, not a claimed research specialty. No empty publications section.

Fraunces headings; DM Sans body, navigation and résumé information; system monospace for code. Free fonts are bundled locally. Shared CSS tokens in `src/styles/global.css`: paper `#FFFBEF`, butter `#F2E8B8`, olive `#5D642E`, ink `#35382C`, muted `#666851`, border `#E4DDBE`, white `#FFFFFF`. Headings and body colors are explicit. Pale borders are decorative separators, not text colors.

## Inspected references

All listed live layouts were inspected in the browser during this redesign. Their arrangement informs original code; no template purchase or builder export is used.

| Reference | Observed pattern / adaptation |
| --- | --- |
| [Capital listing](https://webflow.com/made-in-webflow/website/capital-template), [live](https://capital-template.webflow.io/) | Large editorial hero, warm backdrop, compact header and portraits. Adapted to a personal introduction with one existing portrait; landing arrangement remains our judgment. Live page loaded in browser although text extraction failed. |
| [Bestfolios](https://www.framer.com/marketplace/templates/bestfolios/), [work page](https://samortega.framer.website/work) | Two-column, large-cover project grid; numbered covers and metadata underneath. Original conceptual diagrams replace fabricated product screenshots. |
| [Tabfolio](https://www.framer.com/marketplace/templates/tabfolio/), [case study](https://tabfolio.framer.ai/case-studies/making-financial-data-easier-to-understand-copy) | Centered long-form case, sticky section navigation, overview, visual and metadata. Adapted to contribution, approach, evidence and limitations. |
| [Maggie Appleton](https://maggieappleton.com/) | Editorial introduction; essay cards and compact notes with explicit types. Adapted reading widths, topic links and note metadata. Only a draft note exists now; no invented essay inventory. |
| [MonoCV listing](https://www.framer.com/marketplace/templates/monocv/), [live](https://monocv.framer.website/) | Narrow identity/contact/download sidebar; wider stacked résumé sections and aligned dates. The listing credits **Pratham**, not “Prdthum.” No reference screenshot was supplied or found, so this is the strongest candidate rather than a screenshot-verified exact match. The implementation follows the inspected live candidate. |

## Implementation decisions

- Apply the user-provided Humanizer skill at `../SKILL.md` mainly to technical descriptions: precise contributions, evidence and limitations. Per the user's clarification, personal introductions and surrounding page copy should remain conversational, warm and lightly playful. Avoid inflated expertise and generic inspirational slogans; retain ordinary enthusiasm and asides.
- Horizontal section separators use `--separator: #C4B997`; card outlines retain the original `--line: #E4DDBE`. Adjacent sections share a single boundary. The interests disclosure has no separate surrounding borders or spacer before the footer.
- Hardware Test Jig emphasizes protocol implementation and configurable communication. The browser interface and live diagnostics are also Yashav's contribution; CLI/Tkinter access is secondary context. Its cover is a simple Browser → Test jig → Devices illustration with three short labels. Protocol names and settings belong in the case study, not the cover.
- Personal interests live inside a native, initially collapsed “Away from the keyboard” disclosure on Home. Opening it expands the page in place, with keyboard support and no navigation.
- Writing uses a 70/30 articles/notes grid on desktop and stacks on mobile. Each entry lives under its actual content type; draft is a status, not another category. Quantum computing appears alongside the other topic links, without a separate writing-page callout.
- Astro produces static HTML, with Markdown content collections and typed résumé data. It adds Node/build dependencies but removes repeated HTML layouts and supports reliable publishing. MDX is available for future explanations where interactive components add value; no client framework is needed now.
- Shared navigation, spacing, colors, typography and diagrams across routes. Grids/sidebar stack on small screens. Native links, selects, skip link and visible focus states; reduced-motion CSS.
- Project diagrams are labeled conceptual and contain no invented measurements. Ongoing research has questions and methodology, without manufactured conclusions.
- Local review includes the visibly labeled unpublished note. Release builds exclude draft routes, cards and related links. Draft source in a public repository remains public.
- Host normal pages at `/`; preserve published `/personal_page/` and old `.html` addresses through generated compatibility pages. The root cutover is complete; future publication follows review through GitHub Actions. See MIGRATION.md.

## Tone references, inspected 26 October 2026

- [Maggie Appleton](https://maggieappleton.com/): subject-specific introductions and playful admissions about unfinished understanding. Adapt the room for curiosity without borrowing her identity or phrasing.
- [Julia Evans](https://jvns.ca/about/): openly enjoys programming, welcomes questions and treats learning as something readers can join. Her [homepage](https://jvns.ca/) uses an uncomplicated greeting before the technical material.
- [Josh Comeau](https://www.joshwcomeau.com/about-josh/): friendly greeting, factual professional background and small personal asides. The warmth comes from his voice and concrete interests.
- [Andrej Karpathy](https://karpathy.ai/): short first-person descriptions alongside technical work, with occasional informal comments. Use the distinction between casual framing and specific technical details.

Editorial interpretation: keep the personal voice in introductions, invitations and the notebook; keep technical evidence precise. The homepage can say what Yashav enjoys exploring without claiming expertise he has not established. No new dates, results or affiliations were added in the tone revision.
