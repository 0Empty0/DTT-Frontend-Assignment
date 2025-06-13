<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
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
    <textarea
      :id="id"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
    ></textarea>
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
  background-color: var(--color-tertiary);
  font-family: var(--font-secondary);
  font-size: var(--f-body-mobile);
  min-height: 150px;
  resize: vertical;
}

textarea::placeholder {
  color: var(--color-tertiary-alt);
}
</style>
