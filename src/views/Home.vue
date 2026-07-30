<template>
  <div class="min-h-screen bg-[#111113]">
    <Hero />
    <LogoWall />
    <Community />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import LogoWall from '../components/LogoWall.vue'
import Community from '../components/Community.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    LogoWall,
    Community
  }
}
</script>
