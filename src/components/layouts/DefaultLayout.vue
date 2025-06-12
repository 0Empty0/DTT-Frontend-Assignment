<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="main container"><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
