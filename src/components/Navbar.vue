<template>
  <nav class="fixed w-full z-50 border-b border-white/10 bg-[#111113]/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center gap-3 group">
            <img src="/favicon.svg" alt="Open HomeLab" class="h-9 w-9" />
            <span class="font-mono text-lg font-semibold uppercase tracking-[0.18em]">
              <span class="text-slate-100">Open </span><span class="brand-gradient">HomeLab</span>
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-6">
            <router-link to="/" class="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white" :class="{ 'bg-white/10 text-sky-200': $route.path === '/' }">Home</router-link>
            <router-link to="/stack" class="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white" :class="{ 'bg-white/10 text-sky-200': $route.path.startsWith('/stack') }">Stack</router-link>
            <router-link to="/docs" class="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white" :class="{ 'bg-white/10 text-sky-200': $route.path.startsWith('/docs') }">Docs</router-link>
            <a href="https://github.com/open-homelab-io/open-homelab" target="_blank" rel="noopener noreferrer" class="gh-star ml-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.09 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
              </svg>
              Star
            </a>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="toggleMobile" class="text-slate-300 hover:text-sky-200 focus:outline-none focus:text-sky-200">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="space-y-1 border-t border-white/10 bg-[#111113] px-2 pb-4 pt-3 sm:px-3">
          <router-link to="/" class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-sky-200" :class="{ 'bg-white/10 text-sky-200': $route.path === '/' }" @click="closeMobile">Home</router-link>
          <router-link to="/stack" class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-sky-200" :class="{ 'bg-white/10 text-sky-200': $route.path.startsWith('/stack') }" @click="closeMobile">Stack</router-link>
          <router-link to="/docs" class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-sky-200" :class="{ 'bg-white/10 text-sky-200': $route.path.startsWith('/docs') }" @click="closeMobile">Docs</router-link>
          <a href="https://github.com/open-homelab-io/open-homelab" target="_blank" rel="noopener noreferrer" class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-sky-200" @click="closeMobile">GitHub</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobile() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobile() {
      this.mobileMenuOpen = false
    }
  }
}
</script>
