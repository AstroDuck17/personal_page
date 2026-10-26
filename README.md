# Yashav Bhatnagar’s website

Static Astro site published at **https://astroduck17.github.io/**. The existing repository was renamed to `astroduck17.github.io`, preserving history. Root-hosting cutover and compatibility redirects are complete; see [MIGRATION.md](MIGRATION.md). Four main pages, individual entries and shared topic collections. No server, subscription, or paid template.

## Develop and review

Use **Node 24** and npm. The system Node 22.14 is too old. This workstation also has Node 24 at `C:\Users\Dell\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`.

```sh
npm ci
npm run dev
```

Normal preview: `http://127.0.0.1:4321/`. For editorial review:

```sh
npm run dev:review
```

Review preview: **http://127.0.0.1:4322/**. A review banner and `noindex` mark this as unpublished. The graph-evaluation note appears only here. If default Node is still version 22, run bundled Node 24 directly in PowerShell:

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

`public/cv.pdf` is byte-identical to the confirmed **15 September 2026** research CV, from `../Yashav_Bhatnagar_CV.pdf`. Update this PDF and `src/data/resume.ts` together, reconcile project claims, and update the expected approved hash in `scripts/verify-build.mjs`. Current SHA-256 is in `CONTENT_PLAN.md`.

## Validate

```sh
npm run check
npm run build
npm run verify
npm run preview
```

The verifier checks root links/fragments, canonical/sharing URLs, font/assets, HTML structure, unique IDs, primary headings, compatibility redirects (including query/fragment preservation), both approved CV copies and draft exclusion. It does not verify external websites or replace browser checks. Final results: `VALIDATION.md`.

For the root production preview used in migration review, run `npm run preview -- --host 127.0.0.1 --port 4330`, then `node scripts/verify-preview.mjs http://127.0.0.1:4330`. This checks rendered routes, all old-path redirect responses, missing/draft 404s and both CV downloads over local HTTP.

Review build: `npm run build:review`, then `node scripts/verify-build.mjs --review`. **Rebuild normally afterward** so dist is the release artifact.

## Publishing workflow

Work directly on `main` and push to `origin/main`; a separate redesign branch and pull request are no longer part of this workflow. GitHub Pages uses GitHub Actions for deployment. These conventions were confirmed by the owner after the initial redesign.

Use `git push origin main` for reviewed changes. Origin points to `https://github.com/AstroDuck17/astroduck17.github.io.git`. A push triggers `.github/workflows/deploy.yml`. The explanatory writing draft stays excluded from release builds.

There is one deployment workflow, using Node 24: install the lockfile, check, build, verify, upload dist and deploy. Pull requests only validate; main pushes publish. Same-ref runs are serialized so active deployments are not interrupted. The root site uses the default GitHub domain, without a custom domain. See [DEPLOYMENT.md](DEPLOYMENT.md).

`astro.config.mjs` sets site to `https://astroduck17.github.io` and base to `/`. All normal links/assets use root URLs through `src/lib/content.ts`. Published old addresses under `/personal_page/` get static compatibility HTML; aliases go directly to final pages, and the old CV gets a build-time copy. Unknown pages keep 404 behavior. See [MIGRATION.md](MIGRATION.md) for limitations and cutover tests.

The root migration deployed successfully at commit 39cbaaf, with public compatibility URLs and CV downloads verified. Configuration follows the [official GitHub Pages workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
