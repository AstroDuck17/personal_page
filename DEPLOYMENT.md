# Deployment and domain plan

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

## Domain choices

No domain is owned yet. Suggested names below are ideas, not availability confirmations.

| Option | Fit | Cost consideration |
| --- | --- | --- |
| Existing GitHub URL | Works immediately; no domain maintenance | No domain purchase |
| yashavbhatnagar.com | My first choice for a lasting personal/research identity | Standard .com at Cloudflare currently lists US$10.46 registration and annual renewal; verify the exact name and checkout total |
| yashavbhatnagar.in | A name-based alternative with an Indian identity | Compare retail renewal prices through an accredited .in registrar |
| astroduck.dev | Uses the existing handle | Compare recurring price before choosing |
| Student-pack domain | Useful for trying a domain before paying yearly | Eligible students currently have a one-year .me offer via Namecheap and selected extensions via Name.com; renewal is a separate decision |

Cloudflare Registrar is a reasonable .com option for transparent recurring prices; it requires Cloudflare nameservers. Porkbun is another registrar to compare using registration AND renewal prices. Domain ownership is independent of hosting: no paid hosting plan or purchased SSL certificate is needed for this GitHub Pages site.

Sources: [Cloudflare prices](https://pricing.registrar.cloudflare.com/), [Cloudflare nameserver requirements](https://developers.cloudflare.com/registrar/get-started/register-domain/), [Porkbun pricing](https://porkbun.com/products/domains), [.in registrars](https://www.registry.in/accredited-registrars), [GitHub Student Developer Pack](https://education.github.com/pack).

## Migration after a name is chosen and registered

Use the root domain as the preferred address, with www also configured. First verify ownership in account-level GitHub Pages settings using its TXT record; keep that record. Add the chosen domain in repository Pages settings before pointing web DNS to GitHub.

For an apex domain, use the GitHub-documented ALIAS/ANAME option or its four A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Point www with a DNS CNAME to AstroDuck17.github.io, without /personal_page. Avoid wildcard records. Allow DNS/certificate provisioning, then enforce HTTPS and verify both addresses. An Actions deployment does not require a repository CNAME file; GitHub's hosting documentation is authoritative for that setting.

Source: [GitHub domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

For this repository specifically, change Astro's site to the selected https domain and remove the /personal_page base so pages live at /. Also update the fixed base in scripts/verify-build.mjs and the hardcoded canonical origin in src/pages/[legacy].html.ts. The shared href helper already follows Astro's base. Rebuild and test canonical links, fonts, navigation, CV, legacy pages and the old public URLs before considering migration complete. Keep the existing URL configuration until the domain is ready.

Source: [Astro GitHub Pages configuration](https://docs.astro.build/en/guides/deploy/github/).

No domain, DNS, repository setting or remote deployment was changed while preparing this plan.
