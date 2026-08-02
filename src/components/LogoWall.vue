<template>
  <section class="relative isolate overflow-hidden bg-[#111113] text-slate-100">
    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <div class="border-b border-white/10 px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="mono-kicker">Powered by open source</p>
            <h2 class="mt-3 text-2xl font-semibold text-slate-100">Standing on great projects</h2>
          </div>
          <router-link to="/stack" class="inline-flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-sky-200">
            Explore the full stack
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>

        <div class="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div
            v-for="logo in logos"
            :key="logo.name"
            class="group flex flex-col items-center gap-2"
            :title="logo.name"
          >
            <div class="logo-chip aspect-square w-full max-w-[72px] p-3 grayscale transition duration-300 group-hover:grayscale-0">
              <img :src="logo.src" :alt="logo.name" class="h-full w-full" loading="lazy" />
            </div>
            <span class="text-center text-[10px] leading-tight text-slate-500 transition-colors group-hover:text-slate-300">{{ logo.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LogoWall',
  data() {
    return {
      logos: [
        { name: 'Proxmox', src: '/logos/proxmox.svg' },
        { name: 'Talos', src: '/logos/talos.svg' },
        { name: 'CDKTN', src: '/logos/cdktn.svg' },
        { name: 'OpenTofu', src: '/logos/opentofu.svg' },
        { name: 'Argo CD', src: '/logos/argocd.svg' },
        { name: 'Harbor', src: '/logos/harbor.svg' },
        { name: 'MetalLB', src: '/logos/metallb.svg' },
        { name: 'Traefik', src: '/logos/traefik.svg' },
        { name: 'cert-manager', src: '/logos/cert-manager.svg' },
        { name: 'ExternalDNS', src: '/logos/external-dns.png' },
        { name: 'Keycloak', src: '/logos/keycloak.svg' },
        { name: 'OpenBao', src: '/logos/openbao.svg' },
        { name: 'External Secrets', src: '/logos/external-secrets.svg' },
        { name: 'Longhorn', src: '/logos/longhorn.svg' },
        { name: 'CloudNativePG', src: '/logos/cloudnative-pg.svg' },
        { name: 'Grafana', src: '/logos/grafana.svg' },
        { name: 'Loki', src: '/logos/loki.svg' },
        { name: 'Tempo', src: '/logos/tempo.svg' },
        { name: 'Mimir', src: '/logos/mimir.svg' },
        { name: 'Alloy', src: '/logos/alloy.svg' }
      ]
    }
  }
}
</script>
