<script setup>
defineProps({
  type: { type: String, default: 'button' },
  /** Allows external components to disable the button. */
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button :type="type" class="primary-btn" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: #fff;
  font-family: var(--font-primary);
  font-size: var(--f-btn-desktop);
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    opacity 0.2s ease;
}

.primary-btn:hover:not(:disabled) {
  background-color: #d54331;
}

.primary-btn:disabled,
.primary-btn.disabled {
  opacity: 0.6;
}
</style>
