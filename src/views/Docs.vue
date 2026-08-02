<template>
  <section class="relative isolate overflow-hidden bg-[#111113] pt-20 text-slate-100">
    <div class="pointer-events-none absolute inset-0 grid-overlay"></div>

    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <div class="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
        <p class="mono-kicker">Documentation</p>
        <h1 class="mt-6 max-w-4xl text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.1] text-slate-100">
          Bring up your own cluster
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Open HomeLab is deployed in order, from the hypervisor to workloads. Each
          stage is declarative — full guides and runbooks live in the repository.
        </p>
        <div class="mt-10">
          <a
            href="https://github.com/open-homelab-io/open-homelab"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-[#111113] transition hover:bg-sky-200"
          >
            Read the docs on GitHub
            <svg class="ml-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7v9"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Bring-up steps -->
      <section class="grid border-b border-white/10 lg:grid-cols-[0.32fr_1fr]">
        <div class="border-b border-white/10 px-5 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          <p class="mono-kicker">Bring-up order</p>
          <h2 class="mt-4 text-2xl font-semibold text-slate-100">From bare metal to GitOps</h2>
        </div>
        <div class="divide-y divide-white/10">
          <article v-for="(step, i) in steps" :key="step.title" class="px-5 py-8 sm:px-8 lg:px-12">
            <div class="flex items-start gap-5">
              <div class="font-mono text-sm text-slate-600">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-slate-100">{{ step.title }}</h3>
                <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{{ step.body }}</p>
                <pre v-if="step.cmd" class="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs leading-6 text-slate-300"><code>{{ step.cmd }}</code></pre>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Reference cards -->
      <section class="grid border-b border-white/10 md:grid-cols-3">
        <article v-for="topic in topics" :key="topic.title" class="border-b border-r border-white/10 px-5 py-8 sm:px-8 md:border-b-0">
          <div class="font-mono text-xs uppercase tracking-[0.18em] text-sky-200/75">{{ topic.label }}</div>
          <h2 class="mt-4 text-xl font-semibold text-slate-100">{{ topic.title }}</h2>
          <p class="mt-3 text-sm leading-6 text-slate-400">{{ topic.body }}</p>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Docs',
  data() {
    return {
      steps: [
        {
          title: 'Provision Proxmox VMs',
          body: 'Configure your Proxmox endpoint and API token, then synthesize and apply the CDKTN stack to create the cluster nodes with predictable static addresses.',
          cmd: 'cp .env.example .env\ncd infra/proxmox\nbun install && bun run get\nbun run synth'
        },
        {
          title: 'Configure the Talos nodes',
          body: 'Generate and apply Talos machine configuration to the VMs, then bootstrap the Kubernetes control plane.',
          cmd: './clusters/production/talos/scripts/generate-config.sh\n./clusters/production/talos/scripts/apply-config.sh\n./clusters/production/talos/scripts/bootstrap.sh'
        },
        {
          title: 'Hand the cluster to Argo CD',
          body: 'Bootstrap Argo CD and point the root app-of-apps at the platform. From here, Git is the source of truth for every component.',
          cmd: 'GITOPS_ROOT_PATH=clusters/production/gitops scripts/bootstrap-argocd.sh'
        },
        {
          title: 'Platform and workloads sync',
          body: 'Argo CD reconciles ingress, identity, secrets, storage, observability, and your workloads automatically — no manual apply loop.',
          cmd: null
        }
      ],
      topics: [
        {
          label: 'Reference',
          title: 'Architecture layers',
          body: 'How the repo is split by responsibility — infrastructure, machine config, cluster bootstrap, platform, and workloads.'
        },
        {
          label: 'Runbook',
          title: 'Identity & secrets',
          body: 'Keycloak single sign-on and OpenBao secret management, wired to the cluster through External Secrets.'
        },
        {
          label: 'Runbook',
          title: 'Optional AWS',
          body: 'Enable Route 53 DNS-01, ExternalDNS, and S3-backed OpenTofu state through IAM Roles Anywhere — opt-in only.'
        }
      ]
    }
  }
}
</script>
