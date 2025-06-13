<script setup>
defineProps({
  options: { type: Array, required: true }, // array of {label, value}
  modelValue: { required: true },
})

const emit = defineEmits(['update:modelValue'])

const select = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="opt in options"
      :key="opt.value"
      @click="select(opt.value)"
      :class="['tab', { active: opt.value === modelValue }]"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: inline-flex;
  background: var(--color-tertiary);
  border-radius: 8px;
  overflow: clip;
}

.tab {
  border: none;
  background: transparent;
  padding: 0.5rem 3.5rem;
  font-family: var(--font-primary);
  font-weight: 600;
  cursor: pointer;
  color: var(--text-color-secondary);
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.tab.active {
  background: var(--color-primary);
  color: #fff;
}

@media (max-width: 640px) {
  .tab {
    flex: 1;
    padding-block: 0.75rem;
  }
}
</style>
