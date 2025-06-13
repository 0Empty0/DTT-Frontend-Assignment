<script setup>
import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  id: { type: String, required: true },
  validator: { type: Function, default: () => '' },
  formatter: { type: Function, default: (value) => value },
  parser: { type: Function, default: (value) => value },
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
    <textarea
      :id="id"
      :value="modelValue"
      @input="updateValue"
      @blur="runValidation"
      :placeholder="placeholder"
      :class="{ 'is-invalid': error }"
    ></textarea>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: var(--f-input-title-desktop);
}

textarea {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: var(--color-background-2);
  font-family: var(--font-secondary);
  font-size: var(--f-body-mobile);
  min-height: 150px;
  resize: vertical;
}

textarea::placeholder {
  color: var(--color-tertiary-alt);
}

.is-invalid {
  border: 1px solid var(--color-primary);
}

.is-invalid::placeholder {
  color: var(--color-primary);
}

.error-message {
  color: var(--color-primary);
  font-size: var(--f-error-mobile);
  margin-top: 0.25rem;
}
</style>
