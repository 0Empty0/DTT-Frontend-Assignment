<script setup>
import { useHouseStore } from '@/stores/houseStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseIcon from './ui/BaseIcon.vue'
import DeleteModal from './ui/DeleteModal.vue'
import IconButton from './ui/IconButton.vue'

/**
 * @typedef {import('@/services/houseApi').House} House
 */

const props = defineProps({
  /**
   * House object to display.
   * @type {House}
   */
  house: { type: Object, required: true },
})

const router = useRouter()
const houseStore = useHouseStore()
const showDeleteModal = ref(false)

const address = computed(() => {
  const { street, houseNumber, houseNumberAddition } = props.house.location
  return `${street} ${houseNumber}${houseNumberAddition ? houseNumberAddition : ''}`
})

const imageUrl = computed(
  () =>
    props.house.image ||
    new URL('@/assets/images/img_placeholder_house@3x.png', import.meta.url).href,
)

const goToDetails = () => {
  router.push({ name: 'Listing', params: { id: props.house.id } })
}

const deleteListing = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await houseStore.removeHouse(props.house.id)
  } catch (error) {
    console.error('Failed to delete listing:', error)
    alert('Failed to delete listing.')
  } finally {
    showDeleteModal.value = false
  }
}
</script>

<template>
  <div class="house-card">
    <img :src="imageUrl" class="house-img" :alt="house.title" @click="goToDetails" />
    <div class="house-content">
      <div class="house-header">
        <h2 class="house-title" @click="goToDetails">{{ address }}</h2>
        <div class="house-actions" v-if="house.madeByMe">
          <IconButton icon="edit" aria-label="Edit" @click.stop="$emit('edit', house)" size="16" />
          <IconButton icon="delete" aria-label="Delete" @click.stop="deleteListing" size="16" />
        </div>
      </div>
      <div class="house-price">€ {{ house.price.toLocaleString('nl-NL') }}</div>
      <div class="house-location">{{ house.location.zip }} {{ house.location.city }}</div>
      <div class="house-meta">
        <span class="meta-item"><BaseIcon name="bed" size="16" /> {{ house.rooms.bedrooms }}</span>
        <span class="meta-item"
          ><BaseIcon name="bath" size="16" /> {{ house.rooms.bathrooms }}</span
        >
        <span class="meta-item"><BaseIcon name="size" size="16" /> {{ house.size }} m²</span>
      </div>
    </div>
    <DeleteModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.house-card {
  padding: 1rem;
  display: flex;
  background: var(--color-background-2);
  border-radius: 0.375rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  align-items: stretch;
}
.house-card + .house-card {
  margin-top: 1rem;
}
.house-img {
  height: 152px;
  aspect-ratio: 1/1;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--color-tertiary);
  border-radius: 0.5rem;
  cursor: pointer;
}
.house-content {
  flex: 1;
  padding: 1rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.house-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.house-title {
  font-size: var(--f-h2-desktop);
  font-weight: 700;
  margin-bottom: 0.25rem;
  cursor: pointer;
}
.house-actions {
  display: flex;
  gap: 0.5rem;
}
.house-price {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.house-location {
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}
.house-meta {
  display: flex;
  gap: 1.5rem;
  font-size: var(--f-meta-desktop);
  color: var(--text-color-secondary);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@container house-card-container (width < 768px) {
  .house-content {
    padding: 0.5rem;
    padding-left: 1rem;
  }
  .house-card {
    flex-direction: row;
  }
  .house-card + .house-card {
    margin-top: 0.25rem;
  }
  .house-img {
    height: 100px;
  }
  .house-title {
    font-size: var(--f-h2-mobile);
    margin-bottom: 0.125rem;
  }
  .house-meta {
    gap: 0.75rem;
    font-size: var(--f-meta-mobile);
  }
  .meta-item {
    gap: 0.25rem;
  }
  .house-price {
    font-size: var(--f-body-mobile);
    margin-bottom: 0.125rem;
  }
  .house-location {
    font-size: var(--f-meta-mobile);
    margin-bottom: 0.5rem;
  }
}
</style>
