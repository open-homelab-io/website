# Open HomeLab — Website

The marketing/docs site for **Open HomeLab**, a code-first, GitOps homelab and the
open source companion to the `homelab-v2` project. Built with Vue 3, Vite, and
Tailwind CSS and deployed to AWS S3 + CloudFront.

The site is branded around the open source stack that Open HomeLab actually
provisions and deploys:

- **Infrastructure** — Proxmox VE (via CDKTF + Terraform), Talos Linux
- **GitOps & registry** — Argo CD, Harbor
- **Networking** — MetalLB, Traefik, cert-manager, ExternalDNS
- **Identity & secrets** — Keycloak (OIDC SSO), OpenBao, External Secrets Operator
- **Storage & data** — Longhorn, CloudNativePG
- **Observability (LGTM)** — Grafana, Loki, Tempo, Mimir, Grafana Alloy
- **Optional AWS** — Route 53, S3-backed Terraform state, IAM Roles Anywhere

The workloads layer (Home Assistant, game servers, InfluxDB, etc.) is wired for
GitOps but not yet deployed, so the site intentionally lists only what the cluster
actually runs today.

**Live:** _coming soon_

## 🛠️ Tech Stack

- **Vue 3** + **Vue Router**
- **Vite** (build/dev server)
- **Tailwind CSS** + PostCSS + Autoprefixer

## 🚀 Local Development

Requires Node.js 18+.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## 📦 Project Structure

```
src/
├── components/
│   ├── Navbar.vue          # Site navigation
│   ├── Hero.vue            # Landing hero + layered architecture
│   ├── StackShowcase.vue   # Categorized open source tool catalog
│   └── SiteFooter.vue      # Footer
├── views/
│   ├── Home.vue            # Landing page (Hero + Stack)
│   ├── Stack.vue           # Full stack catalog
│   └── Docs.vue            # Cluster bring-up guide
├── router/
│   └── index.js            # Routes + per-page titles/meta
├── App.vue
├── main.js
└── style.css

infra/                      # AWS CDK app (S3 + CloudFront + OIDC deploy role)
```

## ☁️ Infrastructure

Hosting is defined as code with AWS CDK in [`infra/`](infra/) — a private S3 bucket
behind CloudFront (Origin Access Control), an ACM certificate, Route 53 apex records,
and a least-privilege GitHub OIDC role for CI. See [`infra/README.md`](infra/README.md)
for deploy and cutover steps.

> The domain and hosted-zone values in `infra/cdk.json` are placeholders — set them
> to the real Open HomeLab domain and Route 53 zone before deploying.

## 🚀 Deployment

Pushes to `main` are built and deployed automatically by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): the `dist/` build is
synced to S3 and the CloudFront distribution cache is invalidated.

## 📄 License

Released under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for attributions.
