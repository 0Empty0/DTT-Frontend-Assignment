<script setup>
import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  id: { type: String, required: true },
  options: { type: Array, required: true },
  validator: { type: Function, default: () => '' },
})

const emit = defineEmits(['update:modelValue'])
const error = ref('')

const runValidation = () => {
  error.value = props.validator(props.modelValue)
}

const debouncedValidate = useDebounce(runValidation, 200)

watch(() => props.modelValue, debouncedValidate)

const validate = () => {
  runValidation()
  return !error.value
}

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

defineExpose({ validate })
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="updateValue"
      @blur="runValidation"
      :class="{ 'is-invalid': error }"
    >
      <option value="" disabled>Select</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

label {
  font-weight: 600;
  font-size: var(--f-input-title-desktop);
}

select {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: var(--color-background-2);
  font-family: var(--font-secondary);
  font-size: var(--f-body-mobile);
}

.is-invalid {
  border: 1px solid var(--color-primary);
}

.error-message {
  color: var(--color-primary);
  font-size: var(--f-error-mobile);
  margin-top: 0.25rem;
}
</style>
