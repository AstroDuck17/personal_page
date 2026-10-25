# Yashav Bhatnagar’s website

Static Astro site for the existing **https://AstroDuck17.github.io/personal_page/** address. Four main pages, individual entries and shared topic collections. No server, subscription, or paid template.

## Develop and review

Use **Node 24** and npm. The system Node 22.14 is too old. This workstation also has Node 24 at `C:\Users\Dell\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`.

```sh
npm ci
npm run dev
```

Normal preview: `http://127.0.0.1:4321/personal_page/`. For editorial review:

```sh
npm run dev:review
```

Review preview: **http://127.0.0.1:4322/personal_page/**. A review banner and `noindex` mark this as unpublished. The graph-evaluation note appears only here. If default Node is still version 22, run bundled Node 24 directly in PowerShell:

```powershell
& 'C:\Users\Dell\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts/review.mjs dev
```

`scripts/astro.mjs` disables optional Astro telemetry, avoiding writes outside the checkout. With bundled Node, replace `npm run check` with `& '<Node24 path>' scripts/astro.mjs check` (similarly build, dev, preview). Use a Node 24 npm installation for future dependency changes.

## Content

- `src/content/projects/*.md`: schema-validated projects/research. Filename becomes `/projects/<id>/`. Copy an existing entry, keeping problem, contribution, approach, evidence and limitations. Do not invent dates or results.
- `src/content/writing/*.md`: articles, notes and research explanations. Filename becomes `/writing/<id>/`. MDX is supported when an interactive explanation warrants a component; ordinary prose stays Markdown.
- Both collections share title, description, topics, type, optional date/dateLabel, status, featured, draft, related, links and provenance sources. Projects also include role, context, stack, order and diagram selection. Schema: `src/content.config.ts`.
- `related` holds another entry’s filename ID. Use unique IDs across collections. Topic keys are validated against the vocabulary in the schema and `src/data/topics.ts`; update both when adding a topic. Indexes and topics reuse entries.
- Use ISO dates only when known. Writing without a date may use an honest dateLabel. No automatic publishing dates.
- `draft: true` **or** `status: draft` excludes content from normal indexes, topics, related links and generated routes. Only `REVIEW_DRAFTS=true` includes it. Deployment explicitly sets false. Never put confidential drafts or research files in a public repository: build exclusion is not privacy.
- `src/data/resume.ts`: web résumé and contact data. Add a publications section only when real entries exist.

The first note is newly drafted for author review, not an existing publication or verified reconstruction of MetaFam’s evaluation. Approve the prose and experimental descriptions before changing draft/status and assigning an actual publication date.

## Update the CV

`public/cv.pdf` is byte-identical to the confirmed **15 September 2026** research CV, from `../Yashav_Bhatnagar_CV.pdf`. Update this PDF and `src/data/resume.ts` together, reconcile project claims, and update the expected approved hash in `scripts/verify-build.mjs`. Change snapshot labels in data. Current SHA-256 is in `CONTENT_PLAN.md`.

## Validate

```sh
npm run check
npm run build
npm run verify
npm run preview
```

The verifier checks generated links/fragments, Pages base, font/assets, unique IDs, primary headings, legacy URLs, approved CV bytes and draft exclusion. It does not verify external websites or replace browser checks. Final results: `VALIDATION.md`.

Review build: `npm run build:review`, then `node scripts/verify-build.mjs --review`. **Rebuild normally afterward** so dist is the release artifact.

## Publish after reviewing

Nothing has been pushed or deployed. Branch: `redesign/butter-olive` in the existing checkout; old pages remain in Git history (baseline `d4c3cad`).

1. Review the local preview, `CONTENT_PLAN.md` and `DESIGN_BRIEF.md`. The writing draft can remain excluded.
2. Commit final edits if any, then `git push -u origin redesign/butter-olive`. Open a pull request to main; the workflow checks/builds without deploying.
3. In the existing repository’s **Settings → Pages → Build and deployment**, choose **GitHub Actions**. This setting was intentionally not changed during preparation. Verify there is no unrecorded custom domain first; the checkout has no CNAME.
4. Merge the reviewed branch into main. `.github/workflows/pages.yml` installs the lockfile with Node 24, checks, builds with drafts disabled, verifies, uploads dist, and deploys. Manual runs deploy only from main.
5. Wait for successful build/deploy jobs. Open the existing address; check Home, a project, CV download and legacy URL.

`astro.config.mjs` sets site to `https://AstroDuck17.github.io` and base to `/personal_page`. All links/assets use `src/lib/content.ts`. Keep these unless moving the site. `/index.html`, `/projects.html`, `/resume.html`, `/contact.html`, `/about.html`, `/cv.pdf`, and existing image paths are preserved in output; .html compatibility pages lead to new routes. Root 404.html returns to the base-aware home.

Actual GitHub Pages settings and authenticated remote workflow execution remain unverified. Prepared configuration follows the [official Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/).
