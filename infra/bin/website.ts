#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WebsiteStack } from '../lib/website-stack';

const app = new cdk.App();

// Public, non-sensitive config lives in cdk.json context. The AWS account is
// taken from the deployer's environment so it is never committed to the repo.
const domainName = app.node.tryGetContext('domainName') as string;
const hostedZoneId = app.node.tryGetContext('hostedZoneId') as string;
const githubOwner = app.node.tryGetContext('githubOwner') as string;
const githubRepo = app.node.tryGetContext('githubRepo') as string;

// Defaults to false so the stack stands up on its CloudFront URL for testing.
// Cut over with:  cdk deploy -c enableCustomDomain=true
const enableCustomDomain = app.node.tryGetContext('enableCustomDomain') === 'true';

// GitHub's account-level OIDC provider is a singleton. Set context
// createOidcProvider=false when the account already has one to import it.
const createOidcProvider = app.node.tryGetContext('createOidcProvider') !== 'false';

// Optional override for the OIDC subject-claim pattern (needed for GitHub orgs
// that use immutable subject claims with numeric owner/repo ids).
const oidcSubjectClaim = app.node.tryGetContext('oidcSubjectClaim') as string | undefined;

new WebsiteStack(app, 'OpenHomeLabWebsite', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    // CloudFront ACM certificates must live in us-east-1.
    region: 'us-east-1',
  },
  domainName,
  hostedZoneId,
  githubOwner,
  githubRepo,
  enableCustomDomain,
  createOidcProvider,
  oidcSubjectClaim,
  description: 'Static website hosting for Open HomeLab (S3 + CloudFront + GitHub OIDC deploy role).',
});
