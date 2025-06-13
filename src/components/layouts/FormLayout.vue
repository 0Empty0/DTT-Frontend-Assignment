<script setup>
import AppHeader from '@/components/AppHeader.vue'

import backgroundImage from '@/assets/images/img_background@3x.png'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main container"><router-view /></main>
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
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
