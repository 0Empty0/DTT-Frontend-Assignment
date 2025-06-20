<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import backgroundImage from '@/assets/images/img_background@3x.png'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main container"><router-view /></main>
    <AppFooter />
    <img :src="backgroundImage" alt="background" class="background" />
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
}
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  object-fit: cover;
  z-index: -1;
}
.main {
  background: none;
}
.form-layout {
  padding: 1rem;
}

@media (min-width: 641px) {
  .background {
    height: 100%;
  }
  .form-layout {
    padding: 2rem;
  }
}
</style>
