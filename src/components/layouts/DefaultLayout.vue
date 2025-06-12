<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />
    <main><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
