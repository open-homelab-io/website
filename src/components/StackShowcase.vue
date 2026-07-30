<template>
  <section class="relative isolate overflow-hidden bg-[#111113] text-slate-100" :class="withHeader ? 'pt-20' : ''">
    <div class="pointer-events-none absolute inset-0 grid-overlay"></div>

    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <div v-if="withHeader" class="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
        <p class="mono-kicker">The stack</p>
        <h1 class="mt-6 max-w-4xl text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.1] text-slate-100">
          Every tool, configured as code
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          The open source components that make up Open HomeLab — provisioned,
          deployed, and kept in sync by GitOps. Swap or extend any piece without
          rewiring the rest of the cluster.
        </p>
      </div>

      <div v-else class="border-b border-white/10 px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
        <p class="mono-kicker">The stack</p>
        <h2 class="mt-4 text-3xl font-semibold leading-tight text-slate-100">Open source, top to bottom</h2>
        <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
          Best-in-class components for infrastructure, delivery, identity, storage,
          and observability — all deployed and reconciled from Git.
        </p>
      </div>

      <div v-for="category in categories" :key="category.name" class="grid border-b border-white/10 lg:grid-cols-[0.32fr_1fr]">
        <div class="border-b border-white/10 px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          <div class="flex items-center gap-3">
            <span :class="['system-dot', category.dot]"></span>
            <h3 class="text-xl font-semibold text-slate-100">{{ category.name }}</h3>
          </div>
          <p class="mt-3 text-sm leading-6 text-slate-400">{{ category.blurb }}</p>
        </div>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="tool in category.tools"
            :key="tool.name"
            class="group flex flex-col border-b border-r border-white/10 px-5 py-6 transition duration-300 hover:bg-white/[0.04] sm:px-6"
          >
            <div class="flex items-center gap-3">
              <div v-if="tool.icon" class="logo-chip h-10 w-10 p-1.5">
                <img :src="tool.icon" :alt="tool.name" class="h-full w-full" loading="lazy" />
              </div>
              <div v-else class="logo-chip h-10 w-10 !bg-white/5 !ring-white/10">
                <span class="font-mono text-sm font-bold text-slate-300">{{ tool.name.charAt(0) }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="truncate text-base font-semibold text-slate-100">{{ tool.name }}</h4>
                <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{{ tool.tag }}</span>
              </div>
            </div>
            <p class="mt-3 flex-1 text-sm leading-6 text-slate-400">{{ tool.body }}</p>
            <a
              v-if="tool.link"
              :href="tool.link"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex w-fit items-center gap-1 font-mono text-[11px] text-slate-500 transition-colors group-hover:text-sky-200"
            >
              upstream
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7v9"></path>
              </svg>
            </a>
          </article>
        </div>
      </div>

      <div class="px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
        <p class="text-sm text-slate-500">
          Optional AWS integrations (Route 53, S3-backed Terraform state, IAM Roles
          Anywhere) are opt-in and disabled by default.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StackShowcase',
  props: {
    withHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categories: [
        {
          name: 'Infrastructure',
          dot: 'bg-sky-300',
          blurb: 'Compute and machine configuration declared as code, from the hypervisor up.',
          tools: [
            { name: 'Proxmox VE', tag: 'virtualization', icon: '/logos/proxmox.svg', body: 'Bare-metal hypervisor hosting the cluster VMs, provisioned with CDKTN and the bpg/proxmox Terraform provider.', link: 'https://www.proxmox.com/en/proxmox-virtual-environment' },
            { name: 'Talos Linux', tag: 'kubernetes os', icon: '/logos/talos.svg', body: 'Immutable, API-driven operating system for the Kubernetes nodes — no SSH, fully declarative machine config.', link: 'https://www.talos.dev' },
            { name: 'CDKTN', tag: 'iac', icon: '/logos/cdktn.svg', body: 'TypeScript-authored infrastructure as code (CDK for Terraform) that synthesizes and applies the Proxmox and AWS layers.', link: 'https://cdktn.io' },
            { name: 'Terraform', tag: 'provisioning', icon: '/logos/terraform.svg', body: 'The provisioning engine CDKTN synthesizes to, driving the bpg/proxmox provider that creates the VMs.', link: 'https://www.terraform.io' }
          ]
        },
        {
          name: 'GitOps & Registry',
          dot: 'bg-emerald-300',
          blurb: 'Continuous delivery and a private supply chain for the whole cluster.',
          tools: [
            { name: 'Argo CD', tag: 'gitops', icon: '/logos/argocd.svg', body: 'App-of-apps continuous delivery that reconciles every platform and workload from the Git repository.', link: 'https://argo-cd.readthedocs.io' },
            { name: 'Harbor', tag: 'registry', icon: '/logos/harbor.svg', body: 'Private OCI container registry with vulnerability scanning and Keycloak single sign-on.', link: 'https://goharbor.io' }
          ]
        },
        {
          name: 'Networking & Ingress',
          dot: 'bg-cyan-300',
          blurb: 'Bare-metal load balancing, ingress, and automated certificates.',
          tools: [
            { name: 'MetalLB', tag: 'load balancer', icon: '/logos/metallb.svg', body: 'Assigns real LAN IPs to services from configured address pools on bare metal.', link: 'https://metallb.io' },
            { name: 'Traefik', tag: 'ingress', icon: '/logos/traefik.svg', body: 'Ingress controller terminating and routing traffic to platform and workload services.', link: 'https://traefik.io/traefik' },
            { name: 'cert-manager', tag: 'tls', icon: '/logos/cert-manager.svg', body: 'Automated certificate issuance and renewal, with optional Route 53 DNS-01 challenges.', link: 'https://cert-manager.io' },
            { name: 'ExternalDNS', tag: 'dns', icon: '/logos/external-dns.png', body: 'Keeps DNS records in sync with cluster services via Route 53 (optional, AWS opt-in).', link: 'https://github.com/kubernetes-sigs/external-dns' }
          ]
        },
        {
          name: 'Identity & Secrets',
          dot: 'bg-amber-300',
          blurb: 'Single sign-on and a secrets backend that keeps credentials out of Git.',
          tools: [
            { name: 'Keycloak', tag: 'sso / oidc', icon: '/logos/keycloak.svg', body: 'OIDC identity provider delivering single sign-on across Harbor, Grafana, Longhorn, and more.', link: 'https://www.keycloak.org' },
            { name: 'OpenBao', tag: 'secrets', icon: '/logos/openbao.svg', body: 'Open source secrets backend with Raft storage on Longhorn, reached through Kubernetes auth.', link: 'https://openbao.org' },
            { name: 'External Secrets Operator', tag: 'sync', icon: '/logos/external-secrets.svg', body: 'Syncs secrets from OpenBao into Kubernetes so manifests reference names, never values.', link: 'https://external-secrets.io' }
          ]
        },
        {
          name: 'Storage & Data',
          dot: 'bg-indigo-300',
          blurb: 'Replicated block storage and managed PostgreSQL for stateful services.',
          tools: [
            { name: 'Longhorn', tag: 'block storage', icon: '/logos/longhorn.svg', body: 'Distributed, replicated block storage providing the default storage class for the cluster.', link: 'https://longhorn.io' },
            { name: 'CloudNativePG', tag: 'postgres', icon: '/logos/cloudnative-pg.svg', body: 'Kubernetes operator running PostgreSQL for platform services that need a database.', link: 'https://cloudnative-pg.io' }
          ]
        },
        {
          name: 'Observability (LGTM)',
          dot: 'bg-rose-300',
          blurb: 'The full Grafana stack for logs, metrics, and traces.',
          tools: [
            { name: 'Grafana', tag: 'dashboards', icon: '/logos/grafana.svg', body: 'Unified dashboards and alerting across every signal in the cluster.', link: 'https://grafana.com/oss/grafana' },
            { name: 'Loki', tag: 'logs', icon: '/logos/loki.svg', body: 'Horizontally scalable log aggregation for cluster and workload logs.', link: 'https://grafana.com/oss/loki' },
            { name: 'Tempo', tag: 'traces', icon: '/logos/tempo.svg', body: 'Distributed tracing backend for request-level visibility.', link: 'https://grafana.com/oss/tempo' },
            { name: 'Mimir', tag: 'metrics', icon: '/logos/mimir.svg', body: 'Long-term, highly available Prometheus-compatible metrics storage.', link: 'https://grafana.com/oss/mimir' },
            { name: 'Grafana Alloy', tag: 'collectors', icon: '/logos/alloy.svg', body: 'k8s-monitoring collectors that scrape and ship metrics, logs, and traces.', link: 'https://grafana.com/oss/alloy' }
          ]
        }
      ]
    }
  }
}
</script>
