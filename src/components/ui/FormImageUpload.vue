<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, File], default: null },
  label: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])

const picture = ref(null)
const fileInput = ref(null)

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === 'string') {
      picture.value = newValue
    }
  },
)

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
</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="file-upload-container" @click="triggerFileInput">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/png, image/jpeg"
        class="file-input"
      />
      <div v-if="!picture" class="upload-placeholder">
        <span class="plus-icon">+</span>
      </div>
      <img v-if="picture" :src="picture" class="preview-image" />
    </div>
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
  overflow: hidden;
}

.file-input {
  display: none;
}

.upload-placeholder .plus-icon {
  font-size: 48px;
  color: var(--color-tertiary-alt);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
