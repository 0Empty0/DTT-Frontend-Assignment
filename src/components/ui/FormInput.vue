<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
    />
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

input {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: var(--color-tertiary);
  font-family: var(--font-secondary);
  font-size: var(--f-body-mobile);
}

input::placeholder {
  color: var(--color-tertiary-alt);
}
</style>
