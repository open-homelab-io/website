<template>
  <section id="home" class="relative isolate overflow-hidden bg-[#111113] pt-20 text-slate-100">
    <div class="pointer-events-none absolute inset-0 grid-overlay"></div>

    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <div class="grid min-h-[42rem] grid-cols-1 border-b border-white/10 lg:grid-cols-[0.95fr_1.05fr]">
        <div class="flex flex-col justify-center border-b border-white/10 px-5 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          <p class="mono-kicker">Open source · Self-hosted · GitOps</p>
          <h1 class="mt-6 max-w-4xl text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.08] tracking-normal text-slate-100">
            Open HomeLab
          </h1>
          <p class="mt-5 max-w-2xl text-2xl font-semibold leading-tight text-slate-100">
            A code-first homelab, from bare metal to workloads.
          </p>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Proxmox and Talos provisioned as code, a Kubernetes platform delivered
            by Argo CD, and an all-open-source stack for identity, secrets, storage,
            and full LGTM observability — every layer reproducible from Git.
          </p>

          <div class="mt-7 flex flex-wrap gap-2">
            <span class="badge badge-green"><span>license</span><span>Apache-2.0</span></span>
            <span class="badge badge-amber"><span>PRs</span><span>welcome</span></span>
            <span class="badge"><span>built</span><span>in the open</span></span>
          </div>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/open-homelab-io/open-homelab"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-[#111113] transition hover:bg-sky-200"
            >
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.09 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
              </svg>
              Star on GitHub
            </a>
            <router-link
              to="/docs"
              class="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-200/60 hover:text-sky-200"
            >
              Quickstart
            </router-link>
          </div>
        </div>

        <div class="relative flex min-h-[34rem] items-center px-5 py-10 sm:px-8 lg:px-12">
          <div class="term w-full">
            <div class="term-header">
              <span class="h-3 w-3 rounded-full bg-red-400/70"></span>
              <span class="h-3 w-3 rounded-full bg-amber-300/70"></span>
              <span class="h-3 w-3 rounded-full bg-emerald-300/70"></span>
              <span class="ml-3 text-xs text-slate-500">~/open-homelab — zsh</span>
            </div>
            <div class="term-body">
              <p v-for="(line, i) in terminal" :key="i" :class="lineClass(line)">
                <span v-if="line.type === 'cmd'" class="text-emerald-300">$ </span>{{ line.text }}<span v-if="i === terminal.length - 1" class="cursor-blink align-middle ml-1"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      terminal: [
        { type: 'cmd', text: 'git clone https://github.com/open-homelab-io/open-homelab' },
        { type: 'cmd', text: 'cd open-homelab && cp .env.example .env' },
        { type: 'blank', text: '' },
        { type: 'comment', text: '# 1 · provision proxmox vms (cdktn + opentofu)' },
        { type: 'cmd', text: 'cd infra/proxmox && bun install && bun run synth' },
        { type: 'blank', text: '' },
        { type: 'comment', text: '# 2 · bring up talos linux + kubernetes' },
        { type: 'cmd', text: './clusters/production/talos/scripts/bootstrap.sh' },
        { type: 'blank', text: '' },
        { type: 'comment', text: '# 3 · hand off to argo cd — git is the source of truth' },
        { type: 'cmd', text: 'scripts/bootstrap-argocd.sh' },
        { type: 'ok', text: '✓ platform apps syncing from git' },
        { type: 'cmd', text: '' }
      ]
    }
  },
  methods: {
    lineClass(line) {
      switch (line.type) {
        case 'comment': return 'text-slate-600'
        case 'ok': return 'text-emerald-300'
        case 'blank': return 'h-2'
        default: return 'text-slate-300'
      }
    }
  }
}
</script>
