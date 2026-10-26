# Deployment guide

Researched 26 October 2026. Work directly on main; no separate publishing branch.

## Verified current state

GitHub's authenticated read-only API reports build_type=workflow, HTTPS enforced, status=built and no custom domain. Current URL: https://astroduck17.github.io/personal_page/.

The latest remote commit inspected was 175d122. Both deployment workflows successfully deployed it: [added workflow](https://github.com/AstroDuck17/personal_page/actions/runs/40233737015) and [earlier workflow](https://github.com/AstroDuck17/personal_page/actions/runs/40233736947). The hosting service is still GitHub Pages; GitHub Actions now builds and publishes its files instead of publishing directly from a branch.

## Prepared cleanup

Only .github/workflows/deploy.yml remains. It retains the previously successful explicit build pipeline: npm ci, check, build, verify, upload dist, deploy. Node 24 matches this project's package.json; the previous 22.23.4 version met Astro's installed engine requirement but differed from the project's declared engine.

The workflow excludes review drafts, grants deployment permissions only to the deploy job, prevents overlapping runs for the same ref, sets job timeouts and deploys only main. Pull requests can run checks without publishing. Manual execution is available. This does not require personal access tokens or a separate gh-pages branch.

Versions are retained from the earlier successful workflow rather than upgraded during consolidation. YAML parsing and local build checks cannot confirm a GitHub-hosted run; verify the first run after this change is pushed.

Source: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [deployment concurrency](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

## Publishing and recovery

1. Run npm run check, npm run build and npm run verify using Node 24.
2. Commit reviewed changes on main. Push with git push origin main when publication is approved.
3. Check the single workflow's build and deploy jobs. Open Home, a project, the CV download, a legacy HTML route and a missing route on the public site. Confirm the draft URL is absent.
4. If a release is bad, use git revert on its commit, then push main again. Prefer this over rewriting shared main history. If the build fails, resolve the reported check before rerunning; deployment depends on a successful build.

## Site address

Keep the default GitHub Pages address: https://astroduck17.github.io/personal_page/. The owner cancelled custom-domain exploration on 26 October 2026. No domain registration or DNS migration is planned. Keep Astro's current site origin and /personal_page base.
