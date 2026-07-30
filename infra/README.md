# Open HomeLab — Infrastructure (AWS CDK)

Provisions the hosting for the static site:

- **S3** private bucket (no public access; encrypted; TLS enforced)
- **CloudFront** distribution with **Origin Access Control**, HTTP/2+3, TLS 1.2_2021,
  and SPA-friendly error responses (403/404 → `/index.html` with `200`)
- **ACM** DNS-validated certificate for the site domain (us-east-1)
- **Route 53** apex `A`/`AAAA` alias records → CloudFront (other zone records untouched)
- **GitHub OIDC provider + deploy role** (`github-actions-open-homelab-deploy`), scoped to
  `repo:open-homelab-io/website:*`, allowed only to write the bucket and invalidate the
  distribution — so CI needs **no** long-lived AWS keys

## Nothing sensitive is committed

The AWS account id is read from your environment (`CDK_DEFAULT_ACCOUNT`) at deploy time
and never written to the repo. Only public values (domain, hosted zone id, repo name)
live in `cdk.json`. The deploy role ARN (which embeds the account id) is a stack
**output** you copy into a GitHub secret — it is not in source control.

> **Placeholder values:** update `domainName` and `hostedZoneId` in `cdk.json` to the
> real Open HomeLab domain and its Route 53 hosted zone before deploying.

## Prerequisites

- Node 18+ and AWS credentials for the target account (e.g. `aws sso login`)
- The account is already CDK-bootstrapped in us-east-1

```bash
cd infra
npm install
npm run synth   # sanity check — no AWS calls beyond credential/context lookups
```

## Deploy

Stand the site up first on its CloudFront URL (`enableCustomDomain` defaults to `false`),
verify it, then cut the domain over:

```bash
cd infra
npm run deploy                              # serves on the *.cloudfront.net URL
npm run deploy -- -c enableCustomDomain=true  # attaches the custom domain + Route 53
```

Use the stack outputs to configure GitHub Actions:

- Secret `AWS_DEPLOY_ROLE_ARN` = `DeployRoleArn`
- Variable `S3_BUCKET` = `BucketName`
- Variable `CLOUDFRONT_DISTRIBUTION_ID` = `DistributionId`

## Useful commands

```bash
npm run synth    # emit the CloudFormation template
npm run diff     # diff deployed stack vs local
npm run deploy   # deploy changes
```
