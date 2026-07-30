<template>
  <section class="relative isolate overflow-hidden bg-[#111113] text-slate-100">
    <div class="pointer-events-none absolute inset-0 grid-overlay"></div>

    <div class="relative mx-auto max-w-[92rem] border-x border-white/10">
      <!-- Stat tiles -->
      <div class="grid border-b border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="border-b border-r border-white/10 px-6 py-10 sm:px-8">
          <div class="font-mono text-3xl font-semibold text-sky-100">{{ stat.value }}</div>
          <div class="mt-2 text-sm text-slate-400">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Contribute -->
      <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div class="border-b border-white/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
          <p class="mono-kicker">Built in the open</p>
          <h2 class="mt-4 text-3xl font-semibold leading-tight text-slate-100">
            Fork it, run it, send a PR
          </h2>
          <p class="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Open HomeLab is Apache-2.0 licensed and developed in public. The whole cluster
            is code, so improvements are just pull requests — new workloads, better
            defaults, docs, and dashboards all welcome.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-4">
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
            <a
              href="https://github.com/open-homelab-io/open-homelab"
              target="_blank"
              rel="noopener noreferrer"
              class="gh-star"
            >
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 18.5 5.8 21.2l1.6-7L2 9.5l7.1-.6L12 2z"/></svg>
              Star
            </a>
          </div>
        </div>

        <div class="grid sm:grid-cols-2">
          <a
            v-for="item in ways"
            :key="item.title"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group border-b border-r border-white/10 px-5 py-8 transition duration-300 hover:bg-white/[0.04] sm:px-8"
          >
            <div class="font-mono text-xs uppercase tracking-[0.18em] text-sky-200/75">{{ item.label }}</div>
            <h3 class="mt-3 flex items-center gap-2 text-lg font-semibold text-slate-100">
              {{ item.title }}
              <svg class="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7v9"></path>
              </svg>
            </h3>
            <p class="mt-2 text-sm leading-6 text-slate-400">{{ item.body }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Community',
  data() {
    return {
      stats: [
        { value: '20', label: 'open source components' },
        { value: '5', label: 'declarative layers' },
        { value: 'Apache', label: '2.0 license' },
        { value: '0', label: 'SaaS dependencies' }
      ],
      ways: [
        {
          label: 'Contribute',
          title: 'Open a pull request',
          body: 'Add a workload, tighten a default, or improve a Helm value. Everything is reviewed in the open.',
          href: 'https://github.com/open-homelab-io/open-homelab/pulls'
        },
        {
          label: 'Report',
          title: 'File an issue',
          body: 'Hit a rough edge or found a bug? Open an issue so it can be tracked and fixed.',
          href: 'https://github.com/open-homelab-io/open-homelab/issues'
        },
        {
          label: 'Discuss',
          title: 'Join the conversation',
          body: 'Share your setup, ask questions, and help shape the roadmap in discussions.',
          href: 'https://github.com/open-homelab-io/open-homelab/discussions'
        },
        {
          label: 'Learn',
          title: 'Read the runbooks',
          body: 'Architecture notes and runbooks cover Keycloak, OpenBao, migrations, and more.',
          href: 'https://github.com/open-homelab-io/open-homelab/tree/main/docs'
        }
      ]
    }
  }
}
</script>
