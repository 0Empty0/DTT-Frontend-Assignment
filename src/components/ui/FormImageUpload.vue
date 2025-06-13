<script setup>
import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import IconButton from './IconButton.vue'

const props = defineProps({
  modelValue: { type: [String, File], default: null },
  label: { type: String, required: true },
  validator: { type: Function, default: () => '' },
})

const emit = defineEmits(['update:modelValue'])
const error = ref('')
const picture = ref(null)
const fileInput = ref(null)

const runValidation = () => {
  error.value = props.validator(props.modelValue)
}

const debouncedValidate = useDebounce(runValidation, 200)

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === 'string') {
      picture.value = newValue
    }
    debouncedValidate()
  },
)

const validate = () => {
  runValidation()
  return !error.value
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('update:modelValue', file)
    const reader = new FileReader()
    reader.onload = (e) => {
      picture.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const removeImage = (e) => {
  e.stopPropagation()
  emit('update:modelValue', null)
  picture.value = null
}

defineExpose({ validate })
</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="file-upload-container" @click="triggerFileInput" :class="{ 'is-invalid': error }">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        @blur="runValidation"
        accept="image/png, image/jpeg"
        class="file-input"
      />
      <div v-if="!picture" class="upload-image">
        <IconButton icon="plus_grey" size="24" alt="Upload image" />
      </div>
      <div v-else class="remove-image" @click="removeImage">
        <IconButton icon="clear_white" size="28" alt="Upload image" />
      </div>
      <img v-if="picture" :src="picture" class="preview-image" />
    </div>
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

.file-upload-container {
  width: 120px;
  height: 120px;
  border: 2px dashed var(--color-tertiary-alt);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.file-input {
  display: none;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: -1rem;
  right: -1rem;
  cursor: pointer;
  z-index: 1;
}

.is-invalid {
  border-color: var(--color-primary);
}

.error-message {
  color: var(--color-primary);
  font-size: var(--f-error-mobile);
  margin-top: 0.25rem;
}
</style>
