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

console.log('internalValue', internalValue.value)

const showClear = computed(() => internalValue.value.length > 0)

function clearInput() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search">
    <BaseIcon name="search" size="18" class="search-icon" alt="search icon" />
    <input v-model="internalValue" :placeholder="placeholder" class="search-input" type="text" />
    <button
      v-if="showClear"
      class="clear-btn"
      type="button"
      aria-label="Clear search input"
      @click="clearInput"
    >
      <BaseIcon name="clear" size="16" />
    </button>
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
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
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

.clear-btn {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  translate: 0 -50%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:focus {
  outline: 2px solid var(--color-secondary);
}
</style>
