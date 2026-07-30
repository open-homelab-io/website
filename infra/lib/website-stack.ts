import {
  Stack,
  StackProps,
  RemovalPolicy,
  Duration,
  CfnOutput,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface WebsiteStackProps extends StackProps {
  /** Apex domain the site is served from, e.g. "open-homelab.io". */
  readonly domainName: string;
  /** Existing Route 53 public hosted zone id for the domain. */
  readonly hostedZoneId: string;
  /** GitHub org/user that owns the source repo. */
  readonly githubOwner: string;
  /** GitHub repository name. */
  readonly githubRepo: string;
  /**
   * Whether to create the account-level GitHub Actions OIDC provider. There can
   * only be one provider per URL per account, so set this to `false` when the
   * account already has `token.actions.githubusercontent.com` registered (e.g.
   * from another project) and the stack will import the existing one instead.
   */
  readonly createOidcProvider: boolean;
  /**
   * OIDC subject-claim pattern the deploy role trusts. Defaults to the classic
   * `repo:<owner>/<repo>:*`. GitHub orgs with immutable subject claims encode
   * numeric ids (e.g. `repo:owner@<orgId>/repo@<repoId>:*`); pass that here so
   * the trust condition matches the token GitHub actually issues.
   */
  readonly oidcSubjectClaim?: string;
  /**
   * Whether to attach the custom domain to the distribution and point the apex
   * Route 53 records at it.
   *
   * Leave `false` to stand the site up first — it serves from its own
   * `*.cloudfront.net` URL while you test. Flip to `true` to cut the domain over
   * to this stack. The ACM certificate is created either way, so it is already
   * issued and validated when you cut over.
   */
  readonly enableCustomDomain: boolean;
}

/**
 * Static website hosting for the Open HomeLab site: a private S3 bucket fronted
 * by CloudFront (Origin Access Control), plus a GitHub OIDC role that CI assumes
 * to publish the built assets. No long-lived AWS credentials are involved.
 */
export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props);

    const { domainName, hostedZoneId, githubOwner, githubRepo, enableCustomDomain, createOidcProvider } = props;

    // GitHub orgs with immutable subject claims put numeric ids in the OIDC sub
    // (repo:owner@<orgId>/repo@<repoId>:*), so allow overriding the classic form.
    const oidcSubjectClaim = props.oidcSubjectClaim ?? `repo:${githubOwner}/${githubRepo}:*`;

    // Import the existing zone. We only add the apex website records below and
    // deliberately leave every other record (MX, subdomains, etc.) untouched.
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId,
      zoneName: domainName,
    });

    // Certificate is created up front (DNS-validated) so it's ready before the
    // cutover. CloudFront requires it in us-east-1, which this stack is pinned to.
    const certificate = new acm.Certificate(this, 'SiteCertificate', {
      domainName,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // Private content bucket — reachable only through CloudFront via OAC.
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // Content is fully reproducible from git + CI, so the bucket is disposable.
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      comment: `${domainName} static site`,
      defaultRootObject: 'index.html',
      // Only claim the custom domain once we're ready to cut over. Until then the
      // distribution serves on its default CloudFront domain for testing.
      domainNames: enableCustomDomain ? [domainName] : undefined,
      certificate: enableCustomDomain ? certificate : undefined,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      // SPA routing: hand client-side routes and missing keys back to index.html
      // with a 200 so Vue Router and crawlers behave.
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(0),
        },
      ],
    });

    // Point the apex at CloudFront (IPv4 + IPv6) only during cutover. Upserts
    // only these records; the rest of the hosted zone is left alone.
    if (enableCustomDomain) {
      const aliasTarget = route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution));
      new route53.ARecord(this, 'SiteAliasA', {
        zone: hostedZone,
        recordName: domainName,
        target: aliasTarget,
      });
      new route53.AaaaRecord(this, 'SiteAliasAAAA', {
        zone: hostedZone,
        recordName: domainName,
        target: aliasTarget,
      });
    }

    // --- GitHub Actions OIDC deploy role (no stored AWS keys) ------------------

    // GitHub's OIDC provider is one-per-account. Create it if this account does
    // not have it yet; otherwise import the existing one so we don't collide.
    const githubOidc = createOidcProvider
      ? new iam.OpenIdConnectProvider(this, 'GitHubOidcProvider', {
          url: 'https://token.actions.githubusercontent.com',
          clientIds: ['sts.amazonaws.com'],
        })
      : iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
          this,
          'GitHubOidcProvider',
          `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`,
        );

    // Only workflows in this repo may assume the role.
    const deployRole = new iam.Role(this, 'GitHubDeployRole', {
      roleName: 'github-actions-open-homelab-deploy',
      description: 'Assumed by GitHub Actions to publish the Open HomeLab site to S3 and invalidate CloudFront.',
      assumedBy: new iam.WebIdentityPrincipal(githubOidc.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': oidcSubjectClaim,
        },
      }),
    });

    // Least privilege: write the bucket, invalidate this one distribution.
    siteBucket.grantReadWrite(deployRole);
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [`arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`],
      }),
    );

    // Outputs feed the GitHub repo secret/variables (see infra/README.md).
    new CfnOutput(this, 'BucketName', { value: siteBucket.bucketName });
    new CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'Test the new site here before cutover.',
    });
    new CfnOutput(this, 'DeployRoleArn', {
      value: deployRole.roleArn,
      description: 'Set as the GitHub secret AWS_DEPLOY_ROLE_ARN.',
    });
    new CfnOutput(this, 'CustomDomainEnabled', { value: String(enableCustomDomain) });
  }
}
