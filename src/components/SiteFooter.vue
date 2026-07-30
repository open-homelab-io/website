<template>
  <footer class="border-t border-white/10 bg-[#111113]">
    <div class="mx-auto max-w-[92rem] border-x border-white/10 px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <div class="overflow-hidden rounded-xl border border-white/10 bg-[#0a0d13] p-2">
            <img src="/open-homelab-logo.png" alt="Open HomeLab" class="h-20 w-20 object-contain" />
          </div>
          <div>
            <div class="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-100">Open HomeLab</div>
            <div class="text-xs text-slate-500">A code-first GitOps homelab</div>
            <a href="https://open-homelab.io" class="mt-1 inline-block font-mono text-xs text-sky-300/80 hover:text-sky-200">open-homelab.io</a>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-6 text-sm">
          <router-link to="/" class="text-slate-400 transition-colors hover:text-sky-200">Home</router-link>
          <router-link to="/stack" class="text-slate-400 transition-colors hover:text-sky-200">Stack</router-link>
          <router-link to="/docs" class="text-slate-400 transition-colors hover:text-sky-200">Docs</router-link>
          <a href="https://github.com/open-homelab-io/open-homelab" target="_blank" rel="noopener noreferrer" class="text-slate-400 transition-colors hover:text-sky-200">GitHub</a>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-green"><span>license</span><span>Apache-2.0</span></span>
          <span class="badge"><span>made with</span><span>♥ + yaml</span></span>
          <span class="badge badge-amber"><span>status</span><span>self-hosted</span></span>
        </div>
        <div class="font-mono text-xs text-slate-600">
          © {{ year }} Open HomeLab · built in the open
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
