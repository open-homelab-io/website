<template>
  <div class="app-shell min-h-screen bg-[#111113] text-slate-100">
    <Navbar />
    <router-view />
    <SiteFooter />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    SiteFooter
  }
}
</script>
