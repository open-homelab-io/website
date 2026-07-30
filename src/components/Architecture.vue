<template>
  <section class="relative isolate overflow-hidden bg-[#111113] pt-20 text-slate-100">
    <div class="pointer-events-none absolute inset-0 grid-overlay"></div>

    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <div class="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
        <p class="mono-kicker">Architecture</p>
        <h1 class="mt-6 max-w-4xl text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.1] text-slate-100">
          Five layers, split by responsibility
        </h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Each layer is declarative and versioned. Compute, OS, cluster bootstrap,
          platform, and workloads are separate concerns you can reason about — and
          rebuild — independently.
        </p>
      </div>

      <div class="grid border-b border-white/10 sm:grid-cols-2 xl:grid-cols-3">
        <article v-for="layer in layers" :key="layer.n" class="border-b border-r border-white/10 px-5 py-8 sm:px-8">
          <div class="font-mono text-xs uppercase tracking-[0.18em] text-sky-200/75">Layer {{ layer.n }}</div>
          <h3 class="mt-3 text-lg font-semibold text-slate-100">{{ layer.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-400">{{ layer.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Architecture',
  data() {
    return {
      layers: [
        {
          n: 1,
          title: 'Proxmox infrastructure',
          body: 'VM shape, static addresses, and provider settings declared with CDKTF and the bpg/proxmox Terraform provider.'
        },
        {
          n: 2,
          title: 'Machine configuration',
          body: 'Immutable, declarative host OS for the Kubernetes nodes — versionable and reproducible.'
        },
        {
          n: 3,
          title: 'Cluster bootstrap',
          body: 'The minimal manifests that let Argo CD take over: install values, app-of-apps entrypoint, and repo credentials.'
        },
        {
          n: 4,
          title: 'Platform',
          body: 'Shared cluster capabilities: ingress, load balancing, TLS, identity, secrets, storage, databases, and observability.'
        },
        {
          n: 5,
          title: 'Workloads',
          body: 'A GitOps-managed slot for user-facing apps you can add or remove without touching cluster foundations. Wired up and ready for your own workloads.'
        },
        {
          n: '＋',
          title: 'Optional AWS',
          body: 'Opt-in Route 53 DNS-01 and ExternalDNS via IAM Roles Anywhere, plus S3-backed Terraform state. Off by default.'
        }
      ]
    }
  }
}
</script>
