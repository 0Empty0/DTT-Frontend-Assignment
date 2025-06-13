<script setup>
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import SecondaryButton from '@/components/ui/SecondaryButton.vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Delete listing',
  },
  message: {
    type: String,
    default: 'Are you sure you want to delete this listing? This action cannot be undone.',
  },
})

defineEmits(['close', 'confirm'])
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-content">
        <h2 class="modal-title">{{ title }}</h2>
        <p class="modal-message">
          {{ message }}
        </p>
        <div class="modal-actions">
          <PrimaryButton @click="$emit('confirm')">YES, DELETE</PrimaryButton>
          <SecondaryButton @click="$emit('close')">GO BACK</SecondaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  width: 50vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal-content {
  width: 65%;
  margin: 0 auto;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.modal-message {
  margin-bottom: 2.5rem;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-actions button {
  width: 100%;
  justify-content: center;
}

@media (max-width: 768px) {
  .modal-container {
    width: 90vw;
  }
  .modal-content {
    width: 75%;
  }
}
</style>
