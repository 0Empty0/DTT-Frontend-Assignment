<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main container"><router-view /></main>
    <AppFooter />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
