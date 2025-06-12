<script setup>
import BaseIcon from './BaseIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search…' },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<template>
  <div class="search">
    <BaseIcon name="search" size="18" class="search-icon" alt="search icon" />
    <input v-model="internalValue" :placeholder="placeholder" class="search-input" type="text" />
  </div>
</template>

<style scoped>
.search {
  position: relative;
  width: 50%;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  translate: 0 -50%;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: none;
  border-radius: 8px;
  background: var(--color-tertiary);
  font-family: var(--font-secondary);
  font-size: var(--f-body-desktop);
}

.search-input::placeholder {
  color: var(--color-secondary);
  font-family: var(--font-secondary);
}
</style>
