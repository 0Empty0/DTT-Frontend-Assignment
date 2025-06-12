<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  icon: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  alt: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button :type="type" class="icon-btn" :aria-label="ariaLabel || alt || icon">
    <BaseIcon :name="icon" :size="size" :alt="alt || icon" />
    <slot />
  </button>
</template>

<style scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.icon-btn:hover {
  opacity: 0.8;
}
</style>
