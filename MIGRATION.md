# Root-hosting migration

## Cutover completed · 26 October 2026

The owner confirmed the existing repository was renamed. Origin was updated to `https://github.com/AstroDuck17/astroduck17.github.io.git`, and preparation commit 39cbaaf was pushed to main. [GitHub Actions build and deploy](https://github.com/AstroDuck17/astroduck17.github.io/actions/runs/40376952433) both succeeded. Pages reports the root URL, workflow publishing, HTTPS enforced and no custom domain.

Public verification passed 34 HTTP checks: root pages, all 22 compatibility HTML pages, genuine missing/draft 404s and unchanged CV bytes at both URLs. Real browser tests preserved query strings and section fragments through the old homepage, MetaFam detail and résumé HTML alias. The root homepage was visually inspected after publication. No GitHub settings were changed by the agent.

## Recovery baseline

Recorded 26 October 2026 before edits:

- Commit: `da5c93c5401bc582b971fc2060aa8460d3866cf6` (main).
- Working tree: clean; no pre-existing uncommitted changes.
- Origin fetch/push: `https://github.com/AstroDuck17/personal_page.git`.
- Published address: `https://astroduck17.github.io/personal_page/`.
- CV SHA-256: `eee4e4bdfb1ed4e2634c3c231f88b27569bda182808afa9e9a33f3942900d3d8`.
- Dependency versions and lockfile must remain unchanged.

The preparation pass at commit 39cbaaf was local only. Its recovery baseline is retained above; the separately authorized cutover is recorded at the top of this document.

## Implementation

Astro now uses `site: https://astroduck17.github.io` and `base: /`. The existing href helper already supports root hosting. All normal navigation, images, self-hosted fonts/CSS, favicon, CV links, canonical URLs and Open Graph URLs resolve at root. The 404 canonical now names the actual `/404.html` artifact.

`src/pages/personal_page/[...path].ts` enumerates the published collections and existing topics, independently of review mode. It emits concrete index.html compatibility files, plus the four existing HTML aliases. There is no runtime catch-all: unknown paths and draft addresses remain absent. Directory bookmarks and explicit index.html bookmarks use the same files. Existing root HTML aliases use the same redirect renderer.

`src/lib/redirects.ts` generates HTML with a final canonical, noindex metadata, a usable link and `location.replace`. The script preserves the incoming query string (including repeated/encoded parameters) and fragment, updates the fallback link, and uses the current origin for local and public hosting. Aliases map straight to final pages rather than another alias. With scripting disabled, the noscript refresh and ordinary link still reach the final page, but static HTML cannot dynamically append arbitrary query strings; full query/fragment preservation uses JavaScript. These are HTTP 200 HTML documents, not HTTP 301 redirects.

`scripts/compatibility-assets.mjs` copies the approved CV after the build to `/personal_page/cv.pdf`; both URLs contain identical bytes. The existing workflow already runs build and verification, so it needs no change. No package/dependency/lockfile, design, prose, résumé data or original CV changes are required.

## Local validation

Run Node 24 using the existing scripts; see README for the bundled executable:

```sh
npm run check
npm run build
npm run verify
npm run preview -- --host 127.0.0.1 --port 4330
# In another terminal:
node scripts/verify-preview.mjs http://127.0.0.1:4330
```

The build verifier independently reads content frontmatter to calculate published and draft routes. It checks canonical/sharing URLs, internal links/fragments, fonts/assets, HTML structure, all expected compatibility pages and final destinations, loop prevention, redirect script behavior, both CV checksums and absence of draft/unknown compatibility output. The preview checker tests actual HTTP responses, including real 404 status codes. Browser tests are also required for navigation and URL-state preservation.

### Results of this local pass

- Astro check: zero errors, warnings and hints.
- Release: 45 HTML files (19 rendered pages, four root aliases, 22 old-path redirects), plus both CV files. Review: 46 HTML files; its draft exists only at the root review route, with no compatibility copy. Both modes passed the expanded verifier. Final dist is release mode.
- Production preview: http://127.0.0.1:4330/. All 35 HTTP checks passed: seven representative root pages, every old compatibility HTML URL, four genuine unknown/draft 404s and both CV downloads.
- Browser: Home, Projects, MetaFam, Résumé, Writing, Quantum topic and a genuine missing page inspected at 1440×1000 and 390×844. No horizontal overflow; original images loaded. Normal and old-prefix missing URLs display the custom 404. Production fonts, favicon and local asset files are present and linked at root.
- Real browser redirects passed for the old homepage, MetaFam detail, résumé HTML alias and projects HTML alias. Repeated query parameters, encoded plus sign and section fragments remained intact; section IDs existed at final destinations.
- Negative verifier tests rejected an obsolete normal prefix, redirect loop, changed old-path CV and injected draft compatibility page. Temporary fixture changes were restored; final release verification passed again.
- Git comparison confirms no changes to package.json, package-lock.json, original CV, content collections, résumé/topic data, styles or deployment workflow. No remote operations or publication performed.
- Screenshots are ignored local artifacts: `.qa/root-{home,projects,metafam,resume,writing,topic,404}-{desktop,mobile}.jpg`.

No implementation issue remains from these checks. GitHub user-site routing and the renamed repository's first Actions deployment were subsequently verified during cutover. Query/fragment retention with scripting disabled has the static-HTML limitation described above.

## Approved cutover procedure (completed)

1. Approve the local production preview and commit the reviewed migration locally on main. Confirm the working tree is clean. Retain the recovery commit above.
2. Check that the account does not already have a user-site repository named `astroduck17.github.io`. GitHub permits one user site per account; resolve any collision before renaming.
3. Open the **existing** repository → Settings → General → Repository name. Change `personal_page` to `astroduck17.github.io` and click Rename. Do not create a fresh repository or copy history.
4. In the local checkout, run the following only during the approved cutover:

```sh
git remote set-url origin https://github.com/AstroDuck17/astroduck17.github.io.git
git remote -v
git push origin main
```

5. In the renamed repository, confirm Settings → Pages → Build and deployment → Source is **GitHub Actions**. Keep the custom-domain field empty. Check that the github-pages environment still permits deployment from main. Do not add the old repository prefix to Astro.
6. Watch `.github/workflows/deploy.yml` for the migration commit. If a run was triggered by renaming before the new code was pushed, verify the final successful run uses the root-migration commit; dispatch the workflow on main if needed.
7. Open `https://astroduck17.github.io/`. Test Home, Projects, a detail page, Résumé, Writing, a topic, fonts/images, favicon, both CV URLs and a genuine missing URL.
8. Test `https://astroduck17.github.io/personal_page/projects/metafam/?from=old&tag=a&tag=b%2Bc#my-contribution` and `https://astroduck17.github.io/personal_page/resume.html?via=bookmark#education`. Confirm they arrive directly at the corresponding root pages with queries/fragments intact. Confirm the draft's old and new URLs return 404.
9. Do not recreate a repository called personal_page to provide redirects. The compatibility files already live in the user-site build; a separate project site could interfere with those paths. Keep this compatibility layer for old bookmarks.

## Recovery

Before publication, the original live site is unaffected. The baseline commit restores the pre-migration implementation. Once preparation is committed, a local revert of the migration commit is the reviewable code rollback; do not reset away unrelated work.

After cutover, coordinate a repository-name rollback to personal_page, restore the baseline project-path configuration, update origin back to the recorded URL and redeploy that matching configuration. Reverting code alone while leaving the repository named astroduck17.github.io would mismatch hosting and base paths. Expect a short publication transition; the root-hosted compatibility files only exist after the root artifact is live.

Sources: [GitHub repository rename behavior](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository) (GitHub does not redirect project-site URLs for a rename), [user-site naming](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Astro static endpoints](https://docs.astro.build/en/guides/endpoints/).
