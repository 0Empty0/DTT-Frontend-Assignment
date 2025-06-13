<script setup>
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Go Back',
  },
})

const emit = defineEmits(['goBack'])

const goBack = () => {
  emit('goBack')
}
</script>

<template>
  <div class="back-link" @click="goBack">
    <BaseIcon name="back_grey" :size="20" />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
