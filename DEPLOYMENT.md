# Deployment guide

## Root-hosting migration pending

The code is locally prepared for https://astroduck17.github.io/ with base `/`. The public project-path site and Git remote have not been changed during preparation. Follow [MIGRATION.md](MIGRATION.md) for the exact rename, cutover and recovery steps. Do not push the root configuration into the old repository before that review.

The owner will rename the existing repository from `personal_page` to `astroduck17.github.io`, preserving history. No custom domain or DNS change is involved. The local checkout folder can retain its current name.

## Retained deployment pipeline

`.github/workflows/deploy.yml` is unchanged by this migration. It uses Node 24, installs the existing lockfile, checks, builds, verifies, uploads dist and deploys on main. Pull requests only validate. Deploy permissions are scoped to the deploy job; same-ref runs are serialized, with bounded job durations.

No new tokens, dependencies, paid hosting, middleware or gh-pages branch are required. The build configuration emits compatibility HTML for published old pages and a byte-identical old-path CV copy before the existing verifier runs. Versions and dependency files remain unchanged.

## Local validation

Run with Node 24 and npm:

```sh
npm run check
npm run build
npm run verify
npm run preview -- --host 127.0.0.1 --port 4330
```

In another terminal:

```sh
node scripts/verify-preview.mjs http://127.0.0.1:4330
```

For editorial review, `npm run build:review` followed by `node scripts/verify-build.mjs --review` verifies review content while still excluding draft compatibility pages. Rebuild normally afterward so dist is the release artifact.

## After the approved cutover

Work directly on main. Run the checks, commit reviewed changes and push main to the renamed repository. Watch the single Actions workflow; confirm both build and deploy succeed. Test root navigation, assets, CV, actual 404s and old compatibility URLs in the browser. A failed build prevents deployment.

For a bad ordinary release, revert its commit and push main again rather than rewriting shared history. The initial root migration also depends on repository naming: reverting only its code while keeping the user-site repository name is not a complete rollback. See MIGRATION.md.

Sources: [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [user-site naming](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [repository renaming](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).