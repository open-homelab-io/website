<template>
  <div class="min-h-screen bg-[#111113]">
    <Architecture />
    <StackShowcase :with-header="false" />
  </div>
</template>

<script>
import Architecture from '../components/Architecture.vue'
import StackShowcase from '../components/StackShowcase.vue'

export default {
  name: 'Stack',
  components: {
    Architecture,
    StackShowcase
  }
}
</script>
