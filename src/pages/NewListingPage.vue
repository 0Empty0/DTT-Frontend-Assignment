<script setup>
import GoBackButton from '@/components/ui/GoBackButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div>
    <GoBackButton @goBack="goBack" label="Back to overview" />
    <h1 class="title">Create new listing</h1>
  </div>
</template>

<script>
export default {
  name: 'NewListingPage',
}
</script>
